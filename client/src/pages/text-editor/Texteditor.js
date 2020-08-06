import React, {Component} from 'react';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import Document from './../../components/text-editor/Document';

export default class Texteditor extends Component{

    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:'',
            contentEditable:false
        }
       //Make all components unresponsive
    //    const articleId = queryString.parse(props.location.search).id;
    //    if(articleId)
    //    {
    //         fetch('http://localhost:9000/article/'+articleId,{
    //             method:'GET',
    //             headers:{
    //                 'Authorization':'Bearer '+(new Cookies()).get('authToken')
    //             }
    //         }).then(res => res.json())
    //         .then(data => {
    //             if(data.error)
    //             {   /*Maybe render to error page*/    }
    //             else{
    //                 const {title,content} = data.article;
    //                 this.setState({
    //                     title,content,
    //                     contentEditable:data.contentEditable
    //                 })
    //             }
    //         })
    //    }
    }

    componentDidMount(){
        const articleId = queryString.parse(this.props.location.search).id;
       if(articleId)
       {
            fetch('http://localhost:9000/article/'+articleId,{
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+(new Cookies()).get('authToken')
                }
            }).then(res => res.json())
            .then(data => {
                if(data.error)
                {   /*Maybe render to error page*/    }
                else{
                    const {title,content} = data.article;
                    this.setState({
                        title,content,
                        contentEditable:data.contentEditable
                    })
                }
            })
       }
       else{
           this.setState({
               contentEditable:true
           })
       }
    }

    render(){
        return(
            <div id="texteditor-body">
                <Document
                title={this.state.title}
                content={this.state.content}
                contentEditable={this.state.contentEditable}
                trie={this.state.trie}
                />
            </div>
        )
    }
}
