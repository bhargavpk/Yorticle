import React, {Component} from 'react';

import '../../css/user-style.css'

import Homeheader from '../../components/home/Homeheader';
import HomeheaderInfo from '../../components/home/HomeheaderInfo';
import ArticleList from '../../components/user/ArticleList';

class User extends Component{
    render(){
        return (
            <div id="home-component" style = {{minHeight:'100vh'}}>
                <Homeheader />
                <HomeheaderInfo options={['Account','Log out']} spanMessage={''} />
                <ArticleList />
            </div>
        )
    }
};

export default User;