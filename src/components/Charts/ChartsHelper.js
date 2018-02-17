var _ = require("underscore");

class ChartsHelper {
    constructor() { }

    countConfsByDiversityCohort(confs) {
        var confsByDiversityCohort = _.groupBy(confs, 
            function(conf) {
                var diversityCohort = Math.trunc(conf.diversityPercentage * 10);
                if (diversityCohort > 5) diversityCohort = 5;

                return diversityCohort;
            });

        if (confs.length == 0) {
            return [
                { title: "0 confs >= 50%", value: 0, color: "white" },
                { title: "0 confs >= 40%", value: 0, color: "green" },
                { title: "0 confs >= 30%", value: 0, color: "blue" },
                { title: "0 confs >= 20%", value: 0, color: "orange" },
                { title: "0 confs >= 10%", value: 0, color: "fuchsia" },
                { title: "0 confs < 10%", value: 0, color: "red" }
            ]
        } else {
            return [
                { title: confsByDiversityCohort['5'].length + " confs >= 50%", value: confsByDiversityCohort['5'].length, color: "white" },
                { title: "Diversity >= 40%", value: confsByDiversityCohort['4'].length, color: "green" },
                { title: "Diversity >= 30%", value: confsByDiversityCohort['3'].length, color: "blue" },
                { title: "Diversity >= 20%", value: confsByDiversityCohort['2'].length, color: "orange" },
                { title: "Diversity >= 10%", value: confsByDiversityCohort['1'].length, color: "fuchsia" },
                { title: "Diversity < 10%", value: confsByDiversityCohort['0'].length, color: "red" },
            ]
        }
    };
}

module.exports = ChartsHelper;