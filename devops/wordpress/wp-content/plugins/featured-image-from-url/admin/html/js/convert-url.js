function fifu_convert($url) {
    if (!$url)
        return $url;

    if (fifu_from_google_drive($url))
        return fifu_google_drive_url($url);

    if (fifu_from_onedrive($url))
        return fifu_onedrive_url($url);

    if (fifu_has_special_char($url))
        return fifu_escape_special_char($url);

    return $url;
}

//Google Drive

function fifu_from_google_drive($url) {
    return $url.includes('drive.google.com');
}

function fifu_google_drive_id($url) {
    return $url.match(/[-\w]{25,}/);
}

function fifu_google_drive_url($url) {
    return 'https://drive.google.com/uc?id=' + fifu_google_drive_id($url);
}

//OneDrive

function fifu_from_onedrive($url) {
    return $url.includes('1drv.ms');
}

function fifu_onedrive_id($url) {
    return $url.split('/')[4].split('?')[0];
}

function fifu_onedrive_url($url) {
    id = fifu_onedrive_id($url);
    return `https://api.onedrive.com/v1.0/shares/${id}/root/content`;
}

//Special char

function fifu_has_special_char($url) {
    return $url.includes("'");
}

function fifu_escape_special_char($url) {
    return $url.replace("'", "%27");
}
