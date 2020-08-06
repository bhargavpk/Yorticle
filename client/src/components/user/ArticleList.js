import React, { Component } from 'react'
import Cookies from 'universal-cookie'

import ArticleItem from './ArticleItem'

export default class ArticleList extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            articleList:{
                articleArr:[]
            }
        }
        
        fetch('http://localhost:9000/article',{
            method:'GET',
            headers:{
                    'Authorization':'Bearer '+(new Cookies()).get('authToken')
                }
        }).then(res => res.json())
        .then((data) => {
                
            this.setState({
                articleList: data
            })
        
        })
    }
        

    render() {
        
        const articleListArr = Object.values(this.state.articleList.articleArr)
        return (
            <div id="article-list-component">
                    
                { 
                        articleListArr.map((article, index) => (
                            <ArticleItem key={index} article={article}/>
                        ))
                }
    
            </div>
        )
    }
}
