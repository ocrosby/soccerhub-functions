'use strict';

const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

chai.should();

const expect = chai.expect;

const httpFunction = require('../../ECNLTeamLastFiveGamesForEvents/index');
const context = require('../defaultContext');

describe('ECNLTeamLastFiveGamesForEvents', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('behaves as expected when the request is successful', async () => {
        context.log = sandbox.fake();
        const data = {};

        sandbox.stub(axios, 'get').resolves(Promise.resolve({
            status: 200,
            data: data
        }));

        await httpFunction(context, {
            query: { tid: 13 }
        });

        expect(context.log.calledWith('JavaScript HTTP trigger function processed a request.')).to.be.true;
        expect(context.log.calledWith('Successfully retrieved data for the last file games for team "13"')).to.be.true;
        expect(context.res.body).to.equal(data);
    });

    it('behaves as expected when the request returns other than 200 status', async () => {
        context.log = sandbox.fake();

        sandbox.stub(axios, 'get').resolves(Promise.resolve({
            status: 500
        }));

        await httpFunction(context, {
            query: { tid: 13 }
        });

        expect(context.log.calledWith('JavaScript HTTP trigger function processed a request.')).to.be.true;
        expect(context.res.status).to.equal(500);
        expect(context.res.body).to.equal('The response status code was 500!');
    });

    it('behaves as expected without a team identifier', async () => {
        context.log = sandbox.fake();

        sandbox.stub(axios, 'get').resolves(Promise.resolve({
            status: 500
        }));

        await httpFunction(context, {});

        expect(context.log.calledWith('JavaScript HTTP trigger function processed a request.')).to.be.true;
        expect(context.res.status).to.equal(400);
        expect(context.res.body).to.equal('Please pass a team identifier (tid) on the query string or in the request body.');
    });
});
