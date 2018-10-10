import React, { Component } from 'react';
import { connect } from 'react-redux'
import {selectCard} from "../../actions/deckActions";

class Card extends Component {

    render() {
        if(!this.props.card) {
            return null
        }
        //this sets hearts & diamonds to the color red
        let color = (this.props.card.suit ===  '♦︎' || this.props.card.suit ===  '♥︎' ) ? 'red' : 'black';

        return (
            <div onClick={() => this.props.selectCard(this.props.columnIndex, this.props.rowIndex)}
                 className='card' style={{top: (20 * this.props.rowIndex) + 'px'}}>

                {/*ternery operator that checks if card.flipped = true then print card, else show backface*/}

                {this.props.card.flipped ?
                    <div style={{color: color}}>
                        <div className="rank">{this.props.card.rank}</div>
                        <div className="suit">{this.props.card.suit}</div>

                        <div className="card-opposite-value">
                            <div className="rank">{this.props.card.rank}</div>
                            <div className="suit">{this.props.card.suit}</div>
                        </div>

                        <div className="card-badge">
                            <h1>{this.props.card.suit}</h1>
                        </div>
                    </div>
                    : <div className="backFace">
                        <img src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-tally-ho-circle-back-1_grande.png?v=1530155016' />
                    </div>}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        state: state.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCard: (columnIndex, rowIndex) => {
            dispatch(selectCard(columnIndex, rowIndex))
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card)