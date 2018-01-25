import React from 'react';
import PropTypes from 'prop-types';
import s from './ConfList.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import numeral from 'numeral';

function whoFormatter(cell, row) {
  return `${cell} (${row.year}) <a href='${row.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`;
}

function genderDiversityFormatter(cell) {
  return numeral(cell).format('0%')
}

function genderDiversityRowStyle(row) {
  var percentage = row.diversityPercentage;
  if (percentage < .10) {
    return `${s.percentageCohortFTrans}`;
  } else if (percentage < .20) {
    return `${s.percentageCohortETrans}`;
  } else if (percentage < .30) {
    return `${s.percentageCohortDTrans}`;
  } else if (percentage < .40) {
    return `${s.percentageCohortCTrans}`;
  } else if (percentage < .50) {
    return `${s.percentageCohortBTrans}`;
  } else {
    return `${s.percentageCohortATrans}`;
  }
}

function genderDiversityCellStyle(percentage) {
  if (percentage < .10) {
    return `${s.percentageCohortF}`;
  } else if (percentage < .20) {
    return `${s.percentageCohortE}`;
  } else if (percentage < .30) {
    return `${s.percentageCohortD}`;
  } else if (percentage < .40) {
    return `${s.percentageCohortC}`;
  } else if (percentage < .50) {
    return `${s.percentageCohortB}`;
  } else {
    return `${s.percentageCohortA}`;
  }

}

function rowIndexFormatter(cell, row, formatExtraData, rowIdx) {
  return numeral(rowIdx + 1).format('0')
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

  render() {
    return (
      <BootstrapTable
        data={this.state.confs}
        options={this.options}
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
          width='40'></TableHeaderColumn>
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
      </BootstrapTable>
    );
  }

}

ConfList.propTypes = {
  confs: PropTypes.array
};

export default ConfList;
