/**
 * Created by Jose Mansilla on 11/01/15.
 */

define(function(require){
    var request = require('plugins/http');
    var notifications = require('../notifications');

    var apiURL = 'http://localhost:9000/api/';

    //Configuramos la autenticación básica para llamar a nuestra API

    var handlerNotifications = function(req){
       notifications.show('danger', 'Se ha producido un error ' + req.responseText, true)
    };

    $.ajaxSetup({
        beforeSend: function(req){
            req.setRequestHeader('Authorization', 'Basic dXNlcjp1c2Vy');
        }
    });

    return{
        getTimeRecords: function(count){
            return request.get(apiURL + 'TimeRecord/GetAll', {count: count}).fail(handlerNotifications);
        },
        setTimeRecord: function(_timeRecord){
            return request.post(apiURL + "TimeRecord", _timeRecord).fail(handlerNotifications);
        }
    }
});