/**
 * Created by Jose Mansilla on 9/01/15.
 */
define(function(require){
    var dataService = require("../modules/data/dataService");

    return {
        activity: ko.observable(),
        inicio: ko.observable(),
        fin: ko.observable(),
        duracion: ko.observable(),

        activate: function(id){
            console.log("ID Actividad a mostrar el detalle");
            var self = this;

            return dataService.getTimeRecordSelected(id).then(
                function(res){
                    self.activity = res.Activity;
                    self.inicio = moment.utc( res.Start ).format('DD/MM/YYYY HH:mm:ss');
                    if(res.End){
                        self.fin = moment.utc( res.End).format('DD/MM/YYYY HH:mm:ss');
                    }

                    self.duracion =res.DurationStr;
                }
            );
        }
       
       //canActivate: function(){
       //    console.log("No se puede navegar a a esta web está en construcción.");
       //    return false;
       //}
    };
});
