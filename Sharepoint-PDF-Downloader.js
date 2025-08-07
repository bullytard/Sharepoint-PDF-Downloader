// ==UserScript==
// @name         Sharepoint-PDF-Downloader
// @namespace    https://github.com/bullytard/Sharepoint-PDF-Downloader
// @version      1.0.0
// @description  Two Clicks to get the job done
// @author       bullytard
// @match        *://*.sharepoint.com/*
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function runcopy(){
        let copymaterial = document.getElementsByClassName("pdfViewer_526606d6")[0].ariaLabel.toString() ;;

        let linknew = g_listData.ListSchema[".mediaBaseUrl"] + "/transform/passthrough?provider=spo&inputFormat=pdf&cs=" +
            g_listData.ListSchema[".callerStack"] +
            "&docid=" + g_listData.ListData.CurrentFolderSpItemUrl + "&" +
            g_listData.ListSchema[".driveAccessToken"];



        // downloader
        GM_download({
            url: linknew,
            name: copymaterial, // New name for the downloaded file
            saveAs: false,
            onload: function() {
                console.log('Download started!');
            },
            onerror: function() {
                console.log('Download failed.');
            }
        });
    }

    // Create the button
    const butto = document.createElement('button');
    butto.style.position = 'fixed';
    butto.style.bottom = '150px';
    butto.style.right = '20px';
    butto.style.padding = '10px 20px';
    butto.style.backgroundColor = '#007bff';
    butto.style.color = '#fff';
    butto.style.border = 'none';
    butto.style.borderRadius = '5px';
    butto.style.cursor = 'pointer';
    butto.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    butto.style.zIndex = '10000';


    if (typeof g_listData == 'undefined'){
        butto.textContent = "open duplicate tab";
        document.body.appendChild(butto);
        butto.addEventListener('click', function() {
            (function(){window.open(window.location.href);})()
        });
    } else {

        butto.textContent = "download pdf";
        document.body.appendChild(butto);
        butto.addEventListener('click', function() {
            runcopy();
        });
    }
})();
