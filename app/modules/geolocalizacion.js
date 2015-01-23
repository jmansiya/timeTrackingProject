/**
 * Created by Jose Mansilla on 23/01/15.
 */
define(function(require){
    var system = require('durandal/system');

    var ctor = function(){};

    ctor.prototype.getLocation = function(){
        return system.defer(function (dfd){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                  function(position){
                    dfd.resolve(position);
                  },
                  function(error){
                    switch (error.code){
                        case error.PERMISSION_DENIED:
                            dfd.reject("User denied the request for Geolocalization.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            dfd.reject("Location information is unavailable");
                            break;
                        case error.TIMEOUT:
                            dfd.reject("Error de timeout");
                            break;
                        case error.UNKNOWN_ERR:
                            dfd.reject("Error desconocido en geolocalización");
                            break;
                    }
                  });
            }
        }).promise();
    };

    return ctor;
});