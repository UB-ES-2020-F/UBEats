import React from 'react';

import {Link} from 'react-router-dom';

import Sidebar from 'react-sidebar';

import LoggedSidebar from './LoggedSidebar';
import DefaultSidebar from './DefaultSidebar';
import './GeneralSidebar.css';

const GeneralSidebar = ({isOpen, onOpen, isLogged}) => { 
    return (
        <Sidebar
            sidebar={
               <div>{isLogged ?  (<LoggedSidebar openSidebar={onOpen}/>) : (<DefaultSidebar openSidebar={onOpen}/>)}</div>
            }
            open={isOpen}
            onSetOpen={onOpen}
            styles={{ sidebar: { background: "white", width:'20%' } }}
        >
        </Sidebar>
    );
}



export default GeneralSidebar;
