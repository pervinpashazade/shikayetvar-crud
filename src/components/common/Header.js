import React from 'react'
import { Link } from 'react-router-dom';
import {
    Row,
    Container,
    Button,
} from 'reactstrap';
import logoHeader from '../../assets/icon/logo.svg';

function Header() {
    return (
        <div className="bg-img">
            <Container>
                <div className="header">
                    <div className="logo-brand">
                        <Link to='/'>
                            <img src={logoHeader} alt="sikayetim var logo" />
                        </Link>
                        <Link to='/' className='custom-link-btn ml-50'>
                            Post
                        </Link>
                    </div>
                    <Link to='/' className='custom-link login-btn'>
                        Login
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default Header
