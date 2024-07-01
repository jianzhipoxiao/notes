function removeImage() {
    jQuery("#fifu_input_alt").hide();
    jQuery("#fifu_image").hide();
    jQuery("#fifu_upload").hide();
    jQuery("#fifu_link").hide();

    jQuery("#fifu_input_alt").val("");
    jQuery("#fifu_input_url").val("");
    jQuery("#fifu_keywords").val("");

    jQuery("#fifu_button").show();
    jQuery("#fifu_help").show();

    if (fifuMetaBoxVars.is_sirv_active)
        jQuery("#fifu_sirv_button").show();

    wp.data.dispatch('core/editor').editPost({featured_media: 0});
    fifu_enable_wp_featured_image_buttons();
}

function previewImage() {
    var $url = jQuery("#fifu_input_url").val();

    if (jQuery("#fifu_input_url").val() && jQuery("#fifu_keywords").val())
        $message = fifuMetaBoxVars.wait;
    else
        $message = '';

    if (!$url.startsWith("http") && !$url.startsWith("//")) {
        jQuery("#fifu_keywords").val($url);
        if (!$url || $url == ' ') {
            //
        } else {
            fifu_start_lightbox($url, true, null, null);
        }
        if (!$url)
            jQuery("#fifu_keywords").val(' ');
    } else {
        runPreview($url);
    }
}

function runPreview($url) {
    $url = fifu_convert($url);

    jQuery("#fifu_lightbox").attr('href', $url);

    if ($url) {
        fifu_get_sizes();

        jQuery("#fifu_button").hide();
        jQuery("#fifu_help").hide();
        jQuery("#fifu_premium").hide();

        adjustedUrl = fifu_cdn_adjust($url);
        jQuery("#fifu_image").css('background-image', "url('" + adjustedUrl + "')");

        jQuery("#fifu_input_alt").show();
        jQuery("#fifu_image").show();
        jQuery("#fifu_upload").show();
        jQuery("#fifu_link").show();

        if (fifuMetaBoxVars.is_sirv_active)
            jQuery("#fifu_sirv_button").hide();

        fifu_disable_wp_featured_image_buttons();
    }
}

jQuery(document).ready(function () {
    // help
    fifu_register_help();

    // lightbox
    fifu_open_lightbox();

    // start
    fifu_get_sizes();

    // input
    fifu_type_url();

    jQuery('.fifu-hover').on('mouseover', function (evt) {
        jQuery(this).css('color', '#23282e');
    });
    jQuery('.fifu-hover').on('mouseout', function (evt) {
        jQuery(this).css('color', 'white');
    });

    // title
    let text = jQuery("div#imageUrlMetaBox").find('h2').text();
    jQuery("div#imageUrlMetaBox").find('h2.hndle').text('');
    jQuery("div#imageUrlMetaBox").find('h2').append('<h4 style="left:-10px;position:relative;font-size:13px;font-weight:normal"><span class="dashicons dashicons-camera"></span> ' + text + '</h4>');
    jQuery("div#imageUrlMetaBox").find('button.handle-order-higher').remove();
    jQuery("div#imageUrlMetaBox").find('button.handle-order-lower').remove();

    text = jQuery("div#urlMetaBox").find('h2').text();
    jQuery("div#urlMetaBox").find('h2.hndle').text('');
    jQuery("div#urlMetaBox").find('h2').append('<h4 style="left:-10px;position:relative;font-size:13px;font-weight:normal"><span class="dashicons dashicons-camera"></span> ' + text + '</h4>');
    jQuery("div#urlMetaBox").find('button.handle-order-higher').remove();
    jQuery("div#urlMetaBox").find('button.handle-order-lower').remove();
});

function fifu_get_sizes() {
    image_url = jQuery("#fifu_input_url").val();
    if (image_url && !image_url.startsWith("http") && !image_url.startsWith("//"))
        return;
    fifu_get_image(image_url);
}

function fifu_get_image(url) {
    var image = new Image();
    jQuery(image).attr('onload', 'fifu_store_sizes(this);');
    jQuery(image).attr('src', url);
}

function fifu_store_sizes($) {
    jQuery("#fifu_input_image_width").val($.naturalWidth);
    jQuery("#fifu_input_image_height").val($.naturalHeight);
}

function fifu_open_lightbox() {
    jQuery("#fifu_image").on('click', function (evt) {
        evt.stopImmediatePropagation();
        let url = fifu_convert(jQuery("#fifu_input_url").val());
        let adjustedUrl = fifu_cdn_adjust(url);
        jQuery.fancybox.open('<img src="' + adjustedUrl + '" style="max-height:600px">');
    });
}

function fifu_type_url() {
    jQuery("#fifu_input_url").on('input', function (evt) {
        evt.stopImmediatePropagation();
        fifu_get_sizes();
    });
}

function fifu_register_help() {
    jQuery('#fifu_help').on('click', function () {
        jQuery.fancybox.open(`
            <div style="color:#1e1e1e;width:50%">
                <h1 style="background-color:whitesmoke;padding:20px;padding-left:0">${fifuMetaBoxVars.txt_title_examples}</h1>
                <h3>${fifuMetaBoxVars.txt_title_url}</h3>
                <p style="background-color:#1e1e1e;color:white;padding:10px;border-radius:5px">https://ps.w.org/featured-image-from-url/assets/banner-1544x500.png</p>
                <p>${fifuMetaBoxVars.txt_desc_url}</p>
                <h3>${fifuMetaBoxVars.txt_title_keywords}</h3>
                <p style="background-color:#1e1e1e;color:white;padding:10px;border-radius:5px">sea,sun</p>
                <p>${fifuMetaBoxVars.txt_desc_keywords}</p>
                <h3>${fifuMetaBoxVars.txt_title_empty}</h3>
                <div class="fifu-pro" style="position:relative;top:-45px;right:-15px;float:right;" title="${fifuMetaBoxVars.txt_unlock}"><span class="dashicons dashicons-lock fifu-pro-icon"></span></a></div>
                <p style="background-color:#1e1e1e;color:white;padding:10px;border-radius:5px;height:40px"></p>
                <p>${fifuMetaBoxVars.txt_desc_empty}</p>
                <h1 style="background-color:whitesmoke;padding:20px;padding-left:0">${fifuMetaBoxVars.txt_title_more}</h1>
                <p>${fifuMetaBoxVars.txt_desc_more}</p>
            </div>`
                );
    });
}

