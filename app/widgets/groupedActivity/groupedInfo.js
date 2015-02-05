define(function () {

    function createChartData(sum, totalValue) {
        return [{ value: totalValue - sum, color: '#E0E4CC' }, { value: sum, color: '#69D2E7' }];
    };
    
    function sumDuration(grouped) {
        var sum = 0;
        $.each(grouped, function () {
            sum += this.Duration;
        });
        return Math.floor(sum * 100) / 100;
    };

    var ctor = function (records, total, columnTitle, unit, groupTitle) {
        debugger;
        this.records = ko.observableArray(records);
        this.sum = ko.observable(sumDuration(records));
        this.total = ko.observable(total);
        this.chartData = ko.observable(createChartData(this.sum(), total));
        this.columntitle = ko.observable(columnTitle);
        this.unit = ko.observable(unit);
        this.groupTitle = ko.observable(groupTitle);
    };

    ctor.prototype.translateRelativeId = function (relativeId, groupType) {
        if (groupType == 0)
            return moment().weekday(relativeId).format("dddd");
        if (groupType == 2)
            return moment().months(relativeId - 1).format("MMMM");
        return "Week: " + relativeId;
    };

    return ctor;
});