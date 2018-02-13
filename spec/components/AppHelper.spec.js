require('jasmine-collection-matchers');

describe("The AppHelper module", function() {
    var AppHelper = require('../../src/components/AppHelper');
    var helper;

    beforeEach(function() {
        helper = new AppHelper();
    });
    
    it("can format the conference name and year", function() {
        // expect(helper.whoFormatter("Foo", {year: 2016, source: "bar"})).toContain("Foo (2016)");
        // expect(helper.whoFormatter("Bar", {year: 2017, source: "foo"})).toContain("Bar (2017)");
    });

});