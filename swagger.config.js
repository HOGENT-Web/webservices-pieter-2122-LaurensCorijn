module.exports = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API with Swagger',
			version: '0.1.0',
			description:
				'This is a simple CRUD API application made with Koa and documented with Swagger',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			contact: {
				name: 'API',
				url: 'https://hogent.be',
				email: 'laurens.corijn.y7373@student.hogent.be',
			},
		},
		servers: [{
			url: 'http://localhost:9000/',
		}],
        components:
            {
                securitySchemes: {
                    bearerAuth:{
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            }
	},
	apis: ['./src/rest/*.js'],
};