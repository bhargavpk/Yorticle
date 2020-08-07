import React, { Component } from 'react'
import ReviewItem from './ReviewItem'

export default class Reviews extends Component {
    constructor(props){
        super(props);
        this.state={
            reviews:[]
        }
        this.textInpRef = React.createRef();
    }

    clickEvent = e => {
        //Make textarea and button inactive
        this.props.reviewButtonClickEvent(this.textInpRef.current.value);
    }

    componentDidUpdate(prevProps){
        if(prevProps.reviews !== this.props.reviews){
            this.setState({
                reviews:this.props.reviews
            })
        }
        if(this.props.reviewStat !== undefined){
        //Maybe act for case when review stat is false
            this.textInpRef.current.value = ''
            this.props.flipReviewStat();
        }
    }

    render() {
        return (
            <div class="review-box">
                <div id="review-header">Reviews</div>
                <div id="review-postbox">
                    <textarea placeholder="Write a review" ref={this.textInpRef}/>
                    <button onClick={this.clickEvent}>Post</button>
                </div>
                {
                    this.state.reviews.map((reviewContent,index) => (
                        <ReviewItem key={index} review={reviewContent} />
                    ))
                }
            </div>
        )
    }
}
