/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

 //require axios
const axios = require('axios').default;

//GET request
const get = async () => {
  try {
    const response = await axios.post(
      'http://ambush-api.inyourarea.co.uk/ambush/intercept',
      {
        method: 'GET',
        url: 'https://api.npms.io/v2/search/suggestions?q=react',
        return_payload: true,
      },
    );
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};

async function countMajorVersionsAbove10() {
  // TODO
  let count = 0;
  //Get content
  const content = await get();
  //loop through packages
  content.forEach( pack => {
    const { version } = pack.package;
    //Convert to int
    const converted = parseInt( version, 10 );
    //check if version int is equal to or greater than 10
    if ( converted >= 10 ) count++;
  });
  return count;
};

module.exports = countMajorVersionsAbove10;