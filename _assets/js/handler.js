var Site = {

    init : function()
    {
        this.drawAbstract();
    },

    drawAbstract : function()
    {
        // IE6 pretty much explodes trying to draw the background
        if ($('html').hasClass('ie6')) return;


        var background = $('<div id="background" />').appendTo('body');
        background.wrap('<div id="background-wrapper" />');

        var abstract_canvas = Abstract.build(background, 3000, 3000, function(canvas) {

            var base_colors = ['#ccc'];
            var colors = base_colors.concat(['#FFF']);

            canvas.origin({ x : [0, '100%'], y : [0, '100%'] });

            canvas.repeat([400, 600], function() {

                var option = Abstract.utilites.random([1, 10]);

                if (option == 1) {

                    canvas.circle({ size : [10, 200], fill : colors, opacity : [5, 10], stroke : false });

                } else if (option == 2) {

                    canvas.circle({ size : [60, 600], fill : false, opacity : [5, 10], stroke : { color : colors, width : [1,10] } });

                } else {

                    canvas.circle({ size : [5, 32], fill : ['#222'], opacity : [5, 10], stroke : false });
                }
            });
        })[0];

        $('h1').css('cursor', 'pointer').click(function() {
            abstract_canvas.redraw();
        })
    }

};

$(function() {
    Site.init();
});
