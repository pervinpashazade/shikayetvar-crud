import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import { Container } from 'reactstrap';

const Content = () => {
    return (
        <Container>
            <Route path="/" exact component={Home} />
            <Route path="/test" exact component={PostDetail} />
        </Container>
    )
}

export default Content