const express = require('express'); //eslint-disable-line
const users = require('../components/users/network');
const companies = require('../components/companies/network');
const auth = require('../components/auth/network');

const paths = (server) => {
    server.use('/users', users); //Web users
    server.use('/companies', companies); //Web users
    server.use('/auth', auth); //authentication
};

module.exports = paths;