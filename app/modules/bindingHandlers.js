/**
 * Created by Jose Mansilla on 16/01/15.
 */

define(function(require){
    var composition = require('durandal/composition');
    require('bootstrap');/*En el curso no requiere de que se carge bootstrap aquí no sé por qué pero sin esto no funciona
    la función $().button('loading')*/

    var bindingHandlers = {
        init: function(){
            composition.addBindingHandler('click-loading', {
                init: function(element, valueAccesor, allBidingsAccessor, viewModel){
                    var allBindings = allBidingsAccessor();
                    $(element).click(function(e){
                        e.preventDefault();
                        $(element).button('loading');
                        allBindings['click-loading'].call(viewModel).always(function(){
                            $(element).button('reset');
                        });
                    });
                }
            })
        }
    };

    return bindingHandlers;
});