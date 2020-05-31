import React,{useState} from 'react';

import {Container,Card,Grid,CardContent} from '@material-ui/core';


//import './App.css';
//import TwitterAction from './component/TwitterAction.js';
import {TwitterList,TwitterText} from 'proca';
//import TwitterList from 'proca/src/components/TwitterList';
import SelectCountry from './component/SelectCountry';
//import TwitterText from '.components/TwitterText';
//import profiles  from './data/euhead';
import profiles  from './data/supporters';
function App() {
  
  const [actionText,setActionText] = useState("Support the Green Resilience Pact : Creating Jobs, Saving Lives");

  function handleChange(e){
    console.log("target",e);
    setActionText(e.target.value);
  };
  return (
    <Container maxWidth="lg">
    <div className="App">
      <Card>
      <CardContent>
      <h2>Click on each person to tweet them your message!</h2>
      <SelectCountry label="Your country"/>
      <TwitterText text={actionText} handleChange={handleChange} label="Your message to them"/>
      </CardContent>
      </Card>
      <TwitterList profiles={profiles} actionUrl="https://creatingjobssavinglives.eu/" actionText={actionText}/>
    </div>
    </Container>
  );
}

export default App;
