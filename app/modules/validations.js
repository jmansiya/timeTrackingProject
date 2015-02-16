/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(function(){
        return {
            init: function(){
                ko.validation.rules['confirmPasswordEqual'] = {
                validator: function (val, params) {
                    return val === params.params();
                },
                    message: 'Password do not match.'
                };
                
                ko.validation.registerExtenders();
                ko.validation.init({ insertMessages: true });
            }
        }
});
