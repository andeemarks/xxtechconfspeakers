import s from './Callouts.css';
import React, { PropTypes } from 'react';
import numbro from 'numbro';

function diversityAtParityOrGreater(conf) {
  return conf.diversityPercentage >= 50;
}

function confFromCurrentYear(conf) {
  return conf.year == (new Date()).getFullYear();
}

function diversityAccumulator(accumulator, conf) { 
  return accumulator + conf.diversityPercentage; 
}

function diversitySorter(confA, confB) {
  if (confA.diversityPercentage < confB.diversityPercentage) {
    return 1;
  }
  if (confA.diversityPercentage > confB.diversityPercentage) {
    return -1;
  }

  return 0;
}

class Callouts extends React.Component {


  constructor(props) {
    super(props);

    this.currentYearConfs = props.confs.filter(confFromCurrentYear);

    this.state = {
      confs: props.confs,
      bestPerformer: props.confs.sort(diversitySorter)[0],
      numberOfConfs: props.confs.length,
      numberOfConfsAtParityOrGreater: props.confs.filter(diversityAtParityOrGreater).length,
      averageDiversity: props.confs.reduce(diversityAccumulator, 0) / props.confs.length,
      averageDiversityCurrentYear: this.currentYearConfs.reduce(diversityAccumulator, 0) / this.currentYearConfs.length
    };
  }

  render() {
    return (
      <div className={s.container}>
        <div className="row">
          <div className="col-sm-2">
            <div className={s.title}>Conferences<br/>tracked</div>
            <div className={s.pop}>{this.state.numberOfConfs}</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Best<br/>performer</div>
            <div className={s.body}><strong>{this.state.bestPerformer.name} ({this.state.bestPerformer.year})</strong><br/>{numbro(this.state.bestPerformer.diversityPercentage).format('0')}%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Biggest recent improver</div>
            <div className={s.body}><strong>1st Conf</strong><br/>+36%<br/>2016 -> 2017</div>
          </div>
          <div className="col-sm-2" id={s.nbrConfAtParity}>
            <div className={s.title}>#confs >= 50%<br/>diversity</div>
            <div className={s.pop}>{this.state.numberOfConfsAtParityOrGreater}</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Average<br/>f:m%</div>
            <div className={s.pop}>{numbro(this.state.averageDiversity).format('0')}%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Average<br/>f:m% (2017)</div>
            <div className={s.pop}>{numbro(this.state.averageDiversityCurrentYear).format('0')}%</div>
          </div>
        </div>
      </div>
    );
  }

}

export default Callouts;
