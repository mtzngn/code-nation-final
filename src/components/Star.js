import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';


export default function Star() {
    const [click, setClick] = useState(false);
    return (
        <label>
                    <input 
                    type='radio'
                    name='rating'
                    onClick={() => setClick(!click)}/>
                <FaStar
                 className='star'
                 style={ !click ? { color:'grey'} : {color : 'gold'} }
                 size={100}/>
                </label> 
    )
}
