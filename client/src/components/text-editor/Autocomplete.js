import React, {Component} from 'react';
import WordItem from './word-item'
import Trie from '../../utils/trie';

class Autocomplete extends Component{

    constructor(props){
        super(props);
        this.state = {
            trie:new Trie(),
            suggestionWords:[]
        }
    }

    componentDidUpdate(prevProps){
        console.log(this.props.trie)
        if((this.props.trie)&&(prevProps.trie !== this.props.trie))
            this.setState({
                trie: this.props.trie
            })
    }
    
    componentWillReceiveProps(newProps){
        if(newProps.action.getTrie)
        {
            newProps.getTrie(this.state.trie)
            return;
        }
        if(newProps.action.insert)
        {
            this.props.currentWords.forEach(word => {
                if(word !== '')
                    this.state.trie.insertWord(word)
            })
        }
        if(newProps.action.suggest === true)
            this.setState({
                suggestionWords:this.state.trie.wordPref(newProps.currentWords[0])
            })
        else
            this.setState({
                suggestionWords:[]
            })
    }

    render(){
        return this.state.suggestionWords.map((word,index) => (
            <WordItem  key={index} word={word}
            currentWord={this.props.currentWords[0]}
            clickEvent={this.props.suggestionClickEvent}
            />
        ))
    }
    
}

export default Autocomplete;