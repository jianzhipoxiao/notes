jQuery(document).ready(function () {
    jQuery('link[href*="jquery-ui.css"]').attr("disabled", "true");
    jQuery('div.wrap div.header-box div.notice').hide();
    jQuery('div.wrap div.header-box div#message').hide();
    jQuery('div.wrap div.header-box div.updated').remove();

    var metaIntervalId = null;
});

var restUrl = fifu_get_rest_url();

function invert(id) {
    if (jQuery("#fifu_toggle_" + id).attr("class") == "toggleon") {
        jQuery("#fifu_toggle_" + id).attr("class", "toggleoff");
        jQuery("#fifu_input_" + id).val('off');
    } else {
        jQuery("#fifu_toggle_" + id).attr("class", "toggleon");
        jQuery("#fifu_input_" + id).val('on');
    }
}

jQuery(function () {
    var url = window.location.href;

    //forms with id started by...
    jQuery("form[id^=fifu_form]").each(function (i, el) {
        //onsubmit
        jQuery(this).submit(function () {
            save(this);
        });
    });

    jQuery("#tabs-top").tabs();
    jQuery("#fifu_input_spinner_nth").spinner({min: 1});
    jQuery("#fifu_input_slider_speed").spinner({min: 0});
    jQuery("#fifu_input_slider_pause").spinner({min: 0});
    jQuery("#fifu_input_auto_set_width").spinner({min: 0});
    jQuery("#fifu_input_auto_set_height").spinner({min: 0});
    jQuery("#fifu_input_crop_delay").spinner({min: 0, step: 50});
    jQuery("#tabsApi").tabs();
    jQuery("#tabsCrop").tabs();
    jQuery("#tabsMedia").tabs();
    jQuery("#tabsPremium").tabs();
    jQuery("#tabsWooImport").tabs();
    jQuery("#tabsWpAllImport").tabs();
    jQuery("#tabsDefault").tabs();
    jQuery("#tabsHide").tabs();
    jQuery("#tabsShortcode").tabs();
    jQuery("#tabsFifuShortcode").tabs();
    jQuery("#tabsAutoSet").tabs();
    jQuery("#tabsTags").tabs();
    jQuery("#tabsScreenshot").tabs();
    jQuery("#tabsIsbn").tabs();
    jQuery("#tabsMeta").tabs();
    jQuery("#tabsCustomfield").tabs();
    jQuery("#tabsFinder").tabs();
    jQuery("#tabsVideo").tabs();
    jQuery("#tabsContent").tabs();
    jQuery("#tabsContentAll").tabs();
    jQuery("#tabsCli").tabs();
    jQuery("#tabsRSS").tabs();

    // show settings
    window.scrollTo(0, 0);
    jQuery('.wrap').css('opacity', 1);
});

function save(formName, url) {
    var frm = jQuery(formName);
    jQuery.ajax({
        type: frm.attr('method'),
        url: url,
        data: frm.serialize(),
        success: function (data) {
            //alert('saved');
        }
    });
}

function fifu_default_js() {
    jQuery('#tabs-top').block({message: fifuScriptVars.wait, css: {backgroundColor: 'none', border: 'none', color: 'white'}});

    toggle = jQuery("#fifu_toggle_enable_default_url").attr('class');
    switch (toggle) {
        case "toggleoff":
            option = "disable_default_api";
            break;
        default:
            url = jQuery("#fifu_input_default_url").val();
            option = url ? "none_default_api" : "disable_default_api";
    }
    jQuery.ajax({
        method: "POST",
        url: restUrl + 'featured-image-from-url/v2/' + option + '/',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', fifuScriptVars.nonce);
        },
        success: function (data) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
            setTimeout(function () {
                jQuery('#tabs-top').unblock();
            }, 1000);
        },
        timeout: 0
    });
}

function fifu_fake_js() {
    jQuery('#tabs-top').block({message: fifuScriptVars.wait, css: {backgroundColor: 'none', border: 'none', color: 'white'}});

    toggle = jQuery("#fifu_toggle_fake").attr('class');
    switch (toggle) {
        case "toggleon":
            option = "enable_fake_api";
            break;
        case "toggleoff":
            option = "disable_fake_api";
            break;
        default:
            return;
    }

    jQuery.ajax({
        method: "POST",
        url: restUrl + 'featured-image-from-url/v2/' + option + '/',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', fifuScriptVars.nonce);
        },
        success: function (data) {
            setTimeout(function () {
                if (toggle == "toggleon") {
                    metaIntervalId = setInterval(updateMetadataCounter.bind(null, true), 3000);
                }
                if (toggle == "toggleoff") {
                    jQuery('#tabs-top').unblock();
                    jQuery('#image_metadata_counter').text('');
                }
            }, 1000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
        },
        timeout: 0
    });
}

function fifu_clean_js() {
    if (jQuery("#fifu_toggle_data_clean").attr('class') != 'toggleon')
        return;

    fifu_run_clean_js();
}

function fifu_run_clean_js() {
    jQuery('#tabs-top').block({message: fifuScriptVars.wait, css: {backgroundColor: 'none', border: 'none', color: 'white'}});

    jQuery.ajax({
        method: "POST",
        url: restUrl + 'featured-image-from-url/v2/data_clean_api/',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', fifuScriptVars.nonce);
        },
        success: function (data) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
            setTimeout(function () {
                jQuery("#fifu_toggle_data_clean").attr('class', 'toggleoff');
                jQuery("#fifu_toggle_fake").attr('class', 'toggleoff');
                jQuery('#tabs-top').unblock();
                jQuery('#image_metadata_counter').text('');
            }, 1000);
        },
        timeout: 0
    });
}

function fifu_run_delete_all_js() {
    if (jQuery("#fifu_toggle_run_delete_all").attr('class') != 'toggleon')
        return;

    fifu_run_clean_js();

    jQuery('#tabs-top').block({message: fifuScriptVars.wait, css: {backgroundColor: 'none', border: 'none', color: 'white'}});

    jQuery.ajax({
        method: "POST",
        url: restUrl + 'featured-image-from-url/v2/run_delete_all_api/',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', fifuScriptVars.nonce);
        },
        success: function (data) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
            setTimeout(function () {
                jQuery("#fifu_toggle_run_delete_all").attr('class', 'toggleoff');
                jQuery('#tabs-top').unblock();
            }, 3000);
        },
        timeout: 0
    });
}

function fifu_get_sizes($, att_id) {
    width = jQuery($)[0].naturalWidth;
    height = jQuery($)[0].naturalHeight;

    if (width == 1 && height == 1)
        return;

    jQuery.ajax({
        method: "POST",
        url: restUrl + 'featured-image-from-url/v2/save_sizes_api/',
        data: {
            "width": width,
            "height": height,
            "att_id": att_id,
            "url": jQuery($).attr('src'),
        },
        async: false,
        beforeSend: function (xhr) {
            jQuery($).removeAttr('onload');
            jQuery($).removeAttr('fifu-att-id');
            xhr.setRequestHeader("X-WP-Nonce", fifuScriptVars.nonce);
        },
        timeout: 10
    });

    return;
}

function updateMetadataCounter(transient) {
    jQuery.ajax({
        url: `${restUrl}featured-image-from-url/v2/metadata_counter_api/`,
        data: {
            "transient": transient,
        },
        method: 'POST',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', fifuScriptVars.nonce);
        },
        success: function (response) {
            jQuery('#image_metadata_counter').text(response);

            let metadataCounterValue = parseInt(jQuery('#image_metadata_counter').text().trim());
            if (metadataCounterValue === 0 && jQuery('#fifu_toggle_fake').hasClass('toggleon') && jQuery('#fifu_toggle_data_clean').hasClass('toggleoff')) {
                jQuery('#tabs-top').unblock();
                if (typeof metaIntervalId !== 'undefined') {
                    clearInterval(metaIntervalId);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Error updating metadata counter:', error);
        },
        timeout: 60
    });
}
