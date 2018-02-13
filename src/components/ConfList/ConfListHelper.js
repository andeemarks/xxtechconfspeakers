var numeral = require('numeral');

class ConfListHelper {
    constructor() { }

    whoFormatter(cell, row) {
        return `${cell} (${row.year}) <a href='${row.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`;
    }

    genderDiversityFormatter(cell) {
        return numeral(cell).format('0%')
    }

    rowIndexFormatter(cell, row, formatExtraData, rowIdx) {
        return numeral(rowIdx + 1).format('0')
    }
}

module.exports = ConfListHelper;