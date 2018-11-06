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

Date.prototype.subtractHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
}

function getFeedItem() {
    const feedText = `There are ${getNumDaysLeftUntilChristmas()} days before Christmas.`;
    //var isoDate = new Date().toISOString();
    const d = new Date().subtractHours(4);
    const monthNumber = d.getMonth() + 1;
    let dateNumber = d.getDate();
    if (dateNumber < 10) {dateNumber = '0' + dateNumber};
    const monthDateKey = `${monthNumber}${dateNumber}`;
    console.log(monthDateKey);
    const utc_timestamp = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 1, 0, 0, 0);
    const utcDate = new Date(utc_timestamp).toISOString();
    const feedObj = {
        "uid": feed[monthDateKey][`uid`],
        "updateDate": `${utcDate}`,
        "titleText": `Daily Christmas Guide Flash Briefing`,
        "mainText": `${feed[monthDateKey][`mainText`]} This completes your Daily Christmas Guide update.`
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