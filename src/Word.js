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
        <div className='row mt-2 justify-content-md-center'>
                {letterElements}
        </div>
    )
}