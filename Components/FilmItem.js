// Components/FilmItem.js
//           <Text style={styles.title_text}>Titre du film</Text>

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class FilmItem extends React.Component {
  render() {
    return (
        
        <View style={styles.main_container}>
            <Image
                style={styles.image}
                source={{uri: "image"}}
            />
            <View style={styles.content_container}>
                <View style={styles.header_container}>
                    <Text style={styles.title_text}>Titre du film</Text>
                    <Text style={styles.title_text}>Vote</Text>

                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row', //row -> alignement horizontal || column par default || on change le flex du component parent pour aligner ses fils
    backgroundColor: 'red',
    // alignItems: center,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5, //marge de tout les cotes : top, right, left, bot
    //marginRight: 10,
    backgroundColor: 'yellow',
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  title_text: {
    flex: 2,
    backgroundColor: 'yellow',
  }
  /*imag: {
      height: 50,
      backgroundColor: 'blue',
  }*/
})

export default FilmItem