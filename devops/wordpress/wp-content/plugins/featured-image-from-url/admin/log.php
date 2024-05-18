<?php

function fifu_cloud_log($entry, $mode = 'a', $file = 'fifu-cloud') {
    return fifu_log($entry, $file, $mode);
}

function fifu_plugin_log($entry, $mode = 'a', $file = 'fifu-plugin') {
    return fifu_log($entry, $file, $mode);
}

function fifu_log($entry, $file, $mode = 'a') {
    $upload_dir = wp_upload_dir()['basedir'];
    $filepath = "{$upload_dir}/{$file}.log";

    // Remove the file
    if (file_exists($filepath) && filesize($filepath) > 10 * 1024 * 1024)
        unlink($filepath);

    if (is_array($entry))
        $entry = json_encode([current_time('mysql') => $entry], JSON_UNESCAPED_SLASHES);

    $file = fopen($filepath, $mode);
    $bytes = fwrite($file, "{$entry}\n");
    fclose($file);

    return $bytes;
}

