/**
 * Created by Jose Mansilla on 11/01/15.
 */

define(function(require){
    var request = require('plugins/http');
 
    var apiURL = 'http://localhost:9000/api/';

    //Configuramos la autenticación básica para llamar a nuestra API

    var errorHandlers = [];
    var handlerNotifications = function(error){
        $.each(errorHandlers, function(){
            this(error);
        });      
    };

    $.ajaxSetup({
        beforeSend: function(req){
            req.setRequestHeader('Authorization', 'Basic dXNlcjp1c2Vy');
        }
    });

    return{
        setErrorHandlers: function(errorHandlerCallback){
            errorHandlers.push(errorHandlerCallback);
        },
        
        getTimeRecordSelected: function(id){
            return request.get(apiURL + "TimeRecord", {id: id}).fail(handlerNotifications);
        },

        getTimeRecords: function(count){
            return request.get(apiURL + 'TimeRecord/GetAll', {count: count}).fail(handlerNotifications);
        },
        setTimeRecord: function(_timeRecord){
            return request.post(apiURL + "TimeRecord", _timeRecord).fail(handlerNotifications);
        },

        getGroupedActivity: function (groupType, year, filter) {
            return request.get(apiURL + 'statistics', { groupType: groupType, year: year, filter: filter }).fail(handlerNotifications);
        },
        
        setError: function(error){
            return request.post(apiURL + 'error', error);
        }
    };
});