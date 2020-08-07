import React, { Component } from 'react'

export default class ReviewItem extends Component {
    render() {
        return (
            <div className="review-item">
                <div className="review-info">
                    <div className="review-item-username"><a href="/#">{this.props.review.reviewAuthor}</a></div>
                    <div className="review-item-date">{this.props.review.createdAt.split('T')[0]}</div>
                </div>
                {this.props.review.reviewContent}
                <hr style={
                   { 
                       color:'white',
                       backgroundColor:'white',
                       borderWidth:'0px',
                       height:'2px'
                    }
                }/>
            </div>
        )
    }
}
