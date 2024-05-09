//const getProfile=require ('./src/twitter.js');
import getProfile from './src/twitter.js';

/*const config = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
};*/

const config = {
  bearer_token: TWITTER_BEARER_TOKEN
}


async function handleRequest(request) {
  const url = new URL(request.url)
  console.log(request.url,url);
  const screen_name = url.searchParams.get('screen_name') || "eucampaign";
  let response = await getProfile (screen_name, config);
  // Recreate the response so we can modify the headers
  return JSONResponse (response);
}
function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null &&
    request.headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check the requested method + headers
    // you can do that here.
    return new Response(null, {
      headers: corsHeaders,
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}
addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)
  if (true) {
    console.log("PROXY_ENDPOINT");
    if (request.method === 'OPTIONS') {
      // Handle CORS preflight requests
      event.respondWith(handleOptions(request))
    } else if (
      request.method === 'GET' ||
      request.method === 'POST'
    ) {
      // Handle requests to the API server
      event.respondWith(handleRequest(request))
    } else {
      event.respondWith(
        new Response(null, {
          status: 405,
          statusText: 'Method Not Allowed',
        }),
      )
    }
  } else {
    // Serve demo page
    console.log("NO PROXY_ENDPOINT");
    event.respondWith(rawHtmlResponse("TESTING RESPONSE " + KEY_TEST+request.url.pathname))
  }
})
// We support the GET, POST, HEAD, and OPTIONS methods from any origin,
// and accept the Content-Type header on requests. These headers must be
// present on all responses to all CORS requests. In practice, this means
// all responses to OPTIONS requests.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Vary': 'Origin',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
// The URL for the remote third party API you want to fetch from
// but does not implement CORS
const API_URL = 'https://workers-tooling.cf/demos/demoapi'
// The endpoint you want the CORS reverse proxy to be on
const PROXY_ENDPOINT = '/corsproxy/'
// The rest of this snippet for the demo page

const JSONResponse = (message, status = 200) => {
  let headers = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      'Vary': 'Origin',
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    },

    status: status
  };

  return new Response(JSON.stringify(message), headers);
};

async function rawHtmlResponse(html) {
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}
