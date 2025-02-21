// edited
jQuery('#upload_form').submit(function(e){
    e.preventDefault();
        var form = jQuery('#upload_form')[0];
        var data = new FormData(form);
        jQuery.ajax({
            url: '/update',
            type: 'POST',               
            data: data,
            contentType: false,                  
            processData:false,  
            xhr: function() {
                var elem = document.getElementById("bar");
                var progressBar = jQuery('#progressBar');

                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('loadstart', function(evt) {
                    progressBar.show();
                    var percentVal = '0%';
                    elem.style.width = percentVal;
                    elem.innerHTML = percentVal;
                }, false);
                xhr.upload.addEventListener('progress', function(evt) {
                    if (evt.lengthComputable) {
                        var percentVal = Math.round((evt.loaded / evt.total)*100);
                        elem.style.width = percentVal + '%';
                        elem.innerHTML = percentVal + '%';
                        if(percentVal >= 100){
                            elem.style.width = '100%';
                            elem.innerHTML = "Writing to Flash, please wait ...";
                        }
                    }
                }, false);
                return xhr;
            },                                
            success:function(d, s) {    
                location.reload();
            },
            error: function (a, b, c) {
            }
            });
});

jQuery('#wifi_settings').submit(function(e){
    e.preventDefault();
        var form = jQuery('#wifi_settings')[0];
        var data = new FormData(form);
        jQuery.ajax({
            url: '/config',
            type: 'POST',               
            data: data,
            contentType: false,                  
            processData:false,                                
            success:function(d, s) {    
                location.replace("/");
            },
            error: function (a, b, c) {
                alert("Check the length of all inputs. They must be in the range of 6-32 characters.");
            }
            });
});
