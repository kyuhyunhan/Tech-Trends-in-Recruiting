import React from "react";
import { Treemap, Tooltip } from 'recharts';


const COLORS = ['#FFBB28', '#FF8042', '#0088FE',  '#ff3029', '#8884d8', '#c7c7c7'];

class CustomizedContent extends React.Component {
  render() {
    const {
      root, depth, x, y, width, height, index, payload, colors, rank, name,
    } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'rgba(255,255,255,0)',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />

        {
          depth === 1 ? (
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#fff"
              fontSize={20}
            >
              {(name=='JS')?'JavaScript':name}
            </text>
          ) : null
        }
      </g>
    );
  }
}

const CustomTooltip = ({active, payload, label}) => {
  const tooltip = {
    backgroundColor: '#e8e8e8',
		opacity: '0.9',
		borderRadius: '5px',			
		padding: '15px'
  }
  console.log(payload);
  if(active) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={tooltip}>{`${payload[0].payload.name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

export default class BE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        }
    }
    render() {
        return (
            <Treemap
                width={500}
                height={300}
                data={this.state.data}
                dataKey="size"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedContent colors={COLORS} />}
                style={{marginTop:50}}
            >
                <Tooltip content={<CustomTooltip/>}/>
            </Treemap>
        );
      }
}