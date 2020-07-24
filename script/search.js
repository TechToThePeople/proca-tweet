require('dotenv').config();

var Twitter = require('twitter-lite');

const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};
var client = new Twitter(config);

var q = process.argv[2];
if (!q) {
  console.error("you need to give the list id as param\n$node search.js {your query}");
  process.exit(1);
}

var params = {q: q, result_type:"recent", include_entities:false, count:100};

function format (d) {
  let result = {};
  /*
  try {
  d.url = d.entities.url.urls[0].expanded_url;
  } catch (e) {
    // console.log ("no url"); we skip replacing the url when there isn't one
  }

  if (d.entities && d.entities.description && d.entities.description.urls && d.entities.description.urls.length > 0) {
    // let's replace
    d.description = d.description.replace(d.entities.description.urls[0].url,d.entities.description.urls[0].display_url);
  }
  */

  const keys= "id_str,created_at,text,retweet_count,favorite_count".split(",");  
  keys.forEach(k => {
    result[k] = d[k];
  });
  const user_keys= "id,name,screen_name,location,description,url,profile_image_url_https,followers_count,friends_count,lang".split(",");  
  user_keys.forEach(k => {
    result[k] = d.user[k];
  });
  return result;
};

let all = [];
const page = async (max_id) => {
  let length = 0;
  if (max_id)
    params['max_id']=max_id;

  await client.get('search/tweets', params)
    .then ( data => {
      length = data.statuses.length;
      const r = data.statuses.map (d => format(d));
      all.push(...r);
      if (length == 100)
        max_id = data.statuses[99].id;
      
    })
    .catch (error => {
      console.error (error);
      process.exit(1);
    });
  if (length === 100) {
    page(max_id);
  }
};

(async () => {
  await page ();
  all.sort((a, b) => (a.followers_count < b.followers_count) ? 1 : -1)
  process.stdout.write(JSON.stringify(all,null,1));
})();
