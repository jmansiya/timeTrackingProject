requirejs.config({
    paths: {
        'text': '../scripts/lib/require/text',
        'durandal':'../scripts/lib/durandal/js',
        'plugins' : '../scripts/lib/durandal/js/plugins',
        'transitions' : '../scripts/lib/durandal/js/transitions',
        'knockout': '../scripts/lib/knockout/knockout-3.1.0',
        'bootstrap': '../scripts/lib/bootstrap/js/bootstrap',
        'jquery': '../scripts/lib/jquery/jquery-1.9.1',
        'chart': '../scripts/lib/chart'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

define('jquery', [], function () { return jQuery; });
define('knockout', [], function () { return ko; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);

    //>>excludeEnd("build");

    app.title = 'Time Tracking';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});