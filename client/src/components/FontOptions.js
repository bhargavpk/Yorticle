import React,{Component} from 'react'

//import icons
import fontSizeIcon from '../images/font-size-icon.png'
import fontStyleIcon from '../images/font-style-icon.png'
import fontColorIcon from '../images/font-color-icon.png'

//import dropdown options
import FontSizeOptions from './options/FontSizeOptions'
import FontStyleOptions from './options/FontStyleOptions'
import FontColorOptions from './options/FontColorOptions'

class FontOptions extends Component{
    render(){
        return(
            <div id="options-box">
                <div className="option">
                    <img id="font-size-icon" className="font-options-icon" src={fontSizeIcon} alt=""/>
                    <FontSizeOptions fontSizeClickEvent={this.props.fontSizeClickEvent}/>
                </div>
                <div className="option">
                    <img id="font-style-icon" className="font-options-icon" src={fontStyleIcon} alt=""/>
                    <FontStyleOptions fontSizeClickEvent={this.props.fontSizeClickEvent}/>
                </div>
                <div className="option">
                    <img id="font-color-icon" className="font-options-icon" src={fontColorIcon} alt="" />
                    <FontColorOptions fontSizeClickEvent={this.props.fontSizeClickEvent}/>
                    </div>
            </div>
        )
    }
}

export default FontOptions