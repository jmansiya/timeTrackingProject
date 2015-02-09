/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(require){
   var dataservices = require('../modules/data/dataService');
   var notifications = require('../modules/notifications');
   
   var errorHandler = {
       init: function(){
           window.onerror = function(msg, url, line){
               console.log("window.onerror sobreescrito!");
               dataservices.setError({Message: msg, Url: url, Line: line});               
               return false;
           };
           
           dataservices.setErrorHandlers(function(req){
               var msg = "An error ocurred : " + req.statusText;
               if(req.responseText){
                   var errorInfo = $.parseJSON(req.responseText);
                   if(errorInfo.Message){
                       msg += " Error " + errorInfo.Message;
                   }
               }
               console.log("ERRORR  obtenido.!");
               console.log(req);
               notifications.show('danger', msg, true);
           });
       }
   };
   
   return errorHandler;
});

