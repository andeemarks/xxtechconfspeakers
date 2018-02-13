describe("The CalloutsHelper module", function() {
    var CalloutsHelper = require('../../../src/components/Callouts/CalloutsHelper');
    var helper;

    beforeEach(function() {
        helper = new CalloutsHelper();
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