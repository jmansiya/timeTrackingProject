/**
 * Created by Jose Mansilla on 9/01/15.
 */
define(function(require){
    var dataServices = require('../modules/data/dataService');
    //var ko = require('knockout');
    var app = require('durandal/app');
    var notifications = require('../modules/notifications');

    function setTimeRecord(record){
        record.TimeZoneOffset = new Date().getTimezoneOffset();

        return dataServices.setTimeRecord(record);
    }
/*
    var user = function(name, surname){
            this.name = ko.observable(name);
            this.surname = ko.observable(surname);
            this.fullname = ko.computed(function(){
                return this.name() + ', ' + this.surname();
            }, this);
        };
*/

    return {
        timeRecords: ko.observableArray(),

        //user: new user("jose", "mansilla"),

        activity: ko.observable(),
        lastRecord: ko.observable(),
        canStartTracking: ko.observable(),

        activate: function(){
            var self = this;

            return dataServices.getTimeRecords(10).then(function(res){
                self.timeRecords(res);
                if(self.timeRecords().length > 0){
                    var lastRecord = self.timeRecords()[0];
                    self.lastRecord(lastRecord);
                    self.canStartTracking(lastRecord.IsCompleted);
                }
            });
        },

        startCommand: function(){
            var newTimeRecord = {
                    IsCompleted: false,
                    Activity: this.activity()
                },
                self = this;

            if (!this.activity()){
                app.showMessage('Debe insertar el nombre de la actividad.');

                return $.Deferred().reject();
            }

            return setTimeRecord(newTimeRecord).then(function(timeRecord){
                self.lastRecord(timeRecord);
                self.canStartTracking(false);
                self.timeRecords().unshift(timeRecord);

                notifications.show('success', 'La actividad ' + timeRecord.Activity + " se ha iniciado correctamente.");
            });
        },
        endCommand: function(){
            var self = this;

            return setTimeRecord(self.lastRecord).then(function(timeRecord){
                self.lastRecord(timeRecord);
                var result = $.grep(self.timeRecords(), function(r){ return r.Id === timeRecord.Id});
                if(result.length === 1){
                    self.timeRecords.replace(result[0], timeRecord);
                }

                self.canStartTracking(true);
                self.activity('');

                notifications.show('success', 'La actividad ' + timeRecord.Activity + ' se ha finalizado correctamente.');
            });
        }
    };
});