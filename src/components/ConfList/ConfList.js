import React, { PropTypes } from 'react';
import s from './ConfList.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'underscore';
// import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';

function whoFormatter(cell, row) {
  return `${cell} (${row.year}) <a href='${row.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`;
}

function historyItemFormatter(historyItem) {
  return genderDiversityFormatter(historyItem.diversityPercentage, "") + " <sup>(" + historyItem.year + ")</sup>";  
}

function yearExtractor(historyItem) {
  return historyItem.diversityPercentage;
}

function minDiversityFormatter(history, row) {
  return historyItemFormatter(_.min(history, yearExtractor));
}

function maxDiversityFormatter(history, row) {
  return historyItemFormatter(_.max(history, yearExtractor));
}

function numberOfMenFormatter(cell, row) {
  return row.totalSpeakers - row.numberOfWomen;
}

function genderDiversityFormatter(cell, row) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumIntegerDigits: 2,
    maximumIntegerDigits: 2,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(cell)}%`;
}

function genderDiversityRowStyle(row, rowIndex) {
  var percentage = row.diversityPercentage;
  if (percentage < 10) {
    return `${s.percentageCohortFTrans}`;
  } else if (percentage < 20) {
    return `${s.percentageCohortETrans}`;
  } else if (percentage < 30) {
    return `${s.percentageCohortDTrans}`;
  } else if (percentage < 40) {
    return `${s.percentageCohortCTrans}`;
  } else if (percentage < 50) {
    return `${s.percentageCohortBTrans}`;
  } else {
    return `${s.percentageCohortATrans}`;
  }
}

function genderDiversityCellStyle(percentage, row, rowIndex, columnIndex) {
  if (percentage < 10) {
    return `${s.percentageCohortF}`;
  } else if (percentage < 20) {
    return `${s.percentageCohortE}`;
  } else if (percentage < 30) {
    return `${s.percentageCohortD}`;
  } else if (percentage < 40) {
    return `${s.percentageCohortC}`;
  } else if (percentage < 50) {
    return `${s.percentageCohortB}`;
  } else {
    return `${s.percentageCohortA}`;
  }

}

function rowIndexFormatter(cell, row, formatExtraData, rowIdx) {
  return (rowIdx + 1);
}

class ConfList extends React.Component {

  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: 'diversityPercentage',
      defaultSortOrder: 'desc',
      sortIndicator: true
    };

    this.state = {
      confs: props.confs
    };
  }

  componentDidMount() {
    this.refs.table.handleSort('desc', 'diversityPercentage');
  }

  render() {
    return (
      <BootstrapTable
        data={this.state.confs}
        ref="table"
        containerClass={s.confTable}
        condensed bordered={ false }
        trClassName={ genderDiversityRowStyle }
        tableStyle={ { border: "none" }} >
        <TableHeaderColumn
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataField='diversityPercentage'
          dataFormat={ rowIndexFormatter }
          dataAlign='center'
          headerAlign='center'
          width='30'></TableHeaderColumn>
        <TableHeaderColumn
          isKey
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataField='diversityPercentage'
          columnClassName={ genderDiversityCellStyle }
          dataFormat={ genderDiversityFormatter }
          dataAlign='center'
          dataSort={ true }
          headerAlign='center'
          width='50'>f:m</TableHeaderColumn>
        <TableHeaderColumn
          dataField='name'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataFormat={ whoFormatter }
          dataSort={ true }
          width='220'
          >who</TableHeaderColumn>
        <TableHeaderColumn
          dataField='numberOfWomen'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataSort={ true }
          headerAlign='right'
          dataAlign='right'
          width='50'
          >#f</TableHeaderColumn>
        <TableHeaderColumn
          dataField='numberOfMen'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataSort={ true }
          headerAlign='right'
          dataAlign='right'
          width='50'
          >#m</TableHeaderColumn>
        <TableHeaderColumn
          dataField='year'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataSort={ true }
          headerAlign='right'
          dataAlign='right'
          width='60'
          >year</TableHeaderColumn>
        <TableHeaderColumn
          dataField='location'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          >where</TableHeaderColumn>
        <TableHeaderColumn
          dataField='history'
          dataFormat={ minDiversityFormatter }
          headerAlign='right'
          dataAlign='right'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          >min</TableHeaderColumn>
        <TableHeaderColumn
          dataField='history'
          dataFormat={ maxDiversityFormatter }
          tdAttr={ { 'id': `${s.confTableRow}` } }
          >max</TableHeaderColumn>
      </BootstrapTable>
    );
  }

}

export default ConfList;
