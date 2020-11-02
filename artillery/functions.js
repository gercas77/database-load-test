'use strict';

module.exports = {
    makeNameForQuery,
    makeSalariesForQuery,
    makeDataForNewUser
};

function createString() {
    var result           = '';
    var characters       = 'ABCDEFGHIJ KLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeNameForQuery(userContext, events, done) {
    userContext.vars.nameForQuery = createString();
    return done();
}

function makeSalariesForQuery(userContext, events, done) {
    var from = Math.floor(Math.random() * 10000);
    userContext.vars.from = from;
    userContext.vars.to = from + Math.floor(Math.random() * 5000);
    return done();
}

function makeDataForNewUser(userContext, events, done) {
    userContext.vars.newUserName = createString();
    userContext.vars.newUserAge = Math.floor(Math.random() * 70);
    userContext.vars.newUserSalary = Math.floor(Math.random() * 20000);
    return done();
}
