// Navigation/Navigation.js

import  Search from '../Components/Search'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const SearchStackNavigator = createStackNavigator({
    Search: {// Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut.
        // C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    }
})

export default createAppContainer(SearchStackNavigator)
/*createAppContainer -> Elle permet de formater votre navigation pour 
la rendre utilisable dans l’application.*/