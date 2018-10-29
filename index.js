'use strict';
const feed = require('./feed.js');

/**
 * Handle API calls.  The "action" 
 */
exports.handler = (event, context, callback) => {
    try {
        console.log(JSON.stringify(event, null, 4));
        const response = {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(getFeedItem())
        };
        callback(null, response);
    } catch (err) {
        callback(err);
    }
};

function getFeedItem() {
    const feedText = `There are ${getNumDaysLeftUntilChristmas()} days before Christmas.`;
    var isoDate = new Date().toISOString();
    const feedObj = {
        "uid": `urn:uuid:${uuidv4()}`,
        "updateDate": `${isoDate}`,
        "titleText": "Daily Christmas Guide Flash Briefing",
        "mainText": feedText
    }
    return feedObj;
}

function getNumDaysLeftUntilChristmas() {
    const today = new Date();
    const cmas = new Date(today.getFullYear(), 11, 25);
    if (today.getMonth()==11 && today.getDate()>25) {
        cmas.setFullYear(cmas.getFullYear()+1); 
    }  
    const one_day=1000*60*60*24;
    const numDaysLeft = Math.ceil((cmas.getTime()-today.getTime())/(one_day));
    return numDaysLeft;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}