define(function (require) {
    var localizacion = require('../../modules/geolocalizacion');
    var locationServices = new localizacion();
    var system = require('durandal/system');
    var app = require('durandal/app');
    var notifications = require('../../modules/notifications');
    var dataServices = require('../../modules/data/dataService');
    var intervalId;

    /**
     * Devolvemos la función ctor con esto conseguimos que podamos tener varios objetos de este en estados directentes
     * en otras palabras no es un singlelton como pueden ser home.js, en el que se devuelve un objeto con metodos y que
     * solo se puede instanciar una vez.
     */

    var ctor = function () {
        this.timeElapsed = ko.observable();
        this.duration = ko.observable();
        this.canStartTracking = ko.observable();
        this.activity = ko.observable();
        this.lastRecord = ko.observable();
    };

    ctor.prototype.activate = function (settings) {
        /*this.canStartTracking(settings.options[0]);
        this.lastRecord(settings.options[1]);*/
        var self = this;

        if (settings.lastRecord && !settings.lastRecord.IsCompleted) {
            this.lastRecord(settings.lastRecord);
            this.timeElapsed(settings.lastRecord.DurationStr);
            this.canStartTracking(false);
            this.setElapsedTimer();
            this.activity(this.lastRecord.Activity);
        } else {
            this.initialize();
        }


        /* this.chronometro = setInterval(function(){

         }, 100);*/
    };

    ctor.prototype.detached = function () {
        clearInterval(intervalId);
    };

    ctor.prototype.initialize = function () {
        this.canStartTracking(true);
        this.lastRecord({
            IsCompleted: ko.observable(false),
            Duration: ko.observable(0),
            Activity: ko.observable('')
        });
        this.activity('');
        clearInterval(intervalId);
        this.timeElapsed('00:00:00');
    };


    ctor.prototype.startCommand = function(){
        var newTimeRecord = {
                IsCompleted: false,
                Activity: this.activity()
            },
            self = this;

        if (!this.activity()){
            app.showMessage('Debe insertar el nombre de la actividad.');

            return $.Deferred().reject();
        }

        return getLocalizacion().then(function(loc){
            newTimeRecord.StartLocalization = loc;

            self.canStartTracking(false);
            self.lastRecord(newTimeRecord);

            return setTimeRecord(newTimeRecord).then(function(timeRecord){
                self.lastRecord(timeRecord);
                self.canStartTracking(false);
               // self.timeRecords().unshift(timeRecord);

                app.trigger('timeRecord:changed:start', timeRecord);
                self.setElapsedTimer();

                notifications.show('success', 'La actividad ' + timeRecord.Activity + " se ha iniciado correctamente.");
            });
        });
    };

     ctor.prototype.endCommand = function(){
        var self = this;

        return getLocalizacion().then(function(loc){
            self.lastRecord.EndLocalization = loc;

            return setTimeRecord(self.lastRecord).then(function(timeRecord){
                self.lastRecord(timeRecord);

                app.trigger('timeRecord:changed:end', timeRecord);

                self.canStartTracking(true);
                self.activity('');
                clearInterval(intervalId);

                notifications.show('success', 'La actividad ' + timeRecord.Activity + ' se ha finalizado correctamente.');
            });
        });
    };

    ctor.prototype.setElapsedTimer = function () {
        var self = this;
        var start = moment(this.lastRecord.StartUtc, "YYYY-MM-DD HH:mm:ss");
        var addZeroFn = function (num) { return ('0' + num).slice(-2); };
        this.duration(this.lastRecord.Duration);
        this.duration.subscribe(function (duration) {
            var diff = moment(start).add('s', duration).diff(start);
            var momentDuration = moment.duration(diff);
            self.timeElapsed(addZeroFn(momentDuration.hours()) + ':' + addZeroFn(momentDuration.minutes()) + ':' + addZeroFn(momentDuration.seconds()));
        });

        clearInterval(intervalId);
        intervalId = setInterval(function () {
            self.duration(self.duration() + 1);
        }, 1000);
    };


    function setTimeRecord(record){
        record.TimeZoneOffset = new Date().getTimezoneOffset();

        return dataServices.setTimeRecord(record);
    }

    function getLocalizacion(){
        return system.defer(function (dfd){
            locationServices.getLocation().then(function(position){
                var loc = {
                    Latitude: position.coords.latitude,
                    Longitude: position.coords.longitude,
                    HorizontalAccuracy: position.coords.accuracy
                };

                dfd.resolve(loc);
            }).fail(function(err){
                    notifications.show('warning', 'Could not see the location ' + err);
                    dfd.reject(null);
                });
        })
    }

    return ctor;
});