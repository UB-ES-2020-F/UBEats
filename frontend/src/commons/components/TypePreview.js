import React from 'react';

import {Link} from 'react-router-dom';

const TypePreview = ({photo, type_id, type_name}) => {
    let count = 0;
    const cli = () => {
        count = 1+count;
        console.log(count);
    }
    const linkState = {
        pathname:'/viewall'
    }
    
    return (
        <div className="listings-grid-element2">
            <Link to=''>
                <div className="image">
                <img 
                    src={photo} 
                    alt={"Type preview"+type_name + type_id} 
                    onClick={cli}
                />
                </div>
            </Link>
        </div>
    );
};

export default TypePreview;


