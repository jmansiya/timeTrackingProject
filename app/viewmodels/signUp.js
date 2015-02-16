/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(function(require){
    var dialog = require('plugins/dialog');
    var dataService = require('../modules/data/dataService');
    var notifications = require('../modules/notifications');
    
    var SignUp = function(){
        var self = this;
        
        this.model = ko.validatedObservable({
            name: ko.observable().extend({ required: true }),
            surname: ko.observable().extend({ required: true }),
            password: ko.observable().extend({ required: true, minLength: 6 }),
            username: ko.observable().extend({ required: true }),
            password2: ko.observable()
        });
        
        this.model().password2.extend({
            required: true,
            minLength: 6,
            confirmPasswordEqual: {
                params: self.model().password
            }
        });
    };
    
    SignUp.prototype.submit = function(){
        var self = this;
        if(this.model.isValid()){
            var user = {
                Name: this.model().name(),
                Surname: this.model().surname(),
                Username: this.model().username(),
                Password: this.model().password()
            };
            
            return dataService.createUser(user).then(function(){
                dialog.close(self, user);
                notifications.show("success", "Usuario creado correctamente. Enhorabuena");
            });
        }
        
        return false;
    };
    
    SignUp.prototype.close = function(){
        dialog.close(this);
    };
    
    SignUp.show = function(){
        return dialog.show(new SignUp());
    };
    
    return SignUp;
});
