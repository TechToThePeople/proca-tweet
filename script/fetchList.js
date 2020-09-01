require('dotenv').config();

var Twitter = require('twitter-lite');

const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};
var client = new Twitter(config);

var listid = process.argv[2];
if (!listid) {
  console.error("you need to give the list id as param\n$node fetchList.js {listid}");
  process.exit(1);
}

var params = {list_id: listid, skip_status:true, count:5000};

function formatProfile (d) {
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
  const keys= "id,name,screen_name,location,description,url,profile_image_url_https,followers_count,lang,verified".split(",");  keys.forEach(k => {
    result[k] = d[k];
  });
  result.country="";
  return result;
};

client.get('lists/members', params)
  .then ( data => {
    const r = data.users.map (d => formatProfile(d));
    r.sort((a, b) => (a.followers_count < b.followers_count) ? 1 : -1)

    process.stdout.write(JSON.stringify(r,null,1));
  })
  .catch (error => {
    console.error (error);
    process.exit(1);
  });
