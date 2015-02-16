/**
 * Created by Jose Mansilla on 16/01/15.
 */

define(['durandal/composition', 'chart'], function(composition){
   // var composition = require('durandal/composition');
   // require('bootstrap');
   /*En el curso no requiere de que se carge bootstrap aquí no sé por qué pero sin esto no funciona
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
            });
            
             composition.addBindingHandler('pie-chart', {
                init: function (element, valueAccessor) {
                   // debugger;
                    var ctx = element.getContext("2d");
                    var data = valueAccessor();
                    new Chart(ctx).Pie(data);
                }
            });
            
            composition.addBindingHandler('validate',{
                update: function(element, valueAccessor){
                    var data = valueAccessor();
                    
                    $(element).removeClass('has-success');
                    $(element).removeClass('has-error');
                    
                    if(data.isModified() && data.isValid()){
                        $(element).addClass('has-success');    
                    } else if (data.isModified() && !data.isValid()){
                        $(element).addClass('has-error');    
                    }
                }
            });
        }
    };

    return bindingHandlers;
});