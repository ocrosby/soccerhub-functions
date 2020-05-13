const axios = require('axios');

const utils = require('../SharedCode/utils');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const teamId = utils.getProperty(req, 'tid');

    context.log(`Requesting details for team ${teamId} ...`);

    if (teamId) {
        let response = await axios.get(`https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9&ds=OrgTeamDetails&oid=9&osid=16&tid=${teamId}`);

        if (response.status === 200) {
            context.log(`Successfully retrieved details for "${response.data[0].Name}".`);

            context.res = {
                body: response.data[0]
            };
        } else {
            context.res = {
                status: 500,
                body: `The response status code was ${response.status}!`
            };
        }
    } else {
        context.res = {
            status: 400,
            body: "Please pass a team identifier (tid) on the query string or in the request body."
        };
    }
};
