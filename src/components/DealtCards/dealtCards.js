import React, { Component } from 'react';
import Card from '../Card/card';
import { connect } from 'react-redux'
import {moveKing} from "../../actions/deckActions";


class DealtCards extends Component {

    getCards = () => {
        return this.props.dealtCards.map((cardsColumn, columnIndex) => {
            return (
                <div className='card-column'>
                {/*condition that checks if a column is empty then add box onClick , else, map and display cards*/}
                    {(cardsColumn.length === 0) ?
                        <div className='empty-column'
                             onClick={() => this.props.moveKing(columnIndex)}>

                        </div>
                        :
                    cardsColumn.map((card, rowIndex) => {
                        return (<Card card={card} rowIndex={rowIndex} columnIndex={columnIndex}/>)
                        })
                    }
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
        cards: state.cards,
        dealtCards: state.dealtCards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveKing: (columnIndex) =>
            dispatch(moveKing(columnIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DealtCards)