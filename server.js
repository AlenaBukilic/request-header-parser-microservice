'use strict';

const Hapi = require('hapi');
const requestIp = require('request-ip');

const server = Hapi.server({
    port: 3000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        // const clientIp = requestIp.getClientIp(request);
        const os = request.headers['user-agent'].split(') ')[0].split(' (')[1];
        const lang = request.headers['accept-language'].split(';')[0].split(',')[0];
        const ip = request.headers['x-forwarded-for'] || request.info.remoteAddress;
        
        return {
            ipaddress: ip,
            language: lang,
            software: os
        };
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();