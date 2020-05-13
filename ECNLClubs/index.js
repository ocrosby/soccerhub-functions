const axios = require('axios');

const memberClubsURL = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9&ds=GetOrgClublistBySeasonIDPagingSP&oid=9&orgsid=12';

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    console.log('Retrieving clubs ...');

    let response = await axios.get(memberClubsURL);

    if (response.status === 200) {
        context.res = {
            status: 200,
            body: {
                count: response.data.length,
                data: response.data
            }
        }
    } else {
        context.res = {
            status: 500,
            body: `The response status code was ${response.status}!`
        };
    }
};
