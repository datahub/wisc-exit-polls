require("../css/styles.scss");

var $ = require("jquery");
var _tpl = require("lodash/template");

$(document).ready(function() {
    var url = 'http://media.dhb.io/data/wisc-april-exit-polls.json?r=';
    var cache = Math.floor(Date.now() / 1000);
    $.getJSON( url + cache, function( data ) {
        var response = JSON.parse(data);
        render(response.data);
    });
    /*
    var stickyTop = $('.wep--stickywrapper').offset().top;
    $(window).scroll(function() {
        if ($(this).scrollTop() >= top) {
            $('.wep--stickywrapper').addClass('wep--fixed');
            $('.wep--polls').css({marginTop:$('.wep--stickywrapper').height()+'px'});
        } else {
            $('.wep--stickywrapper').removeClass('wep--fixed');
            $('.wep--polls').css({marginTop:'0px'});
        }
    });
    */
});

var render = function(data) {

    if (data.length > 0) {
        var wrapper = $('.wep--polls');

        $.each(data,function(i,v) {
            var categoryTemplateString = '';

            $.each(v.categories,function(ind,val) {
                var categoryTpl = _tpl($('#template--category').html());
                var chtml = categoryTpl(val);
                categoryTemplateString = categoryTemplateString + chtml;
            });

            var pollTpl = _tpl($('#template--poll').html());
            var phtml = pollTpl({'topic': v.topic, "categorieshtml": categoryTemplateString});
            wrapper.append(phtml);

        });
    }
}
