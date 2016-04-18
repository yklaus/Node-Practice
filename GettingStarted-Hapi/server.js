'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        reply('Hello, World!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(req, reply) {
        reply('Hello, ' + encodeURIComponent(req.params.name) + '!');
    }
});

server.start((err) => {
    
    if (err) {
        throw err;
    }
    
    console.log('Server running at:', server.info.uri);
    
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
});