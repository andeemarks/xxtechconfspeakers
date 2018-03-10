import React from 'react';
import PropTypes from 'prop-types';
import s from './ConfList.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ConfListHelper from './ConfListHelper';

class ConfList extends React.Component {

    genderDiversityRowStyle(row) {
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

  genderDiversityCellStyle(percentage) {
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

  constructor(props) {
    super(props);

    this.helper = new ConfListHelper();

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
        trClassName={ this.genderDiversityRowStyle }
        tableStyle={ { border: "none" }} >
        <TableHeaderColumn
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataFormat={ this.helper.rowIndexFormatter }
          dataAlign='center'
          dataSort={ false }
          headerAlign='center'
          width='40'></TableHeaderColumn>
        <TableHeaderColumn
          isKey
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataField='diversityPercentage'
          columnClassName={ this.genderDiversityCellStyle }
          dataFormat={ this.helper.genderDiversityFormatter }
          dataAlign='center'
          dataSort={ false }
          headerAlign='center'
          width='50'>f:m</TableHeaderColumn>
        <TableHeaderColumn
          dataField='name'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataFormat={ this.helper.whoFormatter }
          dataSort={ false }
          width='220'
          >who</TableHeaderColumn>
        <TableHeaderColumn
          dataField='numberOfWomen'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataSort={ false }
          headerAlign='right'
          dataAlign='right'
          width='50'
          >#f</TableHeaderColumn>
        <TableHeaderColumn
          dataField='numberOfMen'
          tdAttr={ { 'id': `${s.confTableRow}` } }
          dataSort={ false }
          headerAlign='right'
          dataAlign='right'
          width='50'
          >#m</TableHeaderColumn>
        <TableHeaderColumn
          dataField='location'
          dataSort={ false }
          tdAttr={ { 'id': `${s.confTableRow}` } }
          >where</TableHeaderColumn>
        <TableHeaderColumn
          dataField='dateAdded'
          dataFormat={ this.helper.dateAddedFormatter }
          dataSort={ false }
          tdAttr={ { 'id': `${s.confTableRow}` } }
          >added</TableHeaderColumn>
      </BootstrapTable>
    );
  }

}

ConfList.propTypes = {
  confs: PropTypes.array
};

export default ConfList;
