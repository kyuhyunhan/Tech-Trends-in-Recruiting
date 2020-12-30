import { PureComponent } from "react";
import { Treemap, Tooltip } from 'recharts';


const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

class CustomizedContent extends PureComponent {
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
              fontSize={14}
            >
              {name}
            </text>
          ) : null
        }
        {
          depth === 1 ? (
            <text
              x={x + 4}
              y={y + 18}
              fill="#fff"
              fontSize={16}
              fillOpacity={0.9}
            >
              {index + 1}
            </text>
          ) : null
        }
      </g>
    );
  }
}


export default class BE extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        }
    }
    render() {
        return (
            <Treemap
                width={900}
                height={250}
                data={this.state.data}
                dataKey="size"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedContent colors={COLORS} />}
            >
                <Tooltip />
            </Treemap>
        );
      }
}