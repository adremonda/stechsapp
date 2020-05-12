const supertest = require('supertest')
const app = require('../src/app.js')

const request = supertest(app)

it('Should return return 404 vendor not found', async done => {
    request
    .post('/models/verify')
    .send({vendor: 'Pep', models:[]})
    .set('Accept', 'application/json')
    .expect(404)
    .then(response => {
        expect(response.body.message).toEqual('vendor not found')
        done()
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})

it('Should return return 422 error', async done => {
    request
    .post('/models/verify')
    .send({vendor: 'Moto'})
    .set('Accept', 'application/json')
    .expect(422)
    .then(response => {
        expect(response.body.errors[0].param).toEqual('models')
        done()
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})

it('Should return return 200 OK', async done => {
    request
    .post('/models/verify')
    .send({vendor: 'Moto', models:[]})
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
        expect(response.body.message).toEqual('OK')
        done()
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})