'use strict';

const axios = require('axios');

const utils = require('../SharedCode/utils');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const cid = utils.getProperty(req, 'cid');

    if (cid) {
        let response = await axios.get(utils.generateECNLUrl({
            ds: 'OrgClubComplexes',
            cid: cid
        }));

        if (response.status === 200) {
            context.log(`Successfully retrieved data for complexes for the club "${cid}"`);

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
            body: 'Please pass a club identifier (cid) on the query string or in the request body.'
        };
    }
};
