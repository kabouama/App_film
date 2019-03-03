import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getAllFilms, getAllFilms2, getAllFilms3 } from '../API/TMDBApi'
import { connect } from 'react-redux' 


class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => { //fonction prend en param idFilm /-> (sythaxe tres bizarre)
        //console.log("display film with id" + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    _loadFilms() {
        //getFilmsFromApiWithSearchedText("Harry").then(data => 
        getAllFilms().then(data =>
            this.setState({ 
                films : data.results,
                isLoading: false
            }))
        getAllFilms2().then(data =>
            this.setState({ 
                films : data.results + this.films,
                isLoading: false
            }))
   /*     getAllFilms3().then(data =>
            this.setState({ 
                films : data.results,
                isLoading: false
            }))
        */    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => {
            this._loadFilms()
        })
    }

    render() {
        return (
            <View>

                <Button title="Rechercher" onPress={() => this._loadFilms()}/>
                
                <FlatList
                    //style={styles.list}
                    data={this.state.films}
                    //data={this.props.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <FilmItem
                            film={item}
                            _displayDetailForFilm = {this._displayDetailForFilm}
                        />
                        
                    }
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const myStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(myStateToProps)(FilmList)