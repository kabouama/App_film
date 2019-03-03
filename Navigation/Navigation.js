// Navigation/Navigation.js

import React from 'react'
import  Search from '../Components/Search'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { StyleSheet, Image } from 'react-native'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import { weekdaysShort } from 'moment';

const SearchStackNavigator = createStackNavigator({
    Search: {// Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut.
        // C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {/* Encore une fois j'ai mis le même nom que celui du component mais
    libre à vous de choisir un nom différent */
        screen: FilmDetail,
        navigationOptions: {
            title: 'test'
        }
    }
})

const FavoritesStackNavigatior = createStackNavigator({
    Favorites: { // On cree ici la vue 'Favorites'
        screen: Favorites,
        navigationOptions:{
            title: 'Favoriss'
        }
    },
    FilmDetail: { // On cree ici la vue 'FilmDetail'
        screen: FilmDetail,
        navigationOptions: {
            title: 'wesh',
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
//        screen: Search
        screen: SearchStackNavigator, //on appel notre vue search avc la navifation dans les detail
        navigationOptions: {
            tabBarIcon: () => {
// On définit le rendu de nos icônes par les images récemment ajoutés au projet
                return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.icon}/>
            }
        }
    },
    Favorites: {
        screen: FavoritesStackNavigatior,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}/>
            }
        }
    }    
},
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)
//export default createAppContainer(SearchStackNavigator)
//On change d'export car mtn on utilise Tab Navigator
/*createAppContainer -> Elle permet de formater votre navigation pour 
la rendre utilisable dans l’application.*/