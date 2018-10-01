import React, { Component } from 'react'
import Card from '../Card/card'

class AceArea extends Component {
    render() {
        return (
            <div className="ace-area">
                    <Card  card={this.props.card}/>
                    <Card  card={this.props.card}/>
                    <Card  card={this.props.card}/>
                    <Card  card={this.props.card}/>
            </div>
        )
    }
}

export default AceArea