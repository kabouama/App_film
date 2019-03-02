import React from 'react';
//import Search from './Components/Search.js'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux' //Provider distribue notre store a toute notre application
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      //Grace au provideur le store est dispo dans toute l'application
      <Provider store={Store}>
        <Navigation/>
      </Provider>
      //<Search/>
     // <FilmItem/>
    );
  }
}