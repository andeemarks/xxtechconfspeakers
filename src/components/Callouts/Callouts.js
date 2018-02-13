import s from './Callouts.css';
import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import CalloutsHelpers from './CalloutsHelper';

function diversityAccumulator(accumulator, conf) { 
  return accumulator + conf.diversityPercentage; 
}

class Callouts extends React.Component {

  constructor(props) {
    super(props);

    this.helper = new CalloutsHelpers();
    this.currentYearConfs = props.confs.filter(this.helper.confFromCurrentYear);
    this.currentYear = (new Date()).getFullYear();

    this.state = {
      confs: props.confs,
      bestPerformer: props.confs.sort(this.helper.diversitySorter)[0],
      lastAdded: props.confs.sort(this.helper.dateAddedSorter)[0],
      numberOfConfs: props.confs.length,
      numberOfConfsAtParityOrGreater: props.confs.filter(this.helper.diversityAtParityOrGreater).length,
      averageDiversity: props.confs.reduce(diversityAccumulator, 0) / props.confs.length,
      averageDiversityCurrentYear: this.currentYearConfs.reduce(diversityAccumulator, 0) / this.currentYearConfs.length
    };
  }

  render() {
    return (
      <div className={s.container}>
        <div className="row">
          <div className="col-sm-3">
            <div className={s.title}>Conferences tracked</div>
            <div className={s.pop}>{this.state.numberOfConfs}</div>
          </div>
          <div className="col-sm-3">
            <div className={s.title}>Best performer</div>
            <div className={s.body}><strong>{this.state.bestPerformer.name} ({this.state.bestPerformer.year})</strong><br/>{numeral(this.state.bestPerformer.diversityPercentage).format('0%')}</div>
          </div>
          <div className="col-sm-3">
            <div className={s.title}>Biggest recent improver</div>
            <div className={s.body}><strong>1st Conf</strong><br/>{"+36%"}<br/>{"2016 -> 2017"}</div>
          </div>
          <div className="col-sm-3" id={s.nbrConfAtParity}>
            <div className={s.title}>{"#confs >= 50% diversity"}</div>
            <div className={s.pop}>{this.state.numberOfConfsAtParityOrGreater}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className={s.title}>Average f:m%</div>
            <div className={s.pop}>{numeral(this.state.averageDiversity).format('0%')}</div>
          </div>
          <div className="col-sm-3">
            <div className={s.title}>Average f:m% ({this.currentYear})</div>
            <div className={s.pop}>{numeral(this.state.averageDiversityCurrentYear).format('0%')}</div>
          </div>
          <div className="col-sm-3">
            <div className={s.title}>Last added</div>
            <div className={s.body}><strong>{this.state.lastAdded.name} ({this.state.lastAdded.year})</strong><br />{numeral(this.state.lastAdded.diversityPercentage).format('0%')}</div>
          </div>
        </div>
      </div>
    );
  }

}


Callouts.propTypes = {
  confs: PropTypes.array
};

export default Callouts;
