import React, {Component} from 'react'
// import FlashcardContainer from './FlashcardContainer'
// import { clearTimeout, setTimeout } from 'timers';

class FlashcardDetail extends Component {
    state = {
        currentTimeout: null,
        timer: 10,
        show: false        
    }
    
    decrementTimer = () => {
        if (this.state.timer === 0) {
            this.props.onTimerEnd()
        } else {
            console.log( 'else firing')
            clearTimeout(this.state.currentTimeout)
            this.setState(prevState => ({
                timer: prevState.timer - 1,
                currentTimeOut: window.setTimeout(this.decrementTimer, 1000)
            }))
        }
        
    }

    componentDidMount(props) {
        this.setState({
            currentTimeOut: window.setTimeout(this.decrementTimer, 1000)})

    }

    componentWillReceiveProps() {
        clearTimeout(this.state.currentTimeout)
        this.setState({
          timer: 10,
          currentTimeout: window.setTimeout(this.decrementTimer, 1000)
        })
      }

    render () {
        console.log(this.props.card)
        return (
            <div>
                <h1>{this.props.card.word}</h1>
                {/* finish: */}
                {/* flachcard.definitions.map((def, index) => {
                }) */}
                <div className='timer'>{this.state.timer}</div>
            </div>
        )
    }
}


export default FlashcardDetail
