import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

import ArticleItem from './ArticleItem'

export default class ArticleList extends Component {

    render() {
        
        const articleListArr = Object.values(this.props.articleList.articleArr)
        if(this.props.loading === true)
            return(
                <div id="article-list-component">
                   <div id="article-loader">
                       <Loader type="ThreeDots" color="#E7013B" height="100" width="100"/>
                    </div>
                </div>
            )
        else
        return (
            <div id="article-list-component">
                { 
                    articleListArr.map((article, index) => (
                        <ArticleItem key={index} article={article}
                        showStatus={this.props.showStatus} publish={article.publish}/>
                    ))
                }
    
            </div>
        )
    }
}
