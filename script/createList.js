require('dotenv').config();
const Bottleneck = require("bottleneck/es5");

const fs = require('fs');
const limiter = new Bottleneck({
  maxConcurrent: 3,
  minTime: 500
});

var Twitter = require('twitter-lite');

const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};
var client = new Twitter(config);
let sn = null; // name of the attribute in the json containing the twitter screen name

const listname = process.argv[2];
const file = process.argv[3];
let listid = null;
if (!listname || !file) {
  console.error("you need to give the list name and json file as param\n$node createList.js {listname file.json}");
  process.exit(1);
}


let names = JSON.parse(fs.readFileSync(file));
["Twitter","screen_name","screenname","twitter"].forEach (d => {
  if (names[0][d]) {
    sn = d;
  }
})

console.log(names.length +" records on the file");

upsertList(listname) // find of create the list
.then (async listId => {
  const r = await upsertMembers (listId);
});

async function upsertList (listname) {
  try {
    data = await client.get('lists/show', {slug:listname,owner_screen_name:process.env.TWITTER_SCREEN_NAME});

    if (!data.id_str) {
      console.log("eerror");
    }
      return data.id_str;

  }  catch (error) {
    console.log("create list ",listname);
    return await createList();
  };
}

//    process.exit(1);

const createList= async () => {
  try {
  data = client.post('lists/create', {name:listname, description:"created by proca"})
  return data.id_str;
  } catch (error) {
    console.error (error);
    process.exit(1);
  };
}

async function  upsertMembers (listid) {
  const params = {list_id: listid, skip_status:true, count:5000};
  try {
    const existing = await client.get('lists/members', params);
    let dupes = [];

    const add = names.filter (d => {
      //console.log("checking "+d[sn]);
      const found = existing.users.some (e => {
        if (d[sn] === e.screen_name) {
          console.log("duplicate", d[sn]);
          dupes.push[e.screen_name];
          return true;
        }
        return false;
      });
      return !found;
    });

    console.log("adding " + add.length);
    const slowCreateMember = limiter.wrap(createMember);
    add.map(async d => {
      try {

        const r = await slowCreateMember(d[sn],listid);
        console.log("added "+d[sn]);
      } catch (error) {
        console.error (error.errors);
        process.exit(1);
        return error;
      };
    });
  } catch (error) {
    console.error (error.errors);
  };

}

//    process.exit(1);

const createMember= async (screenName,listid) => {
    console.log(".");
    const data = await client.post('lists/members/create', {list_id:listid, screen_name:screenName})
      console.log("added ",screenName,listid);
    return data;
}

