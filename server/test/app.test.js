const supertest = require('supertest')
const app = require('../src/app.js')

const request = supertest(app)

it('Should return return 404 vendor not found', async done => {
    request
    .get('/cablemodems')
    .query({vendor: 'Pep'})
    .set('Accept', 'application/json')
    .expect(404)
    .then(response => {
        expect(response.body.message).toEqual('Vendor not found')
        done()
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})

it('Should return return 422 error', async done => {
    request
    .get('/cablemodems')
    .set('Accept', 'application/json')
    .expect(422)
    .then(response => {
        expect(response.body.errors[0].param).toEqual('vendor')
        done()
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})

it('Should return return 200 OK', async done => {
    request
    .get('/cablemodems')
    .query({vendor: 'Motorola Corporation'})
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
        console.log(response.body);
        expect(response.body.message).toEqual('OK');
        done();
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})

// it('Should return return 201 Created', async done => {
//     request
//     .get('/cablemodems')
//     .query({vendor: 'Motorola Corporation', name: 'ASD', soft: 'v1'})
//     .set('Accept', 'application/json')
//     .expect(201)
//     .then(response => {
//         console.log(response.body);
//         expect(response.body.message).toEqual('OK');
//         done();
//     })
//     .catch(err => { 
//         console.error(err);
//         done(err); 
//     })
// })

it('Should return return 201 Created', async done => {
    request
    .post('/cablemodems')
    .send({vendor: 'Arris', name: 'DG860P2', soft: 'v1'})
    .set('Accept', 'application/json')
    .expect(409)
    .then(response => {
        console.log(response.body);
        expect(response.body.message).toEqual('Cablemodem model already exist');
        done();
    })
    .catch(err => { 
        console.error(err);
        done(err); 
    })
})