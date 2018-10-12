import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { createStore, compose } from 'redux';
import {Provider} from 'react-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers())


function reducer(state={cards: [], currentCardIndex: 0, dealtCards: [], aceCards: [ [],[],[],[] ]}, action ) {
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
            let newDeckCards = [...state.cards]
            for(let i = 0; i < newDeckCards.length; i++) {
                if(newDeckCards[i].selected) {
                    newDeckCards[i].selected = false
                }
            }

            return {
                ...state,
                cards: newDeckCards,
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
        case 'SELECT_DECK_CARD':
            let deckCards = [...state.cards];
            deckCards[state.currentCardIndex].selected = true
            // let selectedDeckCard;
            //
            // for(let i = 0; i < deckCards.length; i++) {
            //     if(deckCards[i].selected) {
            //         selectedDeckCard = deckCards[i]
            //         console.log(selectedDeckCard)
            //     }
            // }

            return {
                ...state,
                cards: deckCards
            };
        case 'SELECT_CARD':
            let newDealtCards = [...state.dealtCards];
            let shuffledDeckCard = [...state.cards];
            let selectedCard;
            let selectedCardFromDeck;
            let selectedCardColumn;
            let selectedCardRow;

            // for(let i=0 ; i < newCards.length; i++){
            //     //check all cards to see if one is selected
            //     //if it is then create a variable to say its from the deck
            // }

            if(!selectedCardFromDeck) {
                for (let i = 0; i < newDealtCards.length; i++) {
                    for (let j = 0; j < newDealtCards[i].length; j++) {
                        if (newDealtCards[i][j].selected) {
                            selectedCard = newDealtCards[i][j]
                            selectedCardColumn = i;
                            selectedCardRow = j;
                        }
                    }
                }
            }

            let newCardClicked = newDealtCards[action.columnIndex][action.rowIndex];

            if(selectedCard) {
                //there exist a card that is selected already
                //add logic to see if the move can be made
                //if it can then actually move the card out of the array its in - into the new position
                //if it cant be moved then you can deselect the card that was selected

                if(
                    (selectedCard.rankValue + 1 === newCardClicked.rankValue)
                    && (selectedCard.color !== newCardClicked.color)
                ) {
                    //removing selected card
                    if(selectedCardFromDeck){
                        //newDeckCards.splice
                    }else {
                        newDealtCards[selectedCardColumn].splice(selectedCardRow, 1);
                    }
                    //adding it to new position
                    newDealtCards[action.columnIndex].push(selectedCard);

                    //once we move the card we want to un-select it as well
                    selectedCard.selected = false;
                    let cardToFlip = {...newDealtCards[selectedCardColumn][newDealtCards[selectedCardColumn].length - 1]}
                    cardToFlip.flipped = true
                    newDealtCards[selectedCardColumn][newDealtCards[selectedCardColumn].length - 1] = cardToFlip
                }
                else {
                    selectedCard.selected = false;
                }

            }
            // else if(newCardClicked.flipped === false) {
            //     newCardClicked.flipped = true
            //     console.log(newCardClicked.flipped)
            // }
            else{
                // user is selecting a card
                newDealtCards[action.columnIndex][action.rowIndex].selected = true
                console.log(newDealtCards[action.columnIndex][action.rowIndex])
            }

            return {
                ...state,
                dealtCards: newDealtCards
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

