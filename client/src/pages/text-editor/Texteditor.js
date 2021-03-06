import React, {Component} from 'react';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import Document from '../../components/text-editor/Document';
import Reviews from '../../components/text-editor/Reviews'

import '../../css/text-editor.css'

export default class Texteditor extends Component{

    constructor(props){
        super(props);
        this.state = {
            title:'',
            contentEditable:false,
            reviews:[],
            checkArticle:false
        }
        if(!((new Cookies()).get('authToken')))
            window.location.replace('/')
    }

    componentDidMount(){
       const articleId = queryString.parse(this.props.location.search).id;
       if(articleId)
       {
           //Make all components unresponsive
            fetch('/article/'+articleId,{
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+(new Cookies()).get('authToken')
                }
            }).then(res => res.json())
            .then(data => {
                if(data.error)
                {   /*Maybe render to error page*/    }
                else{
                    const {title,content,reviews} = data.article;
                    this.setState({
                        title,content,reviews,
                        contentEditable:data.contentEditable,
                        checkArticle:true
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

    flipReviewStat = () => {
        this.setState({
            reviewStat: undefined
        })
    }

    reviewButtonClickEvent = reviewContent => {
        const bodyObj = {content: reviewContent}
        const articleId = queryString.parse(this.props.location.search).id;
        fetch('/review?id='+articleId,{
            method:'PATCH',
            headers:{
                'Authorization':'Bearer '+(new Cookies()).get('authToken'),
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(bodyObj)
        }).then(res => res.json())
        .then(data => {
            if(data.error)
                this.setState({
                    reviewStat:false
                })
            else
                this.setState({
                    reviewStat:true,
                    reviews:data.reviews
                })
        })
    }

    render(){
        if(!((new Cookies()).get('authToken')))
            return <div></div>
        return(
            <div id="texteditor-body">
                <Document
                title={this.state.title}
                content={this.state.content}
                contentEditable={this.state.contentEditable}
                articleId={queryString.parse(this.props.location.search).id}
                checkArticle={this.state.checkArticle}
                />
                <Reviews reviews={this.state.reviews}
                reviewStat={this.state.reviewStat}
                reviewButtonClickEvent={this.reviewButtonClickEvent}
                flipReviewStat={this.flipReviewStat}
                />
            </div>
        )
    }
}
