const {  tables  } = require('../../src/data');
const { withServer , login} = require('../supertest.setup');

const data = {
    departments: [{
        id : '7f28c5f9-d711-4cd6-ac15-d13d71abff50',
        name : 'Algemene heelkunde',
        location : 'straat 57',
        hospital : 'AZ Sint-Lucas Gent',
      },
      {
        id : '7f28c5f9-d711-4cd6-ac15-d13d71abff54',
        name : 'Anatomo-pathologie',
        location : 'straat 39',
        hospital : 'AZ Sint-Lucas Gent'
      },
      {
        id : '7f28c5f9-d711-4cd6-ac15-d13d71abff52',
        name : 'Anesthesie en reanimatie',
        location : '/',
        hospital : 'AZ Sint-Lucas Gent',
      },
      {
        id : '7f28c5f9-d711-4cd6-ac15-d13d71abff53',
        name : 'Medisch centrum',
        location : 'Lostraat 28',
        hospital : 'Medisch Centrum Aalter'
      }]
  };

  const dataToDelete = {
	departments: [
		'7f28c5f9-d711-4cd6-ac15-d13d71abff50',
		'7f28c5f9-d711-4cd6-ac15-d13d71abff54',
		'7f28c5f9-d711-4cd6-ac15-d13d71abff52',
        '7f28c5f9-d711-4cd6-ac15-d13d71abff53',
	]
}

describe('Departments', ()=>{
	let request;
	let knex;
    let loginHeader;

    withServer(({ knex: k, supertest:s }) => {
        knex = k;
        request = s;
      });

	beforeAll(async () => {
		loginHeader = await login(request);
	});

	const url = '/api/departments';

    describe('GET /api/departments', () => {
        beforeAll(async () => {
            await knex(tables.department).insert(data.departments);
        });

        afterAll(async () => {
            await knex(tables.department)
                .whereIn('id',dataToDelete.departments)
                .delete();
        });

        test('it should 200 and return all departments', async () => {
            const response = await request.get(url)
            expect(response.status).toBe(200);
            expect(response.body.limit).toBe(100);
            expect(response.body.offset).toBe(0);
            expect(response.body.data.length).toBe(4);
        });
});

describe('GET /api/departments/:id', () => {

    beforeAll(async () => {
        await knex(tables.department).insert(data.departments);
    });

    afterAll(async () => {
        await knex(tables.department)
            .where('id', dataToDelete.departments[0])
            .delete();
    });

    test('it should 200 and return the requested department', async () => {
        const departmentId = data.departments[0].id;
        const response = await request.get(`${url}/${departmentId}`)

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id : '7f28c5f9-d711-4cd6-ac15-d13d71abff50',
            name : 'Algemene heelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
        });
    });
});

describe('POST /api/departments', () => {
    const departmentsToDelete = [];

    afterAll(async () => {
        await knex(tables.department)
            .whereIn('id', departmentsToDelete)
            .delete();
    });

    test('it should 201 and return the created transaction', async () => {
        const response = await request.post(url).set('Authorization', loginHeader)
            .send({
                name: 'Tandarts',
                location: 'Straat 100',
                hospital: 'Test ziekenhuis'
            });
        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.name).toBe('Tandarts');
        expect(response.body.location).toBe('Straat 100');
        expect(response.body.hospital).toBe('Test ziekenhuis');

        departmentsToDelete.push(response.body.id);
    });   
});

describe('PUT /api/departments/:id', () => {
    beforeAll(async () => {
        await knex(tables.department).insert([{
            id: '7f28c5f9-d711-4cd6-ac15-d13d71abff50',
            name : 'Algemene heelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
        }]);
    });

    afterAll(async () => {
        await knex(tables.department)
            .where('id', '7f28c5f9-d711-4cd6-ac15-d13d71abff50')
            .delete();
    });

    test('!t should 200 and return the updated department', async () => {
        const response = await request.put(`${url}/7f28c5f9-d711-4cd6-ac15-d13d71abff50`).set('Authorization', loginHeader)
            .send({
                name: 'heelkunde',
                location : 'straat',
                hospital: 'AZ Gent'
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBeTruthy();
        expect(response.body.name).toBe('heelkunde');
        expect(response.body.location).toBe('straat');
        expect(response.body.hospital).toBe('AZ Gent');
    });
});

describe('DELETE /api/department/:id',() => {
    beforeAll(async () => {
        await knex(tables.department).insert([{
            id: '7f28c5f9-d711-4cd6-ac15-d13d71abff50',
            name : 'Algemene heelkunde',
            location : 'straat 57',
            hospital : 'AZ Sint-Lucas Gent'
        }]);
    });

    test('it should 204 and return nothing', async () => {
        const response = await request.delete(`${url}/7f28c5f9-d711-4cd6-ac15-d13d71abff50`).set('Authorization', loginHeader);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
        
    });
});
	
});