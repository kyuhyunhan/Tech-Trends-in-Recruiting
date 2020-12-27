import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

export default class FE_FEEtc extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            data: this.props.data
        }
    }
    bubbleClick = (label) =>{
        console.log("Custom bubble click func")
    }
    legendClick = (label) =>{
        console.log("Customer legend click func")
    }

    render() {
        return (
            <BubbleChart
                graph= {{
                    zoom: .4,
                    offsetX: 0.2,
                    offsetY: 0.01,
                }}
                width={1300}
                height={1000}
                overflow={true}
                padding={0} // optional value, number that set the padding between bubbles
                showLegend={true} // optional value, pass false to disable the legend.
                legendPercentage={40} // number that represent the % of with that legend going to use.
                legendFont={{
                        family: 'Arial',
                        size: 12,
                        color: '#000',
                        weight: 'bold',
                    }}
                valueFont={{
                        family: 'Arial',
                        size: 12,
                        color: '#fff',
                        weight: 'bold',
                    }}
                labelFont={{
                        family: 'Arial',
                        size: 16,
                        color: '#fff',
                        weight: 'bold',
                    }}
                //Custom bubble/legend click functions such as searching using the label, redirecting to other page
                bubbleClickFunc={this.bubbleClick}
                legendClickFun={this.legendClick}
                data={this.state.data}
                />
        );
    }
}