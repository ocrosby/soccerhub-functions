'use strict';

const axios = require('axios');

const utils = require('../SharedCode/utils');

function populateResponse(context, body, status=null) {
    context.res = {};

    if (status) {
        context.res.status = status;
    }

    context.res.body = body;
}

function checkInputs(context, did, eid, fid) {
    if (!did) {
        populateResponse(context, 'Please pass a did on the query string or in the request body.', 400);
        return false;
    }

    if (!eid) {
        populateResponse(context, 'Please pass an eid on the query string or in the request body.', 400);
        return false;
    }

    if (!fid) {
        populateResponse(context, 'Please pass an fid on the query string or in the request body.', 400);
        return false;
    }

    return true;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const did = utils.getProperty(req, 'did');
    const eid = utils.getProperty(req, 'eid');
    const fid = utils.getProperty(req, 'fid');

    if (checkInputs(context, did, eid, fid)) {
        let response = await axios.get(utils.generateECNLUrl({
            ds: 'OrgConferenceStandings',
            oid: 9,
            osid: 16,
            eid: eid,
            did: did,
            fid: fid
        }));

        if (response.status === 200) {
            context.log('Successfully retrieved conference standings.');
            populateResponse(context, response.data);
        } else {
            populateResponse(context, `The response status code was ${response.status}!`, 500);
        }
    }
};
