import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

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
        <p className="label" style={tooltip}>{`${(label=='Obj-C'?'Objective-C':(label=='JS')?'JavaScript':(label=='TS')?'TypeScript':label)} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

 
export default class Language extends React.Component {
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
            top: 30, right: 40, left: 0, bottom: 20,
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
