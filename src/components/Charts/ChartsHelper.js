
class ChartsHelper {
    constructor() { }

    formatDataForPieChart(confs) {
        return [
            { title: "Diversity >= 50%", value: 0, color: "white" },
            { title: "Diversity >= 40%", value: 0, color: "green" },
            { title: "Diversity >= 30%", value: 0, color: "blue" },
            { title: "Diversity >= 20%", value: 0, color: "orange" },
            { title: "Diversity >= 10%", value: 0, color: "fuchsia" },
            { title: "Diversity < 10%", value: 0, color: "red" },
        ]
    };
}

module.exports = ChartsHelper;