const Twitter = require("./twitter-lite/twitter.js");

function format(d) {
  let result = {};
  try {
    d.url = d.entities.url.urls[0].expanded_url;
  } catch (e) {
    // console.log ("no url"); we skip replacing the url when there isn't one
  }

  if (
    d.entities &&
    d.entities.description &&
    d.entities.description.urls &&
    d.entities.description.urls.length > 0
  ) {
    // let's replace
    d.description = d.description.replace(
      d.entities.description.urls[0].url,
      d.entities.description.urls[0].display_url
    );
  }
  d.created_at = new Date(d.created_at).toISOString().substr(0, 10);

  if (d.profile_image_url_https) {
    d.profile_image_url_https = d.profile_image_url_https.replace(
      "https://pbs.twimg.com/profile_images/",
      "https://pic.proca.app/twimg/"
    );
    d.avatar = d.profile_image_url_https.replace("_normal", "_400x400");
  }

  const user_keys =
    "id,name,screen_name,location,description,url,avatar,profile_image_url_https,followers_count,friends_count,statuses_count,created_at,lang".split(
      ","
    );
  user_keys.forEach((k) => {
    result[k] = d[k];
  });
  //  if (result.profile_image_url_https) {
  //    result.profile_image_url_https = result.profile_image_url_https.replace("_normal","_400x400").replace("_standard","_400x400");
  //  }
  return result;
}

module.exports = async function getScreenName(screenName, config) {
  if (!screenName) return { error: true, message: "missing screen_name param" };
  var client = new Twitter(config);
  let params = { screen_name: screenName, include_entities: true };
  return await client
    .get("users/show", params)
    .then((data) => {
      return format(data);
    })
    .catch((error) => {
      console.error(error);
      if (error.errors[0].code === 32) {
        return {
          error: true,
          message: [{ code: 32, message: "Musk has blocked us again" }],
        };
      }
      return { error: true, message: error };
    });
};
