import React from 'react';
import Subscribe from '../lib/Subscribe';
import ContentWrapper from '../lib/ContentWrapper';
import PostList from '../lib/PostList';

function Home() {
    return (
        <div className='home'>
            <ContentWrapper>
                <PostList />
            </ContentWrapper>
            <Subscribe />
        </div>
    )
}

export default Home
