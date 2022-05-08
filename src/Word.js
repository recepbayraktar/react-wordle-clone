import './App.css';
import React from 'react';

import Letter from './Letter';

export default function Word(props) {
    const letterElements = props.letters.map( item => {
        return (

            <Letter 
                key={item.id}
                value={item.value}
                status={item.status}
            />
           
        )
    })
    return (
        <div className='row col-sm-6 offset-sm-3 mt-4'>
            {letterElements}
        </div>
    )
}