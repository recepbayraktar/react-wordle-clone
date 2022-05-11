import React from "react";
import "./App.css";



export default function Keyboard({layout, handleClick, hand}){
    

    

    const keyRows = layout.keys.map(keyRow => keyRow.map(key => {
        if (layout.disabledKeys.includes(key)) {
            return <button disabled className="disabled-key" value={key} onClick={(e) => handleClick(e)} >{key}</button>
        }
        else{
            return <button   className="keyboard-key shadow" value={key} onClick={(e) => handleClick(e)} >{key}</button>
        }
    }))

    return(
        <div>
            {keyRows.map(keys =>
            {
                return <div className="keyboard-row">{keys}</div>
            } 
            )}
        </div>
    )
}