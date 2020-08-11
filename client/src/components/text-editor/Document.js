import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Header from './Header';
import {isAlpha, generateWords} from '../../utils/detectAlpha.js';
import Autocomplete from './Autocomplete';
import Navbar from './Navbar';

export default class Document extends Component {

    constructor(props){
        super(props);

        this.state = {
            words : ['',''],
            trieAction : {},
            docStyle : {
                backgroundColor:'black',
                color:'white',
                fontFamily:'Arial',
                fontSize:'1.5em',
                textAlign:'left',
            },
            title: '',
            loading: true
        }
        this.textInputRef = React.createRef();
        this.titleInputRef = React.createRef();
        this.loadingRef = React.createRef();
    }

    componentDidUpdate  = prevProps => {
        if(this.state.loading === false)
        {
            this.loadingRef.current.textContent = ''
            this.loadingRef.current.removeAttribute('id')
        }
        if(prevProps.content !== this.props.content)
        {
            this.textInputRef.current.value = this.props.content
            //Handle for time lag
            this.setState({
                words:generateWords(this.props.content),
                trieAction:{
                    insert:true
                }
            })
        }
        if(prevProps.title !== this.props.title)
            this.setState({
                title:this.props.title
            })
        if(this.props.contentEditable === true)
            this.textInputRef.current.removeAttribute('readonly')
    }

    changeLoading = () => {
        if(this.state.loading === true)
            this.setState({
                loading: false
            })
    }

    onTitleType = e => {
        this.setState({
            title: e.target.value
        })
    }

    saveReqFn = async (obj) => {
        //Make all other input instances inactive

        const title = this.state.title;
        const content = this.textInputRef.current.value;
        const token = (new Cookies()).get('authToken').toString();
        const articleBody = {title, content, publish:obj.publish};
        var url;
        if(this.props.articleId)
            url = 'http://localhost:9000/article?id='+this.props.articleId
        else
            url = 'http://localhost:9000/article'
        await fetch(url,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body: JSON.stringify(articleBody)
        });
        // const data = await res.json();
        //Handle for data.error ie when document content is empty
        this.setState({
            trieAction:{
                insert: false,
                suggest: false
            }
        })
    }

    saveClickEvent = e => {
        //It should not be possible to save empty document content or title
        const obj = {publish:false}
        if(e.target.id === 'publish-btn')
            obj.publish = true
        this.saveReqFn(obj)   
    }


    toggleState(insertStat,suggestStat,word1,word2){
        this.setState({
            trieAction:{insert:insertStat,suggest:suggestStat},
            words:[word1,word2]
        })
    }


    onKeyType = e => {
        var endPosition1 = e.target.selectionStart;
        var startPosition2 = e.target.selectionStart;
        const docText = e.target.value;

        //If no text on typing
        if(docText === '')
            return

        while((endPosition1 !== 0)&&(!isAlpha(docText[endPosition1-1])))
            endPosition1--;
        while((startPosition2 !== docText.length) && (!isAlpha(docText[startPosition2])))
            startPosition2++;

        var startPosition1 = endPosition1;
        var endPosition2 = startPosition2;

        while(( startPosition1 !== 0 )&&( isAlpha(docText[startPosition1-1]) ))
            startPosition1--;
        while(( endPosition1 !== docText.length ) && ( isAlpha(docText[endPosition1]) ))
            endPosition1++;

        while((endPosition2 !== docText.length) && (isAlpha(docText[endPosition2])))
            endPosition2++;
        
        endPosition1--;
        endPosition2--;

        var dumWord1 = '',dumWord2 = '';
        while(startPosition1 !== endPosition1+1)
        {
            dumWord1 = dumWord1.concat(docText[startPosition1])
            startPosition1++;
        }
        while(startPosition2 !== endPosition2+1)
        {
            dumWord2 = dumWord2.concat(docText[startPosition2])
            startPosition2++;
        }

        if((!isAlpha(docText[e.target.selectionStart-1])) && (e.key !== 'Backspace'))
            if(docText[e.target.selectionStart-1] === ' ')
                this.toggleState(true,false,dumWord1,dumWord2);
            else
                this.toggleState(true,false,dumWord1,'');
        else
            if((e.key === 'Backspace') && (!isAlpha(docText[e.target.selectionStart-1])))
                this.toggleState(false,false,dumWord1,dumWord2);
            else
                this.toggleState(false,true,dumWord1,dumWord2);
    }

    suggestionClickEvent = e => {
        //console.log(e.target.innerText)
        var docText = this.textInputRef.current.value;
        var startPostion = this.textInputRef.current.selectionStart-1,endPosition = startPostion;
        while((startPostion >= 0)&&(isAlpha(docText[startPostion])))
            startPostion--;
        while((endPosition !== docText.length) && (isAlpha(docText[endPosition])))
            endPosition++;
        if(startPostion !== 0)
            startPostion++;
        this.textInputRef.current.value = docText.substring(0,startPostion) + e.target.innerText + docText.substring(endPosition);
        this.toggleState(false,true,e.target.innerText,'')
        this.textInputRef.current.focus()
    }

    fontSizeClickEvent = e => {
        const field = e.target.title;
        const sizeVal = e.target.innerText;
        this.setState(prevState => ({
            docStyle:{...prevState.docStyle,[field]:sizeVal}
        }))
    }

    render() {
        return (
            <div id="document-box">
                <Header onTypeEvent = {this.onTitleType}
                contentEditable={this.props.contentEditable}
                title={this.props.title}/>
                <div id="texteditor-loading" ref={this.loadingRef}>Fetching the article...</div>
                <div id="document">
                    <div id="text-box">
                        <Navbar
                        fontSizeClickEvent={this.fontSizeClickEvent}
                        saveClickEvent = {this.saveClickEvent}
                        readWrite = {this.props.contentEditable}
                        />
                        <textarea 
                        style={this.state.docStyle}
                        onFocus={this.onFocusEvent} 
                        onKeyUp={this.onKeyType} 
                        placeholder="Write something.."
                        ref={this.textInputRef}
                        readOnly
                        />
                    </div>
                    <div id="suggestion-box">
                        <div id="suggestion-header">
                            Suggestions
                        </div>
                        <ul>
                        <Autocomplete
                        action={this.state.trieAction} 
                        currentWords={this.state.words}
                        suggestionClickEvent={this.suggestionClickEvent}
                        getTrie={this.getTrie}
                        changeLoading={this.changeLoading}
                        />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

