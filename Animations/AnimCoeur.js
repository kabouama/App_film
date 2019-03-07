import React from 'react'
import { Animated } from 'react-native'

class AnimCoeur extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            viewSize: new Animated.Value(this._getSize())//(Dimensions.get('window'). width)
        }
    }

    _getSize() {
        if (this.props.elargir) {
            return 80
        }
        return 40
    }

    componentDidUpdate() { /* La méthode componentDidUpdate est exécuté chaque fois que le
         component est mise à jour, c'est l'endroit parfait pour lancer / relancer notre animation.*/
        Animated.spring( //effet d'elasticité
            this.state.viewSize,
            {
                toValue: this._getSize(),
                //speed: 2,
                //bounciness: 20, // elasticité 
                //duration: 4000 // == a 3 secondes
            }
        ).start() //lance notre animation
    }

    render() {
        return (
            <Animated.View
                style={{ width: this.state.viewSize, height: this.state.viewSize }}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default AnimCoeur