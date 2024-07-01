<?php

define('FIFU_COLUMN_HEIGHT', 40);

add_action('admin_init', 'fifu_column');
add_filter('admin_head', 'fifu_admin_add_css_js');
add_action('admin_footer', 'fifu_footer');

function fifu_column() {
    add_filter('manage_posts_columns', 'fifu_column_head');
    add_filter('manage_pages_columns', 'fifu_column_head');
    add_filter('manage_edit-product_cat_columns', 'fifu_column_head');
    fifu_column_custom_post_type();
    add_action('manage_posts_custom_column', 'fifu_column_content', 10, 2);
    add_action('manage_pages_custom_column', 'fifu_column_content', 10, 2);
    add_action('manage_product_cat_custom_column', 'fifu_ctgr_column_content', 10, 3);
}

function fifu_admin_add_css_js() {
    if (!in_array(fifu_check_screen_base(), array('list', 'edit', 'new')))
        return;

    global $pagenow;
    if (!is_admin() || ('edit.php' != $pagenow && 'post.php' != $pagenow && 'term.php' != $pagenow && 'post-new.php' != $pagenow && 'edit-tags.php' != $pagenow ))
        return;

    // buddyboss app
    if (isset($_REQUEST['page']) && strpos($_REQUEST['page'], 'bbapp') !== false)
        return;

    wp_enqueue_style('fifu-pro-css', plugins_url('/html/css/pro.css', __FILE__), array(), fifu_version_number_enq());
    wp_enqueue_style('fancy-box-css', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.css');
    wp_enqueue_script('fancy-box-js', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js');
    wp_enqueue_style('fifu-column-css', plugins_url('/html/css/column.css', __FILE__), array(), fifu_version_number_enq());
    wp_enqueue_script('fifu-column-js', plugins_url('/html/js/column.js', __FILE__), array('jquery'), fifu_version_number_enq());

    $fifu = fifu_get_strings_quick_edit();
    $fifu_help = fifu_get_strings_help();

    wp_localize_script('fifu-column-js', 'fifuColumnVars', [
        'restUrl' => esc_url_raw(rest_url()),
        'homeUrl' => esc_url_raw(home_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'labelImage' => $fifu['title']['image'](),
        'labelVideo' => $fifu['title']['video'](),
        'labelSearch' => $fifu['title']['search'](),
        'labelImageGallery' => $fifu['title']['gallery']['image'](),
        'labelVideoGallery' => $fifu['title']['gallery']['video'](),
        'labelSlider' => $fifu['title']['slider'](),
        'tipImage' => $fifu['tip']['image'](),
        'tipVideo' => $fifu['tip']['video'](),
        'tipSearch' => $fifu['tip']['search'](),
        'urlImage' => $fifu['url']['image'](),
        'urlVideo' => $fifu['url']['video'](),
        'keywords' => $fifu['image']['keywords'](),
        'buttonSave' => $fifu['button']['save'](),
        'buttonClean' => $fifu['button']['clean'](),
        'buttonUpload' => $fifu['button']['upload'](),
        'unlock' => $fifu['unlock'](),
        'onProductsPage' => fifu_on_products_page(),
        'onCategoriesPage' => fifu_on_categories_page(),
        'txt_title_examples' => $fifu_help['title']['examples'](),
        'txt_title_keywords' => $fifu_help['title']['keywords'](),
        'txt_title_more' => $fifu_help['title']['more'](),
        'txt_title_url' => $fifu_help['title']['url'](),
        'txt_title_empty' => $fifu_help['title']['empty'](),
        'txt_desc_more' => $fifu_help['desc']['more'](),
        'txt_desc_url' => $fifu_help['desc']['url'](),
        'txt_desc_keywords' => $fifu_help['desc']['keywords'](),
        'txt_desc_empty' => $fifu_help['desc']['empty'](),
        'txt_unlock' => $fifu_help['unsplash']['unlock'](),
        'txt_more' => $fifu_help['unsplash']['more'](),
        'txt_loading' => $fifu_help['unsplash']['loading'](),
        'txt_warning_thumbnail' => $fifu_help['warning']['video']['thumbnail'](),
        'labelVariable' => $fifu['title']['variable']['product'](),
        'labelVariation' => $fifu['title']['variable']['variation'](),
        'labelName' => $fifu['title']['variable']['name'](),
    ]);
}

function fifu_column_head($default) {
    $fifu = fifu_get_strings_quick_edit();
    $height = FIFU_COLUMN_HEIGHT;
    $default['featured_image'] = "<center style='max-width:{$height}px;min-width:{$height}px'><span class='dashicons dashicons-camera' style='font-size:20px; cursor:help;' title='{$fifu['tip']['column']()}'></span><div style='display:none'>FIFU</div></center>";
    return $default;
}

function fifu_ctgr_column_featured($term_id) {
    $border = '';
    $height = FIFU_COLUMN_HEIGHT;
    $width = $height * 1.;
    $video_url = null;
    $video_src = null;
    $is_ctgr = true;
    $is_variable = false;
    $image_url = null;
    $vars = array();

    $fifu = fifu_get_strings_meta_box();

    $image_url = get_term_meta($term_id, 'fifu_image_url', true);
    $image_alt = get_term_meta($term_id, 'fifu_image_alt', true);
    if ($image_url == '') {
        $thumb_id = get_term_meta($term_id, 'thumbnail_id', true);
        $image_url = wp_get_attachment_url($thumb_id);
        $border = 'border-color: #ca4a1f !important; border: 2px; border-style: dotted;';
    }
    $url = fifu_optimized_column_image($image_url);

    $vars[$term_id]['fifu_image_url'] = $image_url;
    $vars[$term_id]['fifu_image_alt'] = $image_alt;

    return array($border, $height, $width, $video_url, $video_src, $is_ctgr, $is_variable, $image_url, $url, $vars);
}

function fifu_ctgr_column_content($internal_image, $column, $term_id) {
    if ($column != 'featured_image') {
        echo $internal_image;
        return;
    }

    global $FIFU_SESSION;

    list($border, $height, $width, $video_url, $video_src, $is_ctgr, $is_variable, $image_url, $url, $vars) = fifu_ctgr_column_featured($term_id);
    $post_id = $term_id;
    $url = fifu_cdn_adjust($url);
    include 'html/column.html';

    $term_ids = [$term_id];

    // add vars
    foreach ($term_ids as $id)
        $FIFU_SESSION['fifu-quick-edit-ctgr'][$id] = $vars[$id];

    wp_enqueue_script('fifu-quick-edit', plugins_url('/html/js/quick-edit.js', __FILE__), array('jquery'), fifu_version_number_enq());
    wp_localize_script('fifu-quick-edit', 'fifuQuickEditCtgrVars', [
        'terms' => $FIFU_SESSION['fifu-quick-edit-ctgr'],
    ]);
}

function fifu_column_featured($post_id, $is_variable) {
    $border = '';
    $height = FIFU_COLUMN_HEIGHT;
    $width = $height * 1.;
    $video_url = null;
    $video_src = null;
    $is_ctgr = false;
    $is_variable = $is_variable;
    $image_url = null;
    $vars = array();

    $image_url = fifu_main_image_url($post_id, true);
    $image_alt = get_post_meta($post_id, 'fifu_image_alt', true);
    if ($image_url == '') {
        $image_url = wp_get_attachment_url(get_post_thumbnail_id($post_id));
        $border = 'border-color: #ca4a1f !important; border: 2px; border-style: dotted;';
    }
    $url = fifu_optimized_column_image($image_url);

    $vars[$post_id]['fifu_image_url'] = get_post_meta($post_id, 'fifu_image_url', true);
    $vars[$post_id]['fifu_image_alt'] = $image_alt;

    return array($border, $height, $width, $video_url, $video_src, $is_ctgr, $is_variable, $image_url, $url, $vars);
}

function fifu_column_content($column, $post_id) {
    if ($column != 'featured_image')
        return;

    global $FIFU_SESSION;

    if (isset($FIFU_SESSION['fifu-quick-edit'][$post_id]) || isset($FIFU_SESSION['fifu-quick-edit-parent'][$post_id])) {
        return; // already processed before
    }

    $fifu = fifu_get_strings_meta_box();

    list($border, $height, $width, $video_url, $video_src, $is_ctgr, $is_variable, $image_url, $url, $vars) = fifu_column_featured($post_id, fifu_is_variable_product($post_id));
    $url = fifu_cdn_adjust($url);
    include 'html/column.html';

    $post_ids = [$post_id];

    // image gallery
    $FIFU_SESSION['fifu-quick-edit-parent'][$post_id] = null;
    if (class_exists("WooCommerce")) {
        $product = wc_get_product($post_id);
        if ($product) {
            if ($product->get_type() == "variable") {
                // for parent product only
                $parent_data = array(
                    'border' => $border,
                    'height' => $height,
                    'width' => $width,
                    'video-url' => $video_url ? $video_url : '',
                    'video-src' => $video_src ? $video_src : '',
                    'is-ctgr' => $is_ctgr ? $is_ctgr : '',
                    'is-variable' => '',
                    'image-url' => $image_url,
                    'url' => $url,
                );
                $FIFU_SESSION['fifu-quick-edit-parent'][$post_id] = $parent_data;

                $variable_data = fifu_get_pretty_variation_attributes_map($post_id);
                $variable_table = fifu_array_to_sorted_html_table($variable_data, $post_id);
                $vars[$post_id]['fifu_variable_table'] = $variable_table;
                $vars[$post_id]['title'] = $product->get_title();
                $post_ids = array_merge($post_ids, array_keys($variable_data));
            } else {
                
            }

            foreach ($post_ids as $id) {
                $vars[$id]['fifu_image_url'] = get_post_meta($id, 'fifu_image_url', true);
                $vars[$id]['fifu_image_alt'] = get_post_meta($id, 'fifu_image_alt', true);
            }

            wp_enqueue_script('woo-meta-box-js', plugins_url('/html/js/woo-meta-box.js', __FILE__), array('jquery'), fifu_version_number_enq());
            wp_localize_script('woo-meta-box-js', 'fifuBoxImageVars', [
                'restUrl' => esc_url_raw(rest_url()),
                'homeUrl' => esc_url_raw(home_url()),
                'nonce' => wp_create_nonce('wp_rest'),
                'urls' => [],
                'alts' => [],
                'text_url' => $fifu['image']['url'](),
                'text_alt' => $fifu['image']['alt'](),
                'text_ok' => $fifu['image']['ok'](),
            ]);
        }
    }

    // add vars
    foreach ($post_ids as $id)
        $FIFU_SESSION['fifu-quick-edit'][$id] = $vars[$id];

    // the values will be send to the JS once in fifu_footer
}

function fifu_footer() {
    global $FIFU_SESSION;

    if (isset($FIFU_SESSION)) {
        wp_enqueue_script('fifu-quick-edit', plugins_url('/html/js/quick-edit.js', __FILE__), array('jquery'), fifu_version_number_enq());
        wp_localize_script('fifu-quick-edit', 'fifuQuickEditVars', [
            'posts' => isset($FIFU_SESSION['fifu-quick-edit']) ? $FIFU_SESSION['fifu-quick-edit'] : null,
            'parent' => isset($FIFU_SESSION['fifu-quick-edit-parent']) ? $FIFU_SESSION['fifu-quick-edit-parent'] : null,
        ]);
    }
}

function fifu_column_custom_post_type() {
    foreach (fifu_get_post_types() as $post_type)
        add_filter('manage_edit-' . $post_type . '_columns', 'fifu_column_head');
}

function fifu_optimized_column_image($url) {
    $url = fifu_cdn_adjust($url);

    if (fifu_is_from_speedup($url)) {
        $url = explode('?', $url)[0];
        return fifu_speedup_get_signed_url($url, 128, 128, null, null, false);
    }

    if (fifu_is_on('fifu_photon')) {
        $height = FIFU_COLUMN_HEIGHT;
        return fifu_jetpack_photon_url($url, fifu_get_photon_args($height, $height));
    }

    return $url;
}

