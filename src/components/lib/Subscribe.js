import React from 'react';
import { IoLogoTwitter } from 'react-icons/io';
import {
    AiFillFacebook,
    AiOutlineDribbble,
    AiOutlineGithub
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Subscribe() {
    return (
        <div className='subscribe'>
            <div className="row">
                <div className='col-md-6'>
                    <h4>Thank you for supporting us!</h4>
                    <p>
                        Let's get in touch on any of these platforms.
                    </p>
                </div>
                <div className='col-md-6'>
                    <div className="social-buttons">
                        <Link to="/" className="social-btn btn-twitter">
                            <IoLogoTwitter />
                        </Link>
                        <Link to="/" className="social-btn btn-facebook">
                            <AiFillFacebook />
                        </Link>
                        <Link to="/" className="social-btn btn-dribble">
                            <AiOutlineDribbble />
                        </Link>
                        <Link to="/" className="social-btn btn-github">
                            <AiOutlineGithub />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
