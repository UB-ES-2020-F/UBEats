import React, { useState }  from 'react';


function GreetDev(props) { 
    const [likes, setlikes] = useState(0);
    const [reportmsg, setReportmsg] = useState('');
    return (
        <div>
            <p>I'm introducing you to <strong>{props.name}</strong> <i> {reportmsg} </i></p>
            <p>Likes :  {likes} </p>
            <button onClick={() => setlikes(likes+1)}>
                Like
            </button>
            <button onClick={() => setReportmsg('Reported. Thank you chief')}>
                Report    
            </button>
        </div>
    );
}

export default GreetDev;