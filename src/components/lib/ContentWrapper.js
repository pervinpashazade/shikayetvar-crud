import React from 'react';


function ContentWrapper(props) {

    const { children } = props;

    return (
        <div className='content-wrapper'>
            {children}
        </div>
    )
}

export default ContentWrapper
