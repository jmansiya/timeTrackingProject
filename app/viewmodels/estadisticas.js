/**
 * Created by Jose Mansilla on 17/01/15.
 */

define(function (require) {
    var dataService = require('../modules/data/dataService');
    var GroupedInfo = require('../widgets/groupedActivity/groupedInfo');

    var vm = {
        groups: ko.observableArray(),
        activate: function () {
            var self = this;
            var date = moment();
            debugger;
            this.groups.removeAll();
            return $.when(dataService.getGroupedActivity(0, date.year(), date.isoWeek()),
                    dataService.getGroupedActivity(1, date.year(), date.month() + 1),
                    dataService.getGroupedActivity(2, date.year(), 0)
                ).then(function (daily, weekly, monthly) {
                    self.groups.push(new GroupedInfo(daily[0], 40, 'Day', 'Hours', 'This Week'));//Dias - 40 horas semanales como Total
                    self.groups.push(new GroupedInfo(weekly[0], 160, 'Week', 'Hours', 'This Month'));//Semanas - 160 horas al mes como Total
                    self.groups.push(new GroupedInfo(monthly[0], 215, 'Month', 'Days', 'This Year')); //Meses - 215 dias al año como Total
                });
        }
    };

    return vm;
});