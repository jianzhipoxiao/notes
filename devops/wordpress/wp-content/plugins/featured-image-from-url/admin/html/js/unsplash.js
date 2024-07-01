async function fifu_get_unsplash_urls(keywords, page) {
    try {
        let homeUrl = encodeURIComponent(fifuScriptVars.homeUrl);
        let version = fifuScriptVars.version;
        const response = await fetch(`https://unsplash-free.fifu.workers.dev?site=${homeUrl}&version=${version}&keywords=${keywords}`);
        const data = await response.json();
        const urls = data.results.map(result => result.urls.small);

        // Add images to the masonry
        if (urls.length > 0) {
            urls.forEach(url => {
                jQuery('div.masonry').append('<div class="mItem" style="max-width:400px;object-fit:content"><img src="' + url + '" style="width:100%"></div>');
            });
        }

        jQuery('#fifu-loading').remove();
        fifu_scrolling = false;

        jQuery('div.masonry').after('<div class="fifu-pro" style="float:right;position:relative;top:-5px;left:-145px"><a class="fifu-pro-link" title="' + fifuMetaBoxVars.txt_unlock + '"><span class="dashicons dashicons-lock fifu-pro-icon"></span></a></div><center><div id="fifu-loading"><img src="https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyloadxt/1.1.0/loading.gif"><div>' + fifuMetaBoxVars.txt_more + '</div><div></center>');
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

var fifu_scrolling = false;
var idSet = new Set();

function fifu_start_lightbox(keywords, unsplash, post_id, is_ctgr) {
    idSet = new Set();
    fifu_register_unsplash_click_event();

    txt_loading = typeof fifuMetaBoxVars !== 'undefined' ? fifuMetaBoxVars.txt_loading : '';
    txt_more = typeof fifuMetaBoxVars !== 'undefined' ? fifuMetaBoxVars.txt_more : '';

    jQuery.fancybox.open('<div><div class="masonry"></div></div>');
    jQuery('div.masonry').after('<center><div id="fifu-loading"><img src="https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyloadxt/1.1.0/loading.gif"><div>' + txt_loading + '</div><div></center>');

    if (!unsplash) {
        return;
    }

    let page = 1;
    fifu_get_unsplash_urls(keywords, page);
}

function fifu_register_unsplash_click_event() {
    jQuery('body').on('click', 'div.mItem > img', function (evt) {
        evt.stopImmediatePropagation();

        src = jQuery(this).attr('original');
        if (!src) {
            // unsplash
            src = jQuery(this).attr('src');
            src = src.replace('&w=400', '&w=1200');
        }

        // meta-box
        if (jQuery("#fifu_input_url").length) {
            jQuery("#fifu_input_url").val(src);
            previewImage();
        }
        jQuery.fancybox.close();
    });
}
