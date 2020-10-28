import React from 'react';
import GreetDev from '../components/GreetDev';


function App() {
  var devs = ['Albert C.', 'Hector A.', 'Oriol A.', 'Ruben B.', 'Samu R.', 'Daniel R.'];
  return (
    <div>
      <strong>This is our Dev Team.</strong>
      { devs.map(dev => <GreetDev name={dev} key={dev}/>) }
    </div>
  );
}

export default App;