import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const CustomTooltip = ({active, payload, label}) => {
  const tooltip = {
    backgroundColor: '#e8e8e8',
		opacity: '0.9',
		borderRadius: '5px',			
		padding: '15px'
  }
  if(active) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={tooltip}>{`${(label=='T.F')?'TensorFlow':label} : ${payload[0].value}`}</p>
      </div> 
    );
  }
  return null;
}


export default class ML_Data extends PureComponent {
    constructor(props){
        super(props);
        this.state =  {
            data : this.props.data
        }
    }

    render() {
      return (
        <BarChart
          width={500}
          height={380}
          data={this.state.data}
          margin={{
            top: 50, right:40, left: 0, bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip/>}/>
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
  }
}