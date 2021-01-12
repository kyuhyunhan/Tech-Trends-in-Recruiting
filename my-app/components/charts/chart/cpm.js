import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';

const COLORS = ['#28c4eb', '#0088FE', '#212121'];

export default class CPM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }
    render() {
        return (
          <PieChart width={520} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={this.state.data}
              cx={250}
              cy={230}
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
              >
              {
                this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Legend
              wrapperStyle={{ marginBottom: "40px", marginRight: "20px"}}
            />
          </PieChart>
        );
    }
}