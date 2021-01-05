import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class FE_FEEtc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    render() {
        return (
            <ListGroup>
                <ListGroup.Item action>test</ListGroup.Item>
                <ListGroup.Item action>test</ListGroup.Item>
                <ListGroup.Item action>test</ListGroup.Item>
                <ListGroup.Item action>test</ListGroup.Item>
                <ListGroup.Item action>test</ListGroup.Item>
            </ListGroup>
        )
    }
}
