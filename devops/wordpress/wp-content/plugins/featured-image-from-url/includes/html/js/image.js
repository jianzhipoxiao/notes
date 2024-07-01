jQuery(document).ready(function ($) {
    // lazy load
    if (fifuImageVars.fifu_lazy)
        fifu_lazy();
    else {
        // no WordPress lazy load for the top images
        jQuery('img').each(function (index) {
            if (jQuery(this).offset().top < jQuery(window).height()) {
                jQuery(this).removeAttr('loading');
            }
        });
    }

    // woocommerce lightbox/zoom
    disableClick($);
    disableLink($);

    // zoomImg
    setTimeout(function () {
        jQuery('img.zoomImg').css('z-index', '');
        // Check if the zoomImg is missing an alt attribute and if its preceding sibling is an image
        if (!jQuery('img.zoomImg').attr('alt')) {
            const $zoomImg = jQuery('img.zoomImg');
            const $precedingImg = $zoomImg.prev('img');
            if ($precedingImg.length > 0) {
                $zoomImg.attr('alt', $precedingImg.attr('alt'));
            }
        }
    }, 1000);

    jQuery('img[height=1]').each(function (index) {
        if (jQuery(this).attr('width') != 1)
            jQuery(this).css('position', 'relative');
    });

    // load more buttons + lazy load
    jQuery('a.btn-load-more').on('click', function () {
        fifu_lazy();
    });
});

jQuery(window).on('ajaxComplete', function () {
    if (fifuImageVars.fifu_lazy)
        fifu_lazy();
});

jQuery(document).ajaxSuccess(function ($) {
    if (fifuImageVars.fifu_lazy)
        fifu_lazy_ajax();
});

var observer = new MutationObserver(function (mutations) {
    if (fifuImageVars.fifu_lazy) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (jQuery(node).find('img').length > 0) {
                    // ignore WooCommerce zoom
                    if (!jQuery(node).hasClass('pswp__zoom-wrap')) {
                        jQuery(node).find('img').each(function (index) {
                            // dont touch on slider
                            if (jQuery(this).attr('src') == 'null' || jQuery(this).hasClass('lazyload'))
                                return;

                            fifu_lazy_ajax(this);
                        });
                    }
                    return;
                } else if (jQuery(node).prop('tagName') == 'IMG') {
                    // ignore WooCommerce zoom
                    if (!jQuery(node).hasClass('zoomImg'))
                        fifu_lazy_ajax(node);
                    return;
                }
            });
        });
    }
});
observer.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});

function disableClick($) {
    if (!fifuImageVars.fifu_woo_lbox_enabled) {
        firstParentClass = '';
        parentClass = '';
        jQuery('figure.woocommerce-product-gallery__wrapper').find('div.woocommerce-product-gallery__image').each(function (index) {
            parentClass = jQuery(this).parent().attr('class').split(' ')[0];
            if (!firstParentClass)
                firstParentClass = parentClass;

            if (parentClass != firstParentClass)
                return false;

            jQuery(this).children().click(function () {
                return false;
            });
            jQuery(this).children().children().css("cursor", "default");
        });
    }
}

function disableLink($) {
    if (!fifuImageVars.fifu_woo_lbox_enabled) {
        firstParentClass = '';
        parentClass = '';
        jQuery('figure.woocommerce-product-gallery__wrapper').find('div.woocommerce-product-gallery__image').each(function (index) {
            parentClass = jQuery(this).parent().attr('class').split(' ')[0];
            if (!firstParentClass)
                firstParentClass = parentClass;

            if (parentClass != firstParentClass)
                return false;

            jQuery(this).children().attr("href", "");
        });
    }
}

jQuery(document).click(function ($) {
    fifu_fix_gallery_height();
})

function fifu_fix_gallery_height() {
    if (fifuImageVars.fifu_is_flatsome_active) {
        mainImage = jQuery('.woocommerce-product-gallery__wrapper div.flickity-viewport').find('img')[0];
        if (mainImage)
            jQuery('.woocommerce-product-gallery__wrapper div.flickity-viewport').css('height', mainImage.clientHeight + 'px');
    }
}
