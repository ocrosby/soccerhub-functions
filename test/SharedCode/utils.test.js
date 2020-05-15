'use strict';

const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

chai.should();

const expect = chai.expect;

const utils = require('../../SharedCode/utils');

describe('utils', () => {
    describe('propertyExistsInQuery', () => {
        it('should return false when given nothing', () => {
            expect(utils.propertyExistsInQuery()).to.be.false;
        });

        it('should return false when given a null request', () => {
            expect(utils.propertyExistsInQuery(null, 'something')).to.be.false;
        });

        it('should return false when given an undefined request', () => {
            expect(utils.propertyExistsInQuery(undefined, 'something')).to.be.false;
        });

        it('should return false when there is no query', () => {
            expect(utils.propertyExistsInQuery({}, 'something')).to.be.false;
        });

        it('should return false when the query is null', () => {
            expect(utils.propertyExistsInQuery({ query: null }, 'something')).to.be.false;
        });

        it('should return false when the query is undefined', () => {
            expect(utils.propertyExistsInQuery({ query: undefined }, 'something')).to.be.false;
        });

        it('should return false when the query does not have the specified property', () => {
            expect(utils.propertyExistsInQuery({ query: {} }, 'something')).to.be.false;
        });

        it('should return true when the query has the specified property', () => {
            expect(utils.propertyExistsInQuery({ query: { something: null } }, 'something')).to.be.true;
        });
    });

    describe('propertyExistsInBody', () => {
        it('should return false when given nothing', () => {
            expect(utils.propertyExistsInBody()).to.be.false;
        });

        it('should return false when given a null request', () => {
            expect(utils.propertyExistsInBody(null, 'something')).to.be.false;
        });

        it('should return false when given an undefined request', () => {
            expect(utils.propertyExistsInBody(undefined, 'something')).to.be.false;
        });

        it('should return false when there is no body', () => {
            expect(utils.propertyExistsInBody({}, 'something')).to.be.false;
        });

        it('should return false when the body is null', () => {
            expect(utils.propertyExistsInBody({ body: null }, 'something')).to.be.false;
        });

        it('should return false when the body is undefined', () => {
            expect(utils.propertyExistsInBody({ body: undefined }, 'something')).to.be.false;
        });

        it('should return false when the body does not have the specified property', () => {
            expect(utils.propertyExistsInBody({ body: {} }, 'something')).to.be.false;
        });

        it('should return true when the body has the specified property', () => {
            expect(utils.propertyExistsInBody({ body: { something: null } }, 'something')).to.be.true;
        });
    });

    describe('getPropertyFromQuery', () => {
        it('should return undefined when given nothing', () => {
            expect(utils.getPropertyFromQuery()).to.be.undefined;
        });

        it('should return the value of a property on the query', () => {
            expect(utils.getPropertyFromQuery({ query: { name: 'something' } }, 'name')).to.equal('something');
        });
    });

    describe('getPropertyFromBody', () => {
        it('should return undefined when given nothing', () => {
            expect(utils.getPropertyFromBody()).to.be.undefined;
        });

        it('should return the value of a property on the body', () => {
            expect(utils.getPropertyFromBody({ body: { name: 'something' } }, 'name')).to.equal('something');
        });
    });

    describe('getProperty', () => {
        it('should return undefined when given nothing', () => {
            expect(utils.getProperty()).to.be.undefined;
        });

        it('should return the value of a property on the body', () => {
            expect(utils.getProperty({ body: { name: 'something' } }, 'name')).to.equal('something');
        });

        it('should return the value of a property on the query', () => {
            expect(utils.getProperty({ query: { name: 'something' } }, 'name')).to.equal('something');
        });
    });


    describe('generateECNLUrl', () => {
        it('should generate the expected URL when given nothing', () => {
            const actual = utils.generateECNLUrl();
            const expected = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9';

            expect(actual).to.equal(expected);
        });

        it('should generate the expected URL when given null', () => {
            const actual = utils.generateECNLUrl(null);
            const expected = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9';

            expect(actual).to.equal(expected);
        });

        it('should generate the expected URL when given undefined', () => {
            const actual = utils.generateECNLUrl(undefined);
            const expected = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9';

            expect(actual).to.equal(expected);
        });

        it('should be able to append a parameter', () => {
            const expected = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9&name1=value1';
            const actual = utils.generateECNLUrl({
                name1: 'value1'
            });

            expect(actual).to.equal(expected);
        });

        it('should be able to append multiple parameters', () => {
            const expected = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9&name1=value1&name2=value2';
            const actual = utils.generateECNLUrl({
                name1: 'value1',
                name2: 'value2'
            });

            expect(actual).to.equal(expected);
        });

        it('should list parameters in alphabetic order', () => {
            const expected = 'https://api.totalglobalsports.com/json/?token=Q0jcEIroy7Y=|9&name1=value1&name2=value2';
            const actual = utils.generateECNLUrl({
                name2: 'value2',
                name1: 'value1'
            });

            expect(actual).to.equal(expected);
        });
    });
});
