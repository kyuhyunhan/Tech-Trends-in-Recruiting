import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#28c4eb', '#00C49F', '#f7635e'];

export default class FE_Top3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    } 
    render() {
        return (
          <PieChart width={390} height={300} onMouseEnter={this.onPieEnter}>
            <Pie
              data={this.state.data}
              cx={180}
              cy={150}
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={100}
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
              wrapperStyle={{ marginBottom: "60px", marginRight: "20px", fontSize: '.8rem'}}
            />
          </PieChart>
        );
    }
}