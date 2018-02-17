import React from "react"
import s from "./Charts.css"
import ReactSvgPieChart from "react-svg-piechart"
import ChartsHelper from './ChartsHelper';

const data = [
  { title: "Diversity >= 50%", value: 9, color: "white" },
  { title: "Diversity >= 40%", value: 5, color: "green" },
  { title: "Diversity >= 30%", value: 13, color: "blue" },
  { title: "Diversity >= 20%", value: 16, color: "orange" },
  { title: "Diversity >= 10%", value: 16, color: "fuchsia" },
  { title: "Diversity < 10%", value: 11, color: "red" },
]

class Charts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      confs: props.confs
    }
  }

  render() {
    return (
      <div className={s.container}>
        <div className="row">
          <div className="col-sm-2">    
        <ReactSvgPieChart
          data={data}
          viewBoxSize={100}
          strokeColor="black"
          // If you need expand on hover (or touch) effect
          expandOnHover
          // If you need custom behavior when sector is hovered (or touched)
          onSectorHover={(d, i, e) => {
            if (d) {
              console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
            } else {
              console.log("Mouse leave - Index:", i, "Event:", e)
            }
          }}
          ></ReactSvgPieChart>
            <span class="label label-default"># Confs by Diversity Group</span>  
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
