require('dotenv').config();
global.fetch = require('node-fetch');
const getProfile = require('../src/twitter.js');

const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  fetch: fetch
};

let screen_name='eucampaign';

(async () =>{
response = await getProfile (screen_name, config);
console.log(response);
})();
