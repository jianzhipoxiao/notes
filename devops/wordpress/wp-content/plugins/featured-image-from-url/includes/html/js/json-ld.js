(function () {
    if (typeof fifuJsonLd !== 'undefined' && fifuJsonLd.url) {
        var jsonData = {
            "@context": "http://schema.org",
            "@type": "ImageObject",
            "url": fifuJsonLd.url
        };

        // Create a script element for the JSON-LD structured data
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonData);
        document.head.appendChild(script);
    }
})();
