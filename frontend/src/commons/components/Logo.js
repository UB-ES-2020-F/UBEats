import React from 'react';
import {Link} from 'react-router-dom';

import './Logo.css';

const Logo = ({classNameProp}) => {
    const concatClassName='linkto '.concat(classNameProp);
    console.log(concatClassName);
    return (
        <div class="logo">
            <Link to='/' className={concatClassName}><h1>UB<span>Eats</span></h1></Link>
        </div>
    );
};

export default Logo;