import React, { Component } from 'react'
import axios from 'axios'
import { func } from 'prop-types'
import getRequest from '../requests'
import { CLIENT_URL } from '../constants.js'
import FlashcardDetail from './FlashcardDetail'

class FlashcardContainer extends React.Component {
  state = {
    flashcards: [],
    currentIndex: 0
  }
  static propTypes = {
    onTimerEnd: func.isRequired
  }

  next = () => {
    
    let nextIndex = (this.state.currentIndex + 1) === this.state.flashcards.length
      ? this.state.currentIndex
      : this.state.currentIndex + 1
    
    this.setState({currentIndex: nextIndex})
  }
  prev = () => {
    let prevIndex = (this.state.currentIndex - 1) < 0
      ? this.state.currentIndex
      : this.state.currentIndex - 1
  
    this.setState({currentIndex: prevIndex})
    
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 39) this.next()
    if (event.keyCode === 37) this.prev()
  }

  componentDidMount() {
    getRequest.then(response => this.setState({ 
      flashcards: response.data
    }))
    // only one eventListener is needed; both are in one function:
    window.addEventListener('keyup', this.handleKeyUp)
    // CLIENT var is in all caps to show it is a constant
    axios.get(`${CLIENT_URL}/api/words`)
    .then((res) => {
      this.setState({flashcards: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

    render() {
      let flashcard = this.state.flashcards[this.state.currentIndex]

      return (
        <div className="container">
          {/* card is props being passed to flashcardDetail */}
          {flashcard && <FlashcardDetail onTimerEnd={this.next} card={flashcard}/>}
        </div>
      )
    }
}

export default FlashcardContainer
