import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { createStore, compose } from 'redux';
import {Provider} from 'react-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers())


function reducer(state={cards: [], currentCardIndex: 0, dealtCards: []}, action) {
    switch(action.type) {
        case 'CREATE_DECK':
            return {
                ...state,
                cards: action.cards
            }
        case 'NEXT_CARD':
            let newCardIndex = state.currentCardIndex + 1
            if(newCardIndex > state.cards.length-1) {
                newCardIndex = 0
            }
            return {
                ...state,
                currentCardIndex: newCardIndex
            }
        case 'DEAL_CARDS':
            let shuffledDeck = [...state.cards]
            let dealtCards = []
            for(let i = 0; i < 7; i++) {
                dealtCards.push([])
                for(let j = 0; j <= i; j++) {
                    dealtCards[i].push(shuffledDeck.shift())
                }
            }
            //flip last card
            for(let i = 0; i < 7; i++) {
                dealtCards[i][dealtCards[i].length-1].flipped = true
            }
            // sets last card on dealtCards array to flipped = true
            shuffledDeck.forEach( card => card.flipped = true );
            return {
                ...state, dealtCards,
                cards: shuffledDeck
            }
        case 'SELECT_CARD':
            let selectedCards = [...state.dealtCards]
            // let cardClicked = selectedCards[action.columnIndex][action.rowIndex];
            let cardToDrag;
            let cardToDrop;

            for(let i = 0; i < selectedCards.length; i++) {
                for(let j = 0; j < selectedCards[i].length; j++) {
                    if(selectedCards[i][j].selected) {
                        cardToDrag = selectedCards[i][j]
                        cardToDrop = selectedCards[action.columnIndex][action.rowIndex]
                        return console.log(cardToDrag, cardToDrop)
                    } else {
                        // cardClicked.selected = true
                        console.log('False')
                        selectedCards[action.columnIndex][action.rowIndex].selected = true
                         cardToDrag = selectedCards[action.columnIndex][action.rowIndex]
                        return console.log(cardToDrag)
                    }
                }
            }


                // if(cardClicked.selected === false) {
                //     cardToDrag = cardClicked
                //     console.log("first statement:")
                //     cardToDrag.selected = true
                //     console.log(cardToDrag)
                // }
                //
                // else {
                //     cardToDrop = cardClicked
                //     console.log("last statement:")
                //     console.log(cardToDrop)
                //
                //     // cardToDrop = selectedCards[action.columnIndex][action.rowIndex]
                //     // console.log("last statement:")
                //     // console.log(selectedCards[action.columnIndex][action.rowIndex])
                // }

            return {
                ...state,
                dealtCards: selectedCards
            }
        case 'RESET_CARDS':
            return {
                ...state,
                dealtCards: []
            }
        default:
            return state
    }
    return state
}


ReactDOM.render(<Provider store={store}>
                 <App />
                </Provider>, document.getElementById('root'));

