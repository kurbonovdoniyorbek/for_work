import { combineReducers } from 'redux'
import cart from './cart'


const rootReducer = combineReducers({
    water: () => "Redux water",
    cart
})

export default rootReducer