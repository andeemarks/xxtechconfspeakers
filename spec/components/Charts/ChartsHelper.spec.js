describe("The ChartsHelper module", function() {
    var ChartsHelper = require('../../../src/components/Charts/ChartsHelper');
    var helper;

    beforeEach(function() {
        helper = new ChartsHelper();
    });
    
    it("can turn an empty set of conf data into the right format for the pie chart", function() {
        expect(helper.countConfsByDiversityCohort([])).toEqual([
            { title: "0 confs >= 50%", value: 0, color: "white" },
            { title: "0 confs >= 40%", value: 0, color: "green" },
            { title: "0 confs >= 30%", value: 0, color: "blue" },
            { title: "0 confs >= 20%", value: 0, color: "orange" },
            { title: "0 confs >= 10%", value: 0, color: "fuchsia" },
            { title: "0 confs < 10%", value: 0, color: "red" },
        ]);
    });

    it("can turn a populated set of conf data into the right format for the pie chart", function () {
        expected = helper.countConfsByDiversityCohort([]);
        
        expect(expected['0'].color).toEqual("white");
        expect(expected['1'].color).toEqual("green");
        expect(expected['2'].color).toEqual("blue");
        expect(expected['3'].color).toEqual("orange");
        expect(expected['4'].color).toEqual("fuchsia");
        expect(expected['5'].color).toEqual("red");
    });
    
});