describe("The CalloutsHelper module", function() {
    var CalloutsHelper = require('../../../src/components/Callouts/CalloutsHelper');
    var MockDate = require('mockdate');
    var helper;

    beforeEach(function() {
        helper = new CalloutsHelper();
        MockDate.set('1/1/2018');
    });

    afterEach(function() {
        MockDate.reset();
    });
    
    it("can separate the conferences for the current year", function() {
      expect(helper.findConfsForCurrentYear([{year: 2017}, {year: 2018}])).toEqual([{year: 2018}]);
      expect(helper.findConfsForCurrentYear([{year: 2017}])).toEqual([]);
      expect(helper.findConfsForCurrentYear([{year: 2017}, {name: "A", year: 2018}, {name: "B", year: 2018}])).toEqual([{name: "A", year: 2018}, {name: "B", year: 2018}]);
    });
    
    it("can calculate the average diversity across a set of conferences", function() {
      expect(helper.calculateAverageDiversity([{diversityPercentage: 0}, {diversityPercentage: 1}])).toBe(.5);
      expect(helper.calculateAverageDiversity([{diversityPercentage: .25}, {diversityPercentage: .75}])).toBe(.5);
      expect(helper.calculateAverageDiversity([{diversityPercentage: .2}, {diversityPercentage: .3}, {diversityPercentage: .4}])).toBe(.3);
      expect(helper.calculateAverageDiversity([{diversityPercentage: 0}])).toBe(0);
    });

    it("can work out whether a conference is from the current year", function() {
      expect(helper.confFromCurrentYear({year: 2000})).toBe(false);
      expect(helper.confFromCurrentYear({year: 2018})).toBe(true);
      expect(helper.confFromCurrentYear({})).toBe(false);
    });
    
    it("can work out whether a conference has diversity at parity (or better)", function() {
      expect(helper.diversityAtParityOrGreater({})).toBe(false);
      expect(helper.diversityAtParityOrGreater({diversityPercentage: 0.49})).toBe(false);
      expect(helper.diversityAtParityOrGreater({diversityPercentage: 0.499})).toBe(false);
      expect(helper.diversityAtParityOrGreater({diversityPercentage: 0.5})).toBe(true);
    });
    
    it("can determine which conference has a higher diversity percentage", function() {
      expect(helper.diversitySorter({}, {})).toBe(0);
      expect(helper.diversitySorter({diversityPercentage: 0.49}, {diversityPercentage: 0.49})).toBe(0);
      expect(helper.diversitySorter({diversityPercentage: 0.49}, {diversityPercentage: 0.50})).toBe(1);
      expect(helper.diversitySorter({diversityPercentage: 0.49}, {diversityPercentage: 0.48})).toBe(-1);
      expect(helper.diversitySorter({diversityPercentage: 0}, {})).toBe(0);
      expect(helper.diversitySorter({diversityPercentage: 0.1}, {})).toBe(0);
      expect(helper.diversitySorter({}, {diversityPercentage: 0.1})).toBe(0);
    });
    
    it("can determine which conference has been added more recently", function() {
      expect(helper.dateAddedSorter({}, {})).toBe(0);
      expect(helper.dateAddedSorter({dateAdded: 2000}, {dateAdded: 2000})).toBe(0);
      expect(helper.dateAddedSorter({dateAdded: 2000}, {dateAdded: 2001})).toBe(1);
      expect(helper.dateAddedSorter({dateAdded: 2001}, {dateAdded: 2000})).toBe(-1);
      expect(helper.dateAddedSorter({dateAdded: 0}, {})).toBe(0);
      expect(helper.dateAddedSorter({dateAdded: 2000}, {})).toBe(0);
      expect(helper.dateAddedSorter({}, {dateAdded: 0})).toBe(0);
    });
});