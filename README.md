
https://twitter.com/i/lists/918762298877112320/members

VDL commission
https://twitter.com/i/lists/1164159635047231489

diplomatic missions in the EU
https://twitter.com/i/lists/100814734

EU bubble journalists
https://twitter.com/i/lists/58265333
https://twitter.com/i/lists/68289112

Convert a json of array of objects into a csv:

    jq -r '(.[0] | keys_unsorted), (.[] | to_entries | map(.value))|@csv' 

sort a json:

    jq '. | sort_by(-.followers_count)'

## Available Scripts

In the project directory, you can run:

node script/fetchList.js 918762298877112320 > euhead.json

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

node script/fetchList.js 1267052348855255040 > src/data/supporters.json 
