/**
 * Created by Jose Mansilla on 9/01/15.
 */
define(function(){
   return {
       activate: function(id){
           alert("ID " + id);
       },
       
       canActivate: function(){
           console.log("No se puede navegar a a esta web está en construcción.");
           return false;
       }
   };
});
