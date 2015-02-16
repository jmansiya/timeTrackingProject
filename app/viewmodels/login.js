/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(require){
   var auth = require('../modules/authentication');
   var notifications = require('../modules/notifications');
   var router = require('plugins/router');
   var SignUp = require('viewmodels/signUp');
   
   var ctor = function(){
       this.username = ko.observable(),
       this.password = ko.observable(),
       this.rememberMe = ko.observable(),
       this.redirecURL = ko.observable(),
       
       this.activate = function(params){
           this.redirecURL(params ? params.redirect : '');
           return true;
       };
   };
  
   ctor.prototype.signUp = function(){
       SignUp.show().then(function(user){
           if(user){
               auth.login(user.Username, user.Password, false).then(function(){
                    router.navigate('', true);
                }).fail(function(){
                    notifications.show('danger', 'Ops... Se ha producido un error al crear al nuevo usuario', true);
                    self.username('');
                    self.password('');
                    self.rememberMe('');
                });
           }
       });
   }; 
   
   ctor.prototype.login = function(){
       var self = this;
       
       return auth.login(this.username(), this.password(), this.rememberMe()).then(function(){
           notifications.deleteNotifications();
           router.navigate(self.redirecURL(), true);
       }).fail(function(){
           notifications.show('danger', 'Ops... The current username and password are not correct', true);
           self.username('');
           self.password('');
           self.rememberMe('');
       });
   };
   
   return ctor;
});

