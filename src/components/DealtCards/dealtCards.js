import React, { Component } from 'react';
import Card from '../Card/card';
import { connect } from 'react-redux'

class DealtCards extends Component {

    getCards = () => {
        return this.props.dealtCards.map((cardsColumn, columnIndex) => {
            return (
                <div className='card-column'>
                    {cardsColumn.map((card, rowIndex) => {
                        return (
                            <Card card={card} rowIndex={rowIndex} columnIndex={columnIndex} />
                        )
                    })}
                </div>
            )})
    }

    render() {
        return(
            <div className='dealt-cards'>
                {this.getCards()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dealtCards: state.dealtCards
    }
}

export default connect(mapStateToProps)(DealtCards)