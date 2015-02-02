define(function () {
    /**
     * Devolvemos la función ctor con esto conseguimos que podamos tener varios objetos de este en estados directentes
     * en otras palabras no es un singlelton como pueden ser home.js, en el que se devuelve un objeto con metodos y que
     * solo se puede instanciar una vez.
     */
    var ctor = function () {
        this.mapsAvailable = ko.observable();
        this.markers = [];
        this.map = null;
    };

    ctor.prototype.activate = function (settings) {
        this.settings = settings;
        var self = this;
        if (typeof google === 'undefined') {
            this.mapsAvailable(false);
        } else {
            this.mapsAvailable(true);
            $.each(settings.markers, function (ind, marker) {
                if (marker)
                    self.markers.push(new google.maps.Marker({
                        position: new google.maps.LatLng(marker.Latitude || 0.0, marker.Longitude || 0.0),
                        draggable: false,
                        visible: true
                    }));
            });
            if (this.markers.length == 0)
                this.mapsAvailable(false);
        }
    };

    ctor.prototype.detached = function () {
        $.each(this.markers, function () {
            this.setMap(null);
        });
    };

    ctor.prototype.attached = function (view) {
        var self = this;
        if (this.mapsAvailable()) {
            $("#googleMap", view).html('');
            this.map = new google.maps.Map($("#googleMap", view)[0], {
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            $.each(this.markers, function () {
                this.setMap(self.map);
            });
            if (this.markers.length > 0)
                this.map.setCenter(this.markers[0].position);
            google.maps.event.trigger(this.map, 'resize');
        }
    };

    return ctor;
});