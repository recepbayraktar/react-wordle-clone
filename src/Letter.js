import './App.css';
import React from 'react';

export default function Letter(props) {
    let style = {
        color:{color: "#A3A3AE"},
        background:{background:"#48495F"}
    }
    
    blockStyle();
    function blockStyle() {
        if (props.status === "correct") {
            
            style.color =  {color:"#1D6B55"}
            style.background = {background:"#02C39A"}

        }
        else if(props.status === "wrong")
        {
            style.color =  {color:"#934B27"}
            style.background = {background:"#F5793A"}
              
        }
        else if(props.status === "includes"){
      
            style.color =  {color:"#837035"}
            style.background = {background:"#FDD85D"}
        }
        else {
            style.color =  {color:"#A3A3AE"}
            style.background = {background:"#48495F"}
        }
    }

    return (
        <div className='col-sm-1 mx-2'>
            {
                <div className="letter-block" style={style.background}><div className='letter-text' 
                style={style.color}>{props.value }</div> </div>
            }
            
        </div>
    )
}