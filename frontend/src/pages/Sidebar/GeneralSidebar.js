import React from 'react';
import {useSelector} from 'react-redux';


import Sidebar from 'react-sidebar';

import LoggedSidebar from './LoggedSidebar';
import DefaultSidebar from './DefaultSidebar';
import './GeneralSidebar.css';

//This function contains the sidebar element from npm package react-sidebar.
//isOpen and onOpen are package requirements.
//isLogged is used to select whether LoggedSidebar is displayed or DefaultSidebar is.
const GeneralSidebar = ({isOpen, onOpen}) => { 
    const {isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.

    return (
            <Sidebar
                sidebar={
                <div>{isLogged ?  (<LoggedSidebar openSidebar={onOpen}/>) : (<DefaultSidebar openSidebar={onOpen}/>)}</div>
                }
                open={isOpen}
                onSetOpen={onOpen}
                styles={{ sidebar: { background: "white", width:'20%'}}}
            >
            </Sidebar>
    );
}



export default GeneralSidebar;
