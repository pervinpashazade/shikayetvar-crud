import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import { Container } from 'reactstrap';
import routes from '../../routes';

const Content = () => {
    return (
        <Container>
            <Route path="/" exact component={Home} />
            <Route path="/test" exact component={PostDetail} />
            {
                routes.map((item, index) =>
                    <Route
                        key={index}
                        path={item.path}
                        exact={item.exact}
                        component={item.component}
                    />
                )
            }
        </Container>
    )
}

export default Content