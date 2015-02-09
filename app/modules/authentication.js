/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(require){
    var context = require('../modules/context');
    var dataService = require('../modules/data/dataService');
    var router = require('plugins/router');
    var system = require('durandal/system');
    
    function createHash(user, password){
        var token = user + ':' + password,
            resultado = 'Basic ' + window.btoa(token);
    
        console.log("Resultado :: " +  resultado);
        return resultado;
    }
    
    function getUser(){
        return dataService.getUser().then(function(user){
            context.user(user);
            context.isAuthenticated(true);
        });
    }
    
    return {
        login: function(user, password, rememberMe){
            context.sessionToken(createHash(user, password));
            
            console.log("Token almacenado en el contexto: " + context.sessionToken());
            
            return dataService.authenticate().then(function(res){
                 context.sessionToken("Session " + res.access_token);
                 
                 if(rememberMe){
                     localStorage.setItem("auth", context.sessionToken());
                 }
                 
                 return getUser();
            });
        },
        
        logOff: function(){
            context.clear();
            localStorage.removeItem("auth");
            router.navigate('login', {trigger: true, replace: true});
        },
        
        authenticate: function(){
            return system.defer(function (dfd){
              var tempSessionToken = localStorage.getItem('auth');
              console.log("Token : " + tempSessionToken);
              if(!tempSessionToken){
                  dfd.reject();
              }else{
                  context.sessionToken(tempSessionToken);
                  getUser().then(function(){
                      dfd.resolve();
                  }).fail(function(){
                      dfd.reject();
                  });
              }
            }).promise();
        },
        
        init: function(){
            var self = this;
            
            var isLogin = function(fragment){
                return fragment.indexOf('login') > -1
            };
            
            var handlerUnAuthorized = function(){
                context.clear();
            };
            
            var getLoginRedirectRoute = function(instruccion){
                return instruccion ? 'login?redirect=' + instruccion : 'login';
            };
            
            /*
             * router.guardRoute te lo ejecuta cada vez que se active el router, para
             * navegar debido a alguna petición del usuario.
             */
            router.guardRoute = function(activador, instruccion){
                
                if(context.isAuthenticated()){
                    return !isLogin(instruccion.fragment);
                }else{
                    return system.defer(function(dfd){
                        self.authenticate().then(function(){
                            dfd.resolve(!isLogin(instruccion.fragment) ? true : '#');
                        }).fail(function(){
                            handlerUnAuthorized();
                            dfd.resolve(isLogin(instruccion.fragment) ? true : getLoginRedirectRoute(instruccion.fragment));
                        });
                    }).promise();
                }
            }; 
            
            $.ajaxSetup({
                beforeSend: function(req){
                    req.setRequestHeader('Authorization', context.sessionToken());
                }
            });
            
            dataService.setErrorHandlers(function(error){
                if ((error.status === 403 || error.status === 401) && context.isAuthenticated()){
                    handlerUnAuthorized();
                    if(!router.isNavigating()){
                        router.navigate(getLoginRedirectRoute(window.location.hash.replace('#', '')));
                    }
                } 
            });

        }
    };
});

