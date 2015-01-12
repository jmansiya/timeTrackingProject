/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(function(){
    return {
        activate: function (urlInvalid){
            alert("La ruta: " + urlInvalid + " no es correcta.");
            return true;
        }
    };
});

