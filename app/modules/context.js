/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(function(){
   var context = {
       user: ko.observable(),
       sessionToken: ko.observable(),
       isAuthenticated: ko.observable(false),
       
       clear: function(){
           this.user(null);
           this.sessionToken(null);
           this.isAuthenticated(false);
       }
   }; 
   
   return context;
});

