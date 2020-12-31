import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip} from 'recharts';

const CustomTooltip = ({active, payload, label}) => {
  const tooltip = {
    backgroundColor: '#e8e8e8',
		opacity: '0.8',
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


export default class Language extends PureComponent {
    constructor(props){
        super(props);
        this.state =  {
            data : this.props.data
        }
      }

    render() {
      return (
        <BarChart
          width={1100}
          height={380}
          data={this.state.data}
          margin={{
            top: 50, right: 30, left: 0, bottom: 5,
          }}
        >
          <XAxis dataKey="name" fontSize={15} />
          <YAxis />
          <Tooltip content={<CustomTooltip/>}/>
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
  }
}
