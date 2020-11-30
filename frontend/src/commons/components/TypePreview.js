import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import RestService from "../../api/restaurant.service";

const TypePreview = ({photo, type_id, type_name}) => {
    const [containerData, setContainerData] = useState([{data:''}]);
    
    const fetchRestaurants = async () => {
        const items = await RestService.getRestaurantsByType(type_id);
        setContainerData(items);
      };
      
    //https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router

    useEffect(() => {
        fetchRestaurants();
     }, 
     []
    );
    
    return (
        <div className="listings-grid-element2">
            <Link to={{
                pathname:'/viewall/type'+type_id,
                title: type_name,
                containerdata: containerData
            }}>
                <div className="image">
                <img 
                    src={photo} 
                    alt={"Type preview"+type_name + type_id} 
                />
                </div>
            </Link>
        </div>
    );
};

export default TypePreview;


