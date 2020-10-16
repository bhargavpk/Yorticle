import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom'

import '../../css/user-style.css'

import Homeheader from '../../components/home/Homeheader';
import HomeheaderInfo from '../../components/home/HomeheaderInfo';
import ArticleList from '../../components/user/ArticleList';

class User extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            articleList:{
                articleArr:[]
            },
            loading:true,
            userAuth: true
        }
        if(!(new Cookies()).get('authToken'))
            this.setState({
                userAuth: false
            })
        
        fetch('/article',{
            method:'GET',
            headers:{
                    'Authorization':'Bearer '+(new Cookies()).get('authToken')
                }
        }).then(res => res.json())
        .then((data) => {
            this.setState({
                articleList: data,
                loading:false
            })
        
        })
    }

    render(){

        if(this.state.userAuth === false)
        {
            return <Redirect to = '/' />
        }

        return (
            <div id="home-component" style = {{minHeight:'100vh'}}>
                <Homeheader />
                <HomeheaderInfo options={['Account','Log out']} spanMessage={''}/>
                <div id="texteditor-ref">
                    <a href="/text-editor">Write a new article</a>
                </div>
                <ArticleList articleList={this.state.articleList} showStatus={false} loading={this.state.loading}/>
            </div>
        )
    }
};

export default User;