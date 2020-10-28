import React from 'react';
import Form from 'react-bootstrap/Form';
import './Nav.css';
import {Link} from 'react-router-dom';

function Nav() { 
    const navStyle = {
        color: 'black'
    }

    return (
        <nav>
            <li className="nav-links">
                <Link style = {navStyle} to='/'>
                    <h3>Logo</h3>
                </Link>
                <Form>
                    <Form.Group>
                        <Form.Control id="formLocationNavBar" placeholder="Enter delivery adress" />
                    </Form.Group>
                </Form>
                <Link stryle={navStyle} to='/login'>
                    <h5>Log in</h5>
                </Link>
            </li>
        </nav>
    );
}

export default Nav;