import React, {useState} from 'react';

import {Link} from 'react-router-dom';

const TypePreview = ({photo, type_id, type_name}) => {
    const [containerData, setContainerData] = useState([{data:''}]);

    let count = 0;
    const cli = () => {
        count = 1+count;
        console.log(count);
    };
    //https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
    const linkState = {
        pathname:'/viewall',
        contaierdata: containerData,
    };

    const fetchData = () => {
        
    };
    
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


