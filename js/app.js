require("../css/styles.scss");

window.$ = require("jquery");
var _tpl = require("lodash/template");

$(document).ready(function() {
    render(data);
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
