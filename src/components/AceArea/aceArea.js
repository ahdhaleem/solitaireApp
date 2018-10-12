import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from '../Card/card'

class AceArea extends Component {
    render() {

        let firstCard = this.props.aceCards[0].length && this.props.aceCards[0][this.props.aceCards[0].length -1] : {}
        let secondCard= this.props.aceCards[1].length ? this.props.aceCards[1][this.props.aceCards[1].length -1] : {}
        let thirdCard= this.props.aceCards[2].length ? this.props.aceCards[2][this.props.aceCards[2].length -1] : {}
        let fourthCard= this.props.aceCards[3].length ? this.props.aceCards[3][this.props.aceCards[3].length -1]: {}

        return (
            <div className="ace-area">
                <Card isAceCard={true} card={firstCard}/>
                <Card  card={secondCard}/>
                <Card  card={thirdCard}/>
                <Card  card={fourthCard}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        aceCards: state.aceCards
    }
}

export default connect(mapStateToProps)(AceArea);