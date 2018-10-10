export const createDeck = (cards) => {
    return {
        type: 'CREATE_DECK',
        cards
    }
}

export const getNextCard = () => {
    return {
        type: 'NEXT_CARD'
    }
}

export const dealCards = () => {
    return {
        type: 'DEAL_CARDS'
    }
}

export const selectDeckCard = () => {
    return {
        type: 'SELECT_DECK_CARD'

    }
}

export const selectCard = (columnIndex, rowIndex) => {
    return {
        type: 'SELECT_CARD',
        columnIndex,
        rowIndex
    }
}

export const resetCards = () => {
    return {
        type: 'RESET_CARDS'
    }
}

