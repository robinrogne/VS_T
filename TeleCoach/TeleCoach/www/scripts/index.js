// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var filePath;
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById('readFile').addEventListener('click', readFile, false);
        //document.getElementById('saveFile').addEventListener('click', saveFile, false);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", { create: true, exclusive: false }, gotFileEntry, fail);
    }
    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
        filePath = fileEntry;
    }
    function gotFileWriter(writer) {
        writer.onwriteend = function (evt) {
            filePath.file(
                function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function(evt){ alert(evt.target.result);}; 
                    reader.readAsText(file);
                },
                function () {
                    console.log("Det funkade inte!");
                }
            );
        };
        writer.write("hejsanknasboll!");
        /*navigator.globalization.dateToString(
            new Date(),
            function (date) { writer.write(date) },
            function () {},
            { formatLength: 'short', selector: 'date and time'}
        );*/
       
    }
    function fail(error) {
        console.log(error.code);
    }
    function readFile() {
      
    }
} )();