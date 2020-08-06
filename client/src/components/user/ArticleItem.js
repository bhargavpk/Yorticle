import React, { Component } from 'react'

export default class ArticleItem extends Component {

    getSlicedString(str, limit)
    {
        return(
            str.length<=limit?
            str:
            str.substring(0,limit-4)+'...'
        )
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.article
    }
    
    render() {
        if(!this.props.article)
            return (<div></div>)
        return (
            <div className="article-item">
                <div className="article-item-title">
                    {this.getSlicedString(this.props.article.title, 15)}
                </div>
                <div className="article-item-content">
                    {this.getSlicedString(this.props.article.content, 80)}
                </div>
            </div>
        )
    }
}
