import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { createStore, compose } from 'redux';
import {Provider} from 'react-redux';
import {aceCards} from "./actions/deckActions";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers())


function reducer(state={cards: [], currentCardIndex: 0, dealtCards: [], aceCards: [[],[],[],[]] }, action ) {
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
                cards: shuffledDeck,
                aceCards: [[],[],[],[]]
            }
        case 'SELECT_DECK_CARD':
            let deckCards = [...state.cards];
            deckCards[state.currentCardIndex].selected = true
            let selectedDeckCard;

            for(let i = 0; i < deckCards.length; i++) {
                if(deckCards[i].selected) {
                    selectedDeckCard = deckCards[i]
                    console.log(selectedDeckCard)
                }
            }

            return {
                ...state,
                cards: deckCards
            };
        case 'MOVE_KING':
            let deckOfCards = [...state.cards];
            let cardsDealt = [...state.dealtCards];
            let cardDeckIndex;
            let kingDeckCard;
            let kingDealtCard;
            let clickedCardColumn;
            let clickedCardRow;

            for(let i=0 ; i < deckOfCards.length; i++){
                //check all Deck Cards to see if one is selected
                //if it is then create a variable to say its from the deck
                if(deckOfCards[i].selected && deckOfCards[i].rankValue === 13) {
                    kingDeckCard = deckOfCards[i]
                    cardDeckIndex = [i]
                }
            }

            if(!kingDeckCard) {
                for (let i = 0; i < cardsDealt.length; i++) {
                    for (let j = 0; j < cardsDealt[i].length; j++) {
                        if (cardsDealt[i][j].selected && cardsDealt[i][j].rankValue === 13) {
                            kingDealtCard = cardsDealt[i][j];
                            clickedCardColumn = i;
                            clickedCardRow = j;
                        }
                    }
                }
            }

            console.log(cardsDealt[action.columnIndex]);

            if(kingDeckCard) {
                deckOfCards.splice(cardDeckIndex, 1)
                cardsDealt[action.columnIndex].push(kingDeckCard);
                kingDeckCard.selected = false;
            }
            else if(kingDealtCard) {
                if(clickedCardRow < cardsDealt[clickedCardColumn].length - 1) {
                    let moveKingStack = cardsDealt[clickedCardColumn].splice(clickedCardRow, cardsDealt[clickedCardColumn].length);
                    //add it to the new stack
                    cardsDealt[action.columnIndex].push(...moveKingStack);

                } else {
                    //remove card
                    cardsDealt[clickedCardColumn].splice(clickedCardRow, 1);
                    //adding it to new position
                    cardsDealt[action.columnIndex].push(kingDealtCard);

                }
                // cardsDealt[clickedCardColumn].splice(clickedCardRow, 1);
                // //adding it to new position
                // cardsDealt[action.columnIndex].push(kingDealtCard);
                let flipLastCard = {...cardsDealt[clickedCardColumn][cardsDealt[clickedCardColumn].length - 1]}
                flipLastCard.flipped = true
                cardsDealt[clickedCardColumn][cardsDealt[clickedCardColumn].length - 1] = flipLastCard

                kingDealtCard.selected = false
            }


            return {
                ...state,
                cards: deckOfCards,
                dealtCards: cardsDealt
            }
        case 'SELECT_CARD':
            let newDealtCards = [...state.dealtCards];
            let shuffledDeckCards = [...state.cards];

            let selectedCardFromDeck;
            let deckcardIndex;
            let selectedCard;
            let selectedCardColumn;
            let selectedCardRow;

            for(let i=0 ; i < shuffledDeckCards.length; i++){
                //check all Deck Cards to see if one is selected
                //if it is then create a variable to say its from the deck
                if(shuffledDeckCards[i].selected) {
                    selectedCardFromDeck = shuffledDeckCards[i]
                    deckcardIndex = [i]
                }
            }

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

            if(selectedCardFromDeck) {
                //there exist a card that is selected already
                //add logic to see if the move can be made
                //if it can then actually move the card out of the array its in - into the new position
                //if it cant be moved then you can deselect the card that was selected

                if ((selectedCardFromDeck.rankValue + 1 === newCardClicked.rankValue)
                    && (selectedCardFromDeck.color !== newCardClicked.color)) {


                    //removes selected Deck Card
                    if (selectedCardFromDeck) {
                        //newDeckCards.splice
                        shuffledDeckCards.splice(deckcardIndex, 1)
                        newDealtCards[action.columnIndex].push(selectedCardFromDeck);
                        selectedCardFromDeck.selected = false;
                    }
                }

                else {
                    selectedCardFromDeck.selected = false;
                }
            }else if(selectedCard) {

                if((selectedCard.rankValue + 1 === newCardClicked.rankValue )
                    && (selectedCard.color !== newCardClicked.color)) {

                    if(selectedCardRow < newDealtCards[selectedCardColumn].length - 1) {
                        let moveStack = newDealtCards[selectedCardColumn].splice(selectedCardRow, newDealtCards[selectedCardColumn].length - 1);
                        //add it to the new stack
                        newDealtCards[action.columnIndex].push(...moveStack);
                    } else {
                        //remove card
                        newDealtCards[selectedCardColumn].splice(selectedCardRow, 1);
                        //adding it to new position
                        newDealtCards[action.columnIndex].push(selectedCard);

                    }

                    //flips last card behind the pile that was moved
                    let cardToFlip = {...newDealtCards[selectedCardColumn][newDealtCards[selectedCardColumn].length - 1]}
                    cardToFlip.flipped = true
                    newDealtCards[selectedCardColumn][newDealtCards[selectedCardColumn].length - 1] = cardToFlip

                }

                selectedCard.selected = false
            }

            else{
                // user is selecting a card
                newDealtCards[action.columnIndex][action.rowIndex].selected = true
                console.log(newDealtCards[action.columnIndex][action.rowIndex])
            }

            return {
                ...state,
                cards: shuffledDeckCards,
                dealtCards: newDealtCards
            };
        case 'ACE_SECTION':
            let newAceCards = [...state.aceCards];
            let cardsDeck = [...state.cards];
            let tableDealtCards = [...state.dealtCards];

            let selectedCardDeck;
            let indexCardDeck;
            let cardDealtClicked;
            let dealtCardColumn;
            let dealtCardRow

            for(let i=0 ; i < cardsDeck.length; i++){
                //check all Deck Cards to see if one is selected
                //if it is then create a variable to say its from the deck
                if(cardsDeck[i].selected) {
                    selectedCardDeck = cardsDeck[i]
                    indexCardDeck = [i]
                }
            }

            if(!selectedCardDeck) {
                for (let i = 0; i < tableDealtCards.length; i++) {
                    for (let j = 0; j < tableDealtCards[i].length; j++) {
                        if (tableDealtCards[i][j].selected) {
                            cardDealtClicked = tableDealtCards[i][j]
                            dealtCardColumn = i;
                            dealtCardRow = j;
                        }
                    }
                }
            }

            let ace = newAceCards[action.aceIndex]
            console.log(ace)

            if(newAceCards[action.aceIndex].length === 0) {
                //check to see if Ace columns are empty

                if(selectedCardDeck && selectedCardDeck.rankValue === 1) {
                    cardsDeck.splice(indexCardDeck, 1)
                    newAceCards[action.aceIndex].push(selectedCardDeck)
                    selectedCardDeck.selected = false

                }
                else if(cardDealtClicked && cardDealtClicked.rankValue === 1) {
                    tableDealtCards[dealtCardColumn].splice(dealtCardRow, 1)
                    newAceCards[action.aceIndex].push(cardDealtClicked)

                    //flip the card behind the removed one
                    let flipCard = {...tableDealtCards[dealtCardColumn][tableDealtCards[dealtCardColumn].length - 1]}
                    flipCard.flipped = true
                    tableDealtCards[dealtCardColumn][tableDealtCards[dealtCardColumn].length - 1] = flipCard
                    cardDealtClicked.selected = false
                }
            }
            else {
                //To find the top card on the clicked Ace column
                let topAceCard = newAceCards[action.aceIndex].length - 1

                if(selectedCardDeck) {
                    if(selectedCardDeck.rankValue === newAceCards[action.aceIndex][topAceCard].rankValue + 1
                    && (selectedCardDeck.suit === newAceCards[action.aceIndex][topAceCard].suit)) {
                        cardsDeck.splice(indexCardDeck, 1)
                        newAceCards[action.aceIndex].push(selectedCardDeck)
                        selectedCardDeck.selected = false
                    }else {
                        selectedCardDeck.selected = false
                    }
                }
                else if(cardDealtClicked) {
                    if(cardDealtClicked.rankValue === newAceCards[action.aceIndex][topAceCard].rankValue + 1
                    && (cardDealtClicked.suit === newAceCards[action.aceIndex][topAceCard].suit)) {
                        tableDealtCards[dealtCardColumn].splice(dealtCardRow, 1)
                        newAceCards[action.aceIndex].push(cardDealtClicked)

                        //flip the card behind the removed one
                        let flipCard = {...tableDealtCards[dealtCardColumn][tableDealtCards[dealtCardColumn].length - 1]}
                        flipCard.flipped = true
                        tableDealtCards[dealtCardColumn][tableDealtCards[dealtCardColumn].length - 1] = flipCard
                        cardDealtClicked.selected = false
                    } else {
                        cardDealtClicked.selected = false
                    }
                }

            }


            return {
                ...state,
                aceCards: newAceCards,
                cards: cardsDeck,
                dealtCards: tableDealtCards
            }
        case 'RESET_CARDS':
            return {
                ...state,
                dealtCards: [],
                aceCards: [[],[],[],[]]
            }
        default:
            return state
    }
    return state
}


ReactDOM.render(<Provider store={store}>
                 <App />
                </Provider>, document.getElementById('root'));

