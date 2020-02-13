//TODO: custom tip
//TODO: add person qty
import React from 'react';

    const Bill = (props) => (
            <div className='bill container'>
                <h1 className='flex-small'><p>${props.bill} pre-tip</p></h1>
                <h1 className='flex-small'><p>${props.tip} tip</p></h1>
                <h1 className='flex-small'><p>${props.share} post-tip</p></h1>
            </div>           
    );

export default Bill