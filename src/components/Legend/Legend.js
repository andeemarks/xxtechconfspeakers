import s from './Legend.css';
import React, { Component} from 'react';

export default class Legend extends Component {
  render() {
    return (
      <div>
        <div><strong>Legend</strong></div>
        <div>
          <div className="col-sm-2">
            <div className={s.percentageCohortFTrans}>0% &ge; diversity &lt; 10%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.percentageCohortETrans}>10% &ge; diversity &lt; 20%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.percentageCohortDTrans}>20% &ge; diversity &lt; 30%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.percentageCohortCTrans}>30% &ge; diversity &lt; 40%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.percentageCohortBTrans}>40% &ge; diversity &lt; 50%</div>
          </div>
          <div className="col-sm-2">
            <div className={s.percentageCohortATrans}>&ge; 50% diversity &le; 100%</div>
          </div>
        </div>
      </div>
    );
  }

}
