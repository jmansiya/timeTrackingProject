define(function () {

    var ctor = function () { };

    ctor.prototype.activate = function (settings) {
        this.info = settings.info;
    };

    return ctor;
});