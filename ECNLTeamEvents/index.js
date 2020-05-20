'use strict';

const axios = require('axios');

const utils = require('../SharedCode/utils');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const tid = utils.getProperty(req, 'tid');

    if (tid) {
        let response = await axios.get(utils.generateECNLUrl({
            ds: 'OrgTeamEvents',
            oid: 9,
            osid: 16,
            tid: tid
        }));

        if (response.status === 200) {
            context.log(`Successfully retrieved events for team "${tid}"`);

            context.res = {
                body: response.data
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
            body: 'Please pass a team identifier (tid) on the query string or in the request body.'
        };
    }
};
