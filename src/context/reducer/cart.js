import { ADD_TO_CART, DEC_FROM_CART, REMOVE_FROM_CART } from '../action/actionType'

const cart = (state = [], action) => {
    const index = state?.findIndex((item) => item?.id === action?.payload?.id)
    switch (action.type) {
        case ADD_TO_CART:
            if (index < 0) {
                return state = [...state, { ...action.payload, quantity: 1 }]
            }
            else {
                return state?.map((item, inx) => inx === index ? { ...item, quantity: item.quantity + 1 } : item)
            }
        case DEC_FROM_CART:
            return state?.map((item, inx) => inx === index ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity } : item)
        case REMOVE_FROM_CART:
            return state = state.filter((i) => i.id !== action.payload.id)
        default:
            return state
    }
}

export default cart