import React, { Component } from 'react';
import Card from '../Card/card'
import './App.css';
import { connect } from 'react-redux';
import {createDeck, getNextCard, dealCards, resetCards, selectCard} from '../../actions/deckActions'
import DealtCards from "../DealtCards/dealtCards";
import AceArea from "../AceArea/aceArea";


class App extends Component {

    constructor(props){
        super(props);
        this.createDeck()
    }

    createDeck = () => {
        let suits = ['♠︎','♣︎','♥︎','♦︎'];
        let ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
        let deckOfCards = []

        suits.forEach(suit => {
            ranks.forEach(rank => {
                deckOfCards.push({ rank , suit, selected: false, flipped: false })
            })
        })


        let shuffledDeck = []

        for( let i = 51 ; i >= 0  ; i-- ){
            let randomIndex = Math.floor(Math.random() * i);
            shuffledDeck.push(deckOfCards[randomIndex]);
            deckOfCards.splice( randomIndex, 1);
        }

        return this.props.createDeck(shuffledDeck)

    }

    audio = () => {
        let dealSound = new Audio("https://d1qmdf3vop2l07.cloudfront.net/solitaire.cloudvent.net/compressed/5e704c54d908001d43592c91604f89fe.mp3");
        dealSound.play()
    }

    dealCards = () => {
        this.createDeck()
        this.props.dealCards()
        this.audio()
    }

    resetCards = () => {
        this.createDeck()
        this.props.resetCards()
    }


    render() {

        return (
            <div className="app">
                <div className="board">
                    <button onClick={this.resetCards}>RESTART</button>
                    <button onClick={this.dealCards}>DEAL</button>
                    <div className="top-section">
                        <div className="left-side">
                            <div className="deck-face" onClick={this.props.getNextCard}>
                                <img src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-tally-ho-circle-back-1_grande.png?v=1530155016' />
                            </div>
                            <div className="shown-card">
                                <Card onClick={this.props.selectCard}
                                      card={this.props.cards[this.props.currentCardIndex]}/>
                            </div>
                        </div>

                        <AceArea card={this.props.cards} />
                    </div>

                    <div className="bottom-section">
                        <DealtCards />
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cards: state.cards,
        currentCardIndex: state.currentCardIndex,
        dealtCardsArr: state.dealtCardsArr,
        resetCards: state.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createDeck: (cardsDeck) => dispatch(createDeck(cardsDeck)),
        getNextCard: () => dispatch(getNextCard()),
        dealCards: () => dispatch(dealCards()),
        selectCard: () => dispatch(selectCard()),
        resetCards: () => dispatch(resetCards())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
