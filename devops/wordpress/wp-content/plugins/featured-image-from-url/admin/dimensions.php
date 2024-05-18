<?php

define('PROXY2_URLS', [
    "https://drive.google.com",
    "https://drive.usercontent.google.com",
    "https://lh3.googleusercontent.com/",
    "https://s.yimg.com",
    "https://s1.yimg.com",
    "https://blockworks.co",
    "https://coincodex.com",
    "https://www.ft.com",
    "https://cdn.sellio.net",
    "https://cf.bstatic.com",
    "https://media-cdn.oriflame.com",
    "https://i.ytimg.com/",
    "https://cdn.myshoptet.com/",
    "https://i.imgur.com/",
    "https://a1.espncdn.com/",
    "https://books.google.com/",
    "https://embed-cdn.gettyimages.com/",
    "https://media.gettyimages.com/"
]);

define('PROXY3_URLS', [
    "https://img.youtube.com",
]);

function fifu_sizes_cron_task($original_image_url, $att_id) {
    // Validate inputs
    if (empty($original_image_url) || !is_numeric($att_id)) {
        return;
    }

    // Get image dimensions
    $image_data = @file_get_contents($original_image_url);
    if (!$image_data) {
        return;
    }

    $size = @getimagesizefromstring($image_data);
    if (!$size) {
        return;
    }
    list($width, $height) = $size;

    // Update attachment metadata
    $metadata = wp_get_attachment_metadata($att_id);
    if (!is_array($metadata)) {
        $metadata = [];
    }
    $metadata['width'] = $width;
    $metadata['height'] = $height;
    wp_update_attachment_metadata($att_id, $metadata);
}

function fifu_sizes_schedule_task($original_image_url, $att_id) {
    wp_schedule_single_event(time(), 'fifu_sizes_cron_action', array($original_image_url, $att_id));
}

add_action('fifu_sizes_cron_action', 'fifu_sizes_cron_task', 10, 2);

function fifu_image_downsize($out, $att_id, $size) {
    global $FIFU_SESSION;

    if (!$att_id || !fifu_is_remote_image($att_id)) {
        return $out;
    }

    if (fifu_is_off('fifu_photon')) {
        return $out;
    }

    $original_image_url = get_post_meta($att_id, '_wp_attached_file', true);
    if ($original_image_url) {
        if (strpos($original_image_url, "https://thumbnails.odycdn.com") !== 0 &&
                strpos($original_image_url, "https://res.cloudinary.com") !== 0 &&
                fifu_jetpack_blocked($original_image_url)) {
            return $out;
        }
    }

    if (fifu_ends_with($original_image_url, '.svg'))
        return $out;

    if (fifu_is_from_speedup($original_image_url))
        return $out;

    $image_url = fifu_cdn_adjust($original_image_url);

    // Check if the requested size is "full"
    if ($size === 'full') {
        // Check if dimensions are already saved
        $metadata = wp_get_attachment_metadata($att_id);
        if (!empty($metadata['width']) && !empty($metadata['height'])) {
            $original_width = intval($metadata['width']);
            $original_height = intval($metadata['height']);
            $aspect_ratio = $original_height / $original_width;
            $max_dimension = 1920;

            if ($original_width > $original_height) {
                // Landscape or square image
                $new_width = min($original_width, $max_dimension);
                $new_height = intval($new_width * $aspect_ratio);
            } else {
                // Portrait image
                $new_height = min($original_height, $max_dimension);
                $new_width = intval($new_height / $aspect_ratio);
            }

            $new_url = fifu_resize_with_photon($image_url, $new_width, $new_height);

            $FIFU_SESSION['cdn-new-old'][$new_url] = $original_image_url;
            return array($new_url, $new_width, $new_height, false);
        } else {
            // Save dimensions
            fifu_sizes_schedule_task($image_url, $att_id);

            // Use a small width to quickly get the height
            $small_width = 100;

            $small_resized_url = fifu_resize_with_photon($image_url, $small_width, 9999);

            list(, $small_height) = @getimagesize($small_resized_url);

            // Calculate width for a larger size based on the aspect ratio
            $large_width = 1920;
            $aspect_ratio = $small_height / $small_width;
            $large_height = intval($large_width * $aspect_ratio);

            $resized_url = fifu_resize_with_photon($image_url, $large_width, $large_height);

            $FIFU_SESSION['cdn-new-old'][$resized_url] = $original_image_url;
            return array($resized_url, $large_width, $large_height, false);
        }
    } else {
        // Logic for other sizes
        // Get all registered image sizes
        $image_sizes = get_intermediate_image_sizes();
        $additional_sizes = wp_get_registered_image_subsizes();

        // Determine the size dimensions
        $width = $height = 0;
        if (is_array($size)) {
            list($width, $height) = $size;
        } elseif (in_array($size, $image_sizes)) {
            if (isset($additional_sizes[$size])) {
                $width = intval($additional_sizes[$size]['width']);
                $height = intval($additional_sizes[$size]['height']);
            } else {
                $width = get_option("{$size}_size_w");
                $height = get_option("{$size}_size_h");
            }
        } else {
            $width = 1200; // fallback
            fifu_plugin_log(['fifu-dimensions' => ['WARNING' => "Invalid size: $size"]]);
        }

        $new_url = fifu_resize_with_photon($image_url, $width, $height);

        $FIFU_SESSION['cdn-new-old'][$new_url] = $original_image_url;
        return array($new_url, $width, $height, false);
    }
}

add_filter('image_downsize', 'fifu_image_downsize', 10, 3);

function fifu_resize_with_photon($url, $width, $height) {
    $photon_base_url = "https://i" . (hexdec(substr(md5($url), 0, 1)) % 4) . ".wp.com/";

    $delimiter = strpos($url, "?") !== false ? '&' : '?';

    if (strpos($url, "wp.com/mshots") !== false || strpos($url, "screenshot.fifu.app") !== false) {
        $crop = "&crop=0px,0px,{$width}px,{$height}px";
    } else {
        $resize_param = $height == 9999 ? "{$width}" : "{$width},{$height}";
        $crop = "&resize={$resize_param}";
    }

    $ssl_param = '&ssl=1';

    return $photon_base_url . preg_replace('#^https?://#', '', $url) . "{$delimiter}w={$width}{$crop}{$ssl_param}";
}

function fifu_resize_with_odycdn($url, $width, $height) {
    return "https://thumbnails.odycdn.com/optimize/s:{$width}:{$height}/quality:85/plain/{$url}";
}

function fifu_cdn_adjust($original_image_url) {
    if (!$original_image_url)
        return $original_image_url;

    foreach (PROXY2_URLS as $url) {
        if (strpos($original_image_url, $url) === 0) {
            return 'https://res.cloudinary.com/glide/image/fetch/' . urlencode($original_image_url);
        }
    }

    foreach (PROXY3_URLS as $url) {
        if (strpos($original_image_url, $url) === 0) {
            return fifu_resize_with_odycdn($original_image_url, 1920, 0);
        }
    }

    return $original_image_url;
}

