import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50
};
const itemStyle = {
    width: 250,
    height: 50,
    marginBottom: 10,
    border: '1px solid #d9d9d9'
};
const itemInternalStyle = {
    display:'flex', 
    justifyContent:'space-between'
}
export default class FE_FEEtc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    render() {
        return (
            <div style={flexStyle}>
                <ListGroup>
                    {
                        this.state.data.slice(0,5).map((entry, index) => {
                            return <ListGroup.Item style={itemStyle} key={index+1}>
                                        <div style={itemInternalStyle}>
                                            <span>
                                                {index+1}.&nbsp;{entry.label}
                                            </span>
                                            <span>
                                                {entry.value}
                                            </span>
                                        </div>
                                    </ListGroup.Item>
                        })
                    }
                </ListGroup>
                <ListGroup>
                    {
                        this.state.data.slice(5,10).map((entry, index) => {
                            return <ListGroup.Item style={itemStyle} key={index+1}>
                                        <div style={itemInternalStyle}>
                                            <span>
                                                {index+6}.&nbsp;{entry.label}
                                            </span>
                                            <span>
                                                {entry.value}
                                            </span>
                                        </div>
                                    </ListGroup.Item>
                        })
                    }
                </ListGroup>
            </div>
        )
    }
}
