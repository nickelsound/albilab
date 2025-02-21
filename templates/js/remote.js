$(document).ready(function() {
    $('#img_ok').click(function() {
        // Zavolá URL na Flask server
        $.get('/run-stop', function() {
            // Přiřadí třídu icon_gray
            $('#img_ok').addClass('icon_gray');
            
            setTimeout(function() {
                $('#img_ok').removeClass('icon_gray');
            }, 1000);
        });
    });

    $('#img_right').click(function() {
        $.get('/right', function() {
            $('#img_right').addClass('icon_gray');

            setTimeout(function() {
                $('#img_right').removeClass('icon_gray');
            }, 1000);
        });
    });

    $('#img_left').click(function() {
        $.get('/left', function() {
            $('#img_left').addClass('icon_gray');

            setTimeout(function() {
                $('#img_left').removeClass('icon_gray');
            }, 1000);
        });
    });


    $('#img_up').click(function() {
        $.get('/up', function() {
            $('#img_up').addClass('icon_gray');

            setTimeout(function() {
                $('#img_up').removeClass('icon_gray');
            }, 1000);
        });
    });

    $('#img_down').click(function() {
        $.get('/down', function() {
            $('#img_down').addClass('icon_gray');

            setTimeout(function() {
                $('#img_down').removeClass('icon_gray');
            }, 1000);
        });
    });


});