/* adjust wordpress featured image box */

// cdn adjsutments to display some images

if (typeof wp !== 'undefined' &&
        typeof wp.domReady === 'function' &&
        typeof wp.data !== 'undefined' &&
        typeof wp.data.select !== 'function') {
    wp.domReady(() => {
        let previousPanelState = wp.data.select('core/edit-post').isEditorPanelOpened('featured-image');

        const updateFeaturedImageSrc = () => {
            const featuredImage = document.querySelector('.editor-post-featured-image img');
            if (featuredImage && featuredImage.src) {
                let newSrc = convertToCdnUrl(featuredImage.src);
                featuredImage.src = newSrc;
            }
        };

        const convertToCdnUrl = (originalUrl) => {
            return fifu_cdn_adjust(originalUrl);
        };

        const checkAndDisableButtons = () => {
            const featuredImageContainer = jQuery('.editor-post-featured-image__container');
            if (featuredImageContainer.length > 0 && (jQuery("#fifu_input_url").val() || jQuery("#fifu_image").css('background-image').includes('http'))) {
                fifu_disable_wp_featured_image_buttons();
                clearInterval(buttonCheckInterval); // Stop checking once buttons are disabled
            }
        };

        // Periodically check for the presence of the buttons and disable them if needed
        const buttonCheckInterval = setInterval(checkAndDisableButtons, 500);

        const unsubscribe = wp.data.subscribe(() => {
            const currentPanelState = wp.data.select('core/edit-post').isEditorPanelOpened('featured-image');
            const featuredImageId = wp.data.select('core/editor').getEditedPostAttribute('featured_media');

            // Check for panel state change
            if (currentPanelState !== previousPanelState) {
                previousPanelState = currentPanelState;
                setTimeout(function () {
                    if (currentPanelState && (jQuery("#fifu_input_url").val() || jQuery("#fifu_image").css('background-image').includes('http'))) {
                        fifu_disable_wp_featured_image_buttons();
                    } else
                        fifu_enable_wp_featured_image_buttons();
                }, 100);
            }

            // Update featured image source if there's an ID
            if (featuredImageId) {
                setTimeout(updateFeaturedImageSrc, 1);
            }
        });
    });

    // refresh image

    (function (wp) {
        wp.data.subscribe(function () {
            var isSavingPost = wp.data.select('core/editor').isSavingPost();
            var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();

            if (isSavingPost && !isAutosavingPost) {
                // Get the new image URL from your input field
                var newImageUrl = jQuery("#fifu_input_url").val();

                // Find the featured image element using a more specific selector
                var featuredImageElement = jQuery('.components-responsive-wrapper img.components-responsive-wrapper__content');

                // Check if the element exists and update its 'src' attribute
                if (featuredImageElement.length && newImageUrl) {
                    featuredImageElement.attr('src', newImageUrl);
                }
            }
        });
    })(window.wp);

    // remove empty image from the media library

    (function (wp, $) {
        // Global variables to store the featured media ID and URL
        window.featuredMediaIdGlobal = null;
        window.featuredMediaUrlGlobal = null;

        // Subscribe to editor data changes to get the featured media ID and URL
        var unsubscribe = wp.data.subscribe(function () {
            var currentPost = wp.data.select('core/editor').getCurrentPost();
            var isSavingPost = wp.data.select('core/editor').isSavingPost();
            var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();

            if (currentPost && currentPost.id && !isSavingPost && !isAutosavingPost) {
                unsubscribe(); // Stop listening to changes
                window.featuredMediaIdGlobal = currentPost.featured_media;

                if (window.featuredMediaIdGlobal) {
                    wp.apiFetch({path: '/wp/v2/media/' + window.featuredMediaIdGlobal}).then(media => {
                        window.featuredMediaUrlGlobal = media.source_url;
                    }).catch(error => {
                        console.error('Error fetching media:', error);
                    });
                }
            }
        });

        // Function to extract hostname from URL
        function getHostname(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hostname;
        }

        // Extend the media frame to include custom logic when opened
        var _oldMediaFrame = wp.media.view.MediaFrame.Select;
        wp.media.view.MediaFrame.Select = _oldMediaFrame.extend({
            open: function () {
                _oldMediaFrame.prototype.open.apply(this, arguments);

                // Custom logic when the media frame is opened
                var currentSiteDomain = window.location.hostname;
                var mediaUrlDomain = getHostname(window.featuredMediaUrlGlobal);

                if (currentSiteDomain !== mediaUrlDomain) {
                    setTimeout(function () {
                        jQuery('.attachments li img[src=""]').parent().parent().parent().parent().remove();
                    }, 1);
                }
            }
        });
    })(window.wp, jQuery);
}

// disable/enable buttons

function fifu_disable_wp_featured_image_buttons() {
    const featuredImageContainer = jQuery('.editor-post-featured-image__container');
    featuredImageContainer.find('button').prop('disabled', true);
}

function fifu_enable_wp_featured_image_buttons() {
    const featuredImageContainer = jQuery('.editor-post-featured-image__container');
    featuredImageContainer.find('button').prop('disabled', false);
}
