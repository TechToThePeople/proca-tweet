import React,{useState} from 'react';

import {Container} from '@material-ui/core';


//import './App.css';
//import TwitterAction from './components/TwitterAction.js';
//import {TwitterList,TwitterText} from 'proca';
import Twitter from './components/Twitter';
import TwitterList from './components/TwitterList';
//import SelectCountry from './component/SelectCountry';
import TwitterText from './components/TwitterText';
//import profiles  from './data/euhead';
import profiles  from './data/supporters';
function App(props) {
 
if (props.list) {
  console.log(props.list);
}

  const [actionText,setActionText] = useState(props.actionText);
  const actionpage=9;

  function handleChange(e){
    console.log("target",e);
    setActionText(e.target.value);
  };
  return (
    <Container maxWidth="lg">
    <div className="App">
      <Twitter targets={{twitter_url:props.list}} actionPage={actionpage} actionUrl="" actionText={actionText}/>
     
      <TwitterList profiles={profiles} actionPage={actionpage} actionUrl="" actionText={actionText}/>
    </div>
    </Container>
  );
}

App.defaultProps = {
  actionText: ".{@}, Thank you for supporting https://climateandjobs.eu \nPlease RT and ask to sign @ClimateAndJobs!"
}

export default App;
