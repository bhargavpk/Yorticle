import React, {Component} from 'react';
import Cookies from 'universal-cookie'

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
            loading:true
        }
        if(!(new Cookies()).get('authToken'))
            window.location.replace('/')
        
        fetch('http://localhost:9000/article',{
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
        return (
            <div id="home-component" style = {{minHeight:'100vh'}}>
                <Homeheader />
                <HomeheaderInfo options={['Account','Log out']} spanMessage={''}/>
                <ArticleList articleList={this.state.articleList} showStatus={false} loading={this.state.loading}/>
            </div>
        )
    }
};

export default User;