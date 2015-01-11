/**
 * Created by Jose Mansilla on 9/01/15.
 */
define(function(require){
    var dataServices = require('../modules/data/dataService');
    var ko = require('knockout');

    return {
        timeRecords: ko.observableArray(),

        activate: function(){
            var self = this;

            return dataServices.getTimeRecords(10).then(function(res){
                self.timeRecords(res);
            });
        }
    };
});