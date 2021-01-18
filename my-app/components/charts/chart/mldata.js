import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CustomTooltip = ({active, payload, label}) => {
  const tooltip = {
    backgroundColor: 'white',
    color: '#388087',
    opacity: '0.9',
    border: '1px solid #c2edce',
		borderRadius: '5px',			
		padding: '10px'
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


export default class ML_Data extends React.Component {
    constructor(props){
        super(props);
        this.state =  {
            data : this.props.data
        }
    }

    render() {
      return (
        <BarChart
          width={375}
          height={285}
          data={this.state.data}
          barSize={30}
          margin={{
            top: 30, right:40, left: 0, bottom: 20,
          }}
        >
           <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="name" fontSize='.8rem' />
          <YAxis />
          <Tooltip content={<CustomTooltip/>}/>
          <Bar dataKey="value" fill="#6fb3b8" animationBegin={400} animationDuration={1000} animationEasing="linear" />
        </BarChart>
    );
  }
}
