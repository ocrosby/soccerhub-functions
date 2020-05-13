const axios = require('axios');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let response = await axios.get('https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9&ds=OrgClubList&oid=9&osid=16');

    if (response.status === 200) {
        context.log(`Successfully retrieved details for ${response.data.length} clubs.`);

        context.res = {
            body: response.data
        };
    } else {
        context.res = {
            status: 500,
            body: `The response status code was ${response.status}!`
        };
    }
};
