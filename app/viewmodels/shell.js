define(function (require) {
    var router = require('plugins/router');
    var app = require('durandal/app');
    var bindingHandlers = require('../modules/bindingHandlers');
    var errorHandlers = require('../modules/errorHandler');
    var authentication = require('../modules/authentication');
    var context = require('../modules/context');
    var validation = require('../modules/validations');
    

    return {
        router: router,
        context: context,
        authentication: authentication,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'activity/:id', title: 'Actividad', moduleId: 'viewmodels/activity', nav: false},
                { route: 'estadisticas', title: 'Estadísticas', moduleId: 'viewmodels/estadisticas', nav: true },
                { route: 'login', title: 'Login Time Tracking', moduleId: 'viewmodels/login', nav: false}
            ]).mapUnknownRoutes('viewmodels/ivalidRoute', 'invalid')
              .buildNavigationModel();
            
          //  router.on('router:navigation:cancelled', function(instance, instruction){
                //alert('Se ha cancelado la navegación de la ruta : ' + instruction.fragment);
          //  });
            
            /**
             * Sirve para comprobar si una URL es visible o no y por tanto se redirige a otra url
             * Es muy util para autorizaciones para ver a que URL tenemos acceso o no.
             * 
             * @param {type} activador
             * @param {type} instruction
             * @returns {String|Boolean}
             */
           // router.guardRoute = function (activador, instruction){
           //     return instruction.fragment.indexOf('activity') === 0 ? 'login' : true;
           // };

            bindingHandlers.init();
            errorHandlers.init();
            authentication.init();  
            validation.init();

            return router.activate();
        }
    };
});