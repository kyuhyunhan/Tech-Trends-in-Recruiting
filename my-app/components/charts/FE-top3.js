import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class FE_Top3 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }
    render() {
        return (
          <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={this.state.data}
              cx={120}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              >
              {
                this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
              {/* <Pie
                data={this.state.data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {
                  this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie> */}
          </PieChart>
        );
    }
}