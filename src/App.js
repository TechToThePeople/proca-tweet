import React from 'react';
//import './App.css';
import TwitterAction from './component/TwitterAction.js';


function App() {
  const profiles = [
     {screenName:"eucampaign",image:"https://proca.foundation/favicon.ico"},
  ];
  return (
    <div className="App">
      <TwitterAction screenName="eucampaign" />
    </div>
  );
}

export default App;
