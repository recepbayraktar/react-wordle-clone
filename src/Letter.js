import './App.css';
import React from 'react';

export default function Letter(props) {

    let style = blockStyle();
    function blockStyle() {
        if (props.letterStatus === "correct") {
            return (
                { 
                    color: {color: "#1D6B55"},

                    background:{background: "#02C39A"}
                }
            )
        }
        else if(props.letterStatus === "wrong")
        {
            return (
                { 
                    color:{color: "#934B27"},
                    background:{background: "#F5793A"}
                }
            )
        }
        else if(props.letterStatus === "includes"){
            return (
                { 
                    color:{color: "#837035"},
                    background:{background: "#FDD85D"}
                }
            )
        }
        else {
            return (
                { 
                    color:{color: "#A3A3AE"},
                    background:{background:"#48495F"}
                }
            
            )
        }
    }

    return (
        <div className='col-sm-1 mx-4 '>
            {

                <div className="letter-block" style={style.background}><div className='letter-text' 
                style={style.color}>{props.letter }</div> </div>
            }
            
        </div>
    )
}