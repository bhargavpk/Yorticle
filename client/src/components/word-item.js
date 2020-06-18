import React, { Component } from 'react'

class WordItem extends Component {
    splitWord(){
        var wordArr = []
        wordArr[0] = this.props.currentWord;
        wordArr[1] = this.props.word.substring(this.props.currentWord.length)
        return wordArr;
    }
    
    render() {
        const wordArr = this.splitWord()
        return (
        <li onClick={this.props.clickEvent}><span>{wordArr[0]}</span>{wordArr[1]}</li>
        )
    }
}

export default WordItem
