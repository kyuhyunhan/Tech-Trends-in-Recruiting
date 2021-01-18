import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#3da3fc', '#00C49F','#f2b530', '#FF8042', '#8884d8',  '#f7635e', '#00dbc9', '#ffa1fa', '#bcc1f7', '#fffd8a', '#ffe48a'];

const RADIAN = Math.PI / 180;

// show percentage, <Pie>의 "label" property에 적용됨
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({active, payload}) => {
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
        <p className="label" style={tooltip}>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

export default class Database extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          data : this.props.data,
          activeIndex:null
      }
  }

  handleMouseEnter = (data, index) => {
    this.setState({
      activeIndex : index
    });
  }
  
  handleMouseLeave = (o) => {
    this.setState({
      activeIndex :null
    });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <PieChart width={370} height={300}>
        <Pie
          data={this.state.data}
          cx={100}
          cy={130}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {
            (activeIndex==null)?
              this.state.data.map((entry, index) =>{
                return <Cell key={`cell-${index}`} fillOpacity={1} fill={COLORS[index % COLORS.length]} />
              })
              :
              this.state.data.map((entry, index) =>{
                return <Cell key={`cell-${index}`} fillOpacity={index===activeIndex?1:0.3} fill={COLORS[index % COLORS.length]} />
            })
          }
        </Pie>
        <Tooltip 
          content={<CustomTooltip/>}
        />
        <Legend 
          iconSize={10} 
          layout='vertical' 
          verticalAlign="top" 
          align='right'
          wrapperStyle={{fontSize:'.8rem', marginTop:30}}
          // onMouseEnter={this.handleMouseEnter}
          // onMouseLeave={this.handleMouseLeave}
        />
      </PieChart>
    );
  }
}
