import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F','#FFBB28', '#FF8042', '#b800ae',  '#ff3029', '#00dbc9', '#ffa1fa', '#bcc1f7', '#fffd8a', '#ffe48a'];

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
    backgroundColor: '#e8e8e8',
		opacity: '0.9',
		borderRadius: '5px',			
		padding: '15px'
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
      <PieChart width={530} height={400}>
        <Pie
          data={this.state.data}
          cx={160}
          cy={180}
          labelLine={false}
          outerRadius={130}
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
          wrapperStyle={{ marginTop: "60px"}} 
          iconSize={15} 
          layout='vertical' 
          verticalAlign="top" 
          align='right'
          // onMouseEnter={this.handleMouseEnter}
          // onMouseLeave={this.handleMouseLeave}
        />
      </PieChart>
    );
  }
}
