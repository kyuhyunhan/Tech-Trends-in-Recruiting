import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

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
          width={1150}
          height={400}
          data={this.state.data}
          margin={{
            top: 5, right: 30, left: 0, bottom: 5,
          }}
        >
          <XAxis dataKey="name" fontSize={15} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
  }
}
