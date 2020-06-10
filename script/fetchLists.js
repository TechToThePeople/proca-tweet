require('dotenv').config();

var Twitter = require('twitter');

const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};
var client = new Twitter(config);

var screenName = process.argv[2];
if (!screenName) {
  console.error("you need to give the user screen_name as param\n$node fetchLists.js {eucamaigns}");
  process.exit(1);
}

var params = {screen_name: screenName, skip_status:true, count:5000};

function formatList (d) {
  let result = {};
  try {
  d.url = d.entities.url.urls[0].expanded_url;
  } catch (e) {
    // console.log ("no url"); we skip replacing the url when there isn't one
  }

  if (d.entities && d.entities.description && d.entities.description.urls && d.entities.description.urls.length > 0) {
    // let's replace
    d.description = d.description.replace(d.entities.description.urls[0].url,d.entities.description.urls[0].display_url);
  }
  const keys= "id_str,name,name,description,uri,subscriber_count,member_count".split(",");  keys.forEach(k => {
    result[k] = d[k];
  });
  result.country="";
  return result;
};

client.get('lists/list', params)
  .then ( data => {
    const r = data.map (d => formatList(d));
    r.sort((a, b) => (a.subscribers_count < b.subscribers_count) ? 1 : -1)

    process.stdout.write(JSON.stringify(r,null,1));
  })
  .catch (error => {
    console.error (error);
    process.exit(1);
  });
