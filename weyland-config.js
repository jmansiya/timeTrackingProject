exports.config = function(weyland) {
    weyland.build('main')
        .task.jshint({
            include:'app/**/*.js'
        })
        .task.uglifyjs({
            include:['app/**/*.js', 'scripts/lib/durandal/**/*.js']
        })
        .task.rjs({
            include:['app/**/*.{js,html}', 'scripts/lib/durandal/**/*.js'],
            loaderPluginExtensionMaps:{
                '.html':'text'
            },
            rjs:{
                name:'../scripts/lib/almond-custom', //to deploy with require.js, use the build's name here instead
                insertRequire:['main'], //not needed for require
                baseUrl : 'app',
              
                wrap:true, //not needed for require
                paths : {
                    'text': '../scripts/lib/text',
                    'durandal': '../scripts/lib/durandal/js',
                    'plugins': '../scripts/lib/durandal/js/plugins',
                    'transitions': '../scripts/lib/durandal/js/transitions',
                    'knockout': 'empty:',
                    'bootstrap': 'empty:',
                    'jquery': 'empty:',
                    'chart': '../scripts/lib/chart'
                },
                inlineText: true,
                optimize : 'none',
                pragmas: {
                    build: true
                },
                stubModules : ['text'],
                keepBuildDir: true,
                out:'app/main-built.js'
            }
        });
}