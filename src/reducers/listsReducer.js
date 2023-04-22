import {CONSTANTS} from "../actions";

let listID = 2;
let cardID = 6;

const initialState = [
    {
        title: 'Last Episode',
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: 'First Card'
            },
            {
                id: `card-${1}`,
                text: 'Second Card'
            }
        ]
    },
    {
        title: 'This Episode',
        id: `list-${1}`,
        cards: [
            {
                id: `card-${3}`,
                text: 'Third Card'
            },
            {
                id: `card-${4}`,
                text: 'Fourth Card'
            },
            {
                id: `card-${5}`,
                text: 'Fifth Card'
            }
        ]
    }
]




const listsReducer = (state = initialState, action) => {

    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                id: `list-${listID}`,
                cards: []
            }
            listID += 1;
            return [...state, newList]
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                id: `card-${cardID}`,
                text: action.payload.text
            }
            cardID += 1;

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            })
            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newDragState = [...state];

            if(type === 'list') {
                const list = newDragState.splice(droppableIndexStart, 1);
                newDragState.splice(droppableIndexEnd, 0, ...list);
                return newDragState;
            }
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            if(droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.find(list => droppableIdEnd === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }
                return newDragState;
        default:
            return state;
    }
}

export default listsReducer;