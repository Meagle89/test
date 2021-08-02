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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
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

async function organiseMaintainers() {
  // TODO
  //initialise array
  let maintainersList = [];
  //Get content
  const content = await get();
  //loop through packages
  content.forEach(pack => {
    //loop through maintainers
    const { maintainers } = pack.package;
    maintainers.forEach(({ username }) => {
      //push username into maintainers array if does not already exist
      if (
        maintainersList.find(user => user.username === username) === undefined
      ) {
        const maintainerObj = { username: username, packageNames: [] };
        maintainersList.push(maintainerObj);
      }
    });
    //Sort the Array
    maintainersList.sort((a, b) => a.username.localeCompare(b.username));
  });
  //Loop over maintainers
  maintainersList.forEach(({ username, packageNames }) => {
    //Loop over each package again
    content.forEach(pack => {
      const { name, maintainers } = pack.package;
      //Loop over maintainers in each package
      maintainers.forEach(maintainer => {
        //if the username is present in the maintainer list for a package
        if (username === maintainer.username) {
          //push the package name into the package array for each user
          packageNames.push(name);
        }
      });
    });
    //sort the packages into alphabetical order
    packageNames.sort((a, b) => a.localeCompare(b));
  });
  return maintainersList;
}

module.exports = organiseMaintainers;
