import React from 'react';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.titleRef = React.createRef();
    }

    componentDidUpdate = prevProps => {
        if((this.props.title)&&(prevProps.title !== this.props.title))
            this.titleRef.current.value = this.props.title
        if((this.props.contentEditable === true)&&(this.props.loading === false))
            this.titleRef.current.removeAttribute('readonly')
        else
        this.titleRef.current.setAttribute('readonly','readonly')
    }

    render(){

        return(
            <header id="texteditor-component-header">
                <input type="text" placeholder="Title"
                style={{
                    width: '50%',
                    textAlign:'left',
                    fontSize:'1.3rem', 
                    fontFamily:"'Montserrat', sans-serif"
                }}
                onKeyUp={this.props.onTypeEvent}
                readOnly
                ref={this.titleRef}/>
            </header>
        )
    }
}

export default Header;