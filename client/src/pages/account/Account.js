import React, { Component } from 'react'
import Cookies from 'universal-cookie'

import Homeheader from '../../components/home/Homeheader';
import HomeheaderInfo from '../../components/home/HomeheaderInfo';
import ArticleList from '../../components/user/ArticleList'
import UserInfo from '../../components/account/UserInfo';
import '../../css/account-style.css'

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleList:{
                articleArr:[]
            },
            user:{},
            loading:true
        }

        if(!((new Cookies()).get('authToken')))
            window.location.replace('/')
        else
        {
            const userName = this.props.match.params.user
            fetch('/user/'+userName,{
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+(new Cookies()).get('authToken')
                }
            }).then(res => res.json())
            .then(data => {
                if(!data.error)
                {
                    this.setState({
                        articleList:data.articleList,
                        user:data.user,
                        loading:false
                    })
                }
            })
        }
    }

    render() {
        return (
            <div id="home-component" style = {{minHeight:'100vh'}}>
                <Homeheader />
                <HomeheaderInfo page={'account'}/>
                <UserInfo user={this.state.user}/>
                <ArticleList articleList={this.state.articleList}
                showStatus={true} loading={this.state.loading}
                />
            </div>
        )
    }
}
