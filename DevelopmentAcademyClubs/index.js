'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

const ClubExtractor = require('./club').ClubExtractor;

const allClubsURL = 'http://www.ussoccerda.com/all-clubs';


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    console.log('Retrieving clubs ...');

    let response = await axios.get(allClubsURL);

    if (response.status === 200) {
        let $ = cheerio.load(response.data);

        cheerioTableparser($);
        let data = $("table#club_directory_list").parsetable(true, true, true);
        let clubs = [];

        for(let i = 2 ; i < data[1].length ; i++) {
            clubs.push(ClubExtractor.getClub(data, i));
        } // end for

        context.res = {
            status: 200,
            body: { count: clubs.length, data: clubs }
        };
    } else {
        context.res = {
            status: 500,
            body: `The response status code was ${response.status}!`
        };
    }
};
