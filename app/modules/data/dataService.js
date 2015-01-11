/**
 * Created by Jose Mansilla on 11/01/15.
 */

define(function(require){
    var request = require('plugins/http');

    var apiURL = 'http://localhost:9000/api/';

    //Configuramos la autenticación básica para llamar a nuestra API

    $.ajaxSetup({
        beforeSend: function(req){
            req.setRequestHeader('Authorization', 'Basic dXNlcjp1c2Vy');
        }
    })

    return{
        getTimeRecords: function(count){
            return request.get(apiURL + 'TimeRecord/GetAll', {count: count});
        }
    }
});