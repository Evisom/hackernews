import { createStore } from 'redux'

let initialState = {

}

const store = createStore((state = initialState, action) => {
    switch(action.type) {
        case 'SAMPLE': {
            return {state}
        }
        default: return state;
    }
})

export const sample = () => ({
    type: 'SAMPLE'
})

window.store = store;
export default store;