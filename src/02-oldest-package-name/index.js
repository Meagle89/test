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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
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

async function oldestPackageName() {
  // TODO
  //Array
  const packageList = [];
  //get content
  const content = await get();
  //Loop through content
  content.forEach(pack => {
    const { name, date } = pack.package;
    //parse date string
    const parsedDate = Date.parse(date);
    //push into array
    packageList.push({ packageName: name, date: parsedDate });
  });
  //sort the list by date value
  packageList.sort((a, b) => a.date - b.date);
  //first element is earliest date
  const name = packageList[0].packageName;

  return name;
}

module.exports = oldestPackageName;
