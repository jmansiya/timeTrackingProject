/**
 * Created by Jose Mansilla on 23/01/15.
 */
define(function(require){
    var dialog = require('plugins/dialog');

    var LocalizationDetail = function(timeRecord){
        this.timeRecord = ko.observable(timeRecord);
    };

    LocalizationDetail.prototype.close = function(){
        dialog.close(this);
    }

    LocalizationDetail.show = function(timeRecord){
        return dialog.show(new LocalizationDetail(timeRecord));
    }

    return LocalizationDetail;

});