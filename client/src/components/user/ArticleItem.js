import React, { Component } from 'react'

export default class ArticleItem extends Component {
    constructor(props){
        super(props);
        this.articleRef = React.createRef();
        this.state = {}
    }

    componentDidMount(){
        this.articleRef.current.addEventListener('click',(e)=>{
            const url = '/text-editor?id='+this.props.article._id
            window.location.href = url;
        })
    }

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
        // if(this.state.url)
        //     return <Redirect to={this.state.url}/>
        var articleStat = '',styleObj;
        if(this.props.showStatus === true){
            if(this.props.publish.canPublish === true)
            {
                articleStat = 'Published'
                styleObj = {color:'purple'}
            }
            else
            {
                articleStat = 'Saved'
                styleObj = {color:'green'}
            }
        }
        if(!this.props.article)
            return (<div></div>)
        return (
            <div className="article-item" ref={this.articleRef}>
                <div className="article-item-title">
                    {this.getSlicedString(this.props.article.title, 15)}
                </div>
                <div className="article-item-content">
                    {this.getSlicedString(this.props.article.content, 80)}
                </div>
                <div className="article-item-author">{this.props.article.author}</div>
                <div className="article-status" style={styleObj}>{articleStat}</div>
            </div>
        )
    }
}
