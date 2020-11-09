import React from 'react';
import '../../commons/components/App.css';


function ProfileClient() {
  return (
    <section className="login">
      <div className="loginContainer">
        

        <p style={{alignSelf: 'flex-end'}}><strong>Profile picture</strong></p>  
        
        <label>Name</label>
        <p>Pepito McDonald</p>
        
        <label>E-mail</label>
        <p>pepitomcdonald@gmail.com</p>

        <label>DNI</label>
        <p>626646789R</p>
      
        <label>Address</label>
        <p>Carrer de Felip II 143, 1o 1a</p>
        

        <label>Tlf number</label>
        <p>681777564</p>

        <div className="btnContainer">
          <button> Edit profile</button>
        </div>

        <div className="btnContainer">
          <button> Log out</button>
        </div>
         
      </div>
    </section>

  );
}

export default ProfileClient;