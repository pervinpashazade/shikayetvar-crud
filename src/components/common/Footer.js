import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import footerLogo from '../../assets/img/footerLogo.png';

function Footer() {
    return (
        <Container>
            <div className='footer'>
                <div className="copyright">
                    <span>&copy; 2018</span>
                    <img src={footerLogo} alt='sikayetim var logo' />
                </div>
                <div className="pages">
                    <Link to='/' className='custom-link-btn'>
                        Post
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default Footer
