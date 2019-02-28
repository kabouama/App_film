
import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'

export default createStore(toggleFavorite) // on initialise notre store en lui passant notre reducer

