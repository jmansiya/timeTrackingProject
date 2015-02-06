/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(require){
    function createHash(user, password){
        var token = user + ':' + password;
        
        return 'Basic ' + window.btoa(token);
    }
    
    return {
        login: function(user, password, rememberMe){
            createHash(user, password);
        },
        
        init: function(){
            
        }
    }
})

