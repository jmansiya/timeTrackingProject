define(function (require) {
    var router = require('plugins/router');
    var app = require('durandal/app');
    var bindingHandlers = require('../modules/bindingHandlers');

    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'activity/:id', title: 'Actividad', moduleId: 'viewmodels/activity', nav: true },
                { route: 'login', title: 'Login Time Tracking', moduleId: 'viewmodels/login', nav: false}
            ]).mapUnknownRoutes('viewmodels/ivalidRoute', 'invalid')
              .buildNavigationModel();
            
            router.on('router:navigation:cancelled', function(instance, instruction){
                alert('Se ha cancelado la navegación de la ruta : ' + instruction.fragment);
            });
            
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

            return router.activate();
        }
    };
});