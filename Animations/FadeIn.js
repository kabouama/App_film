import React from 'react'
import { Animated, Dimensions } from 'react-native'

class FadeIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        positionLeft: new Animated.Value(Dimensions.get('window'). width)
        }
    }

    componentDidMount() { //une fois que le component est monter
        Animated.spring( //effet d'elasticité
        this.state.positionLeft,
        {
            toValue: 0,
            speed: 2,
            bounciness: 20, // elasticité 
            //duration: 4000 // == a 3 secondes
        }
        ).start() //lance notre animation
    }

    render() {
        return (
            <Animated.View
                style={{ top: this.state.positionLeft }}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default FadeIn