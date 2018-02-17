require('jasmine-collection-matchers');

describe("The ChartsHelper module", function() {
    var ChartsHelper = require('../../../src/components/Charts/ChartsHelper');
    var helper;

    beforeEach(function() {
        helper = new ChartsHelper();
    });
    
    it("can turn a set of conf data into the right format for the pie chart", function() {
        expect(helper.formatDataForPieChart([])).toEqual([
            { title: "Diversity >= 50%", value: 0, color: "white" },
            { title: "Diversity >= 40%", value: 0, color: "green" },
            { title: "Diversity >= 30%", value: 0, color: "blue" },
            { title: "Diversity >= 20%", value: 0, color: "orange" },
            { title: "Diversity >= 10%", value: 0, color: "fuchsia" },
            { title: "Diversity < 10%", value: 0, color: "red" },
        ]);
    });

});