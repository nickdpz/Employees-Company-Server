// process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const server = require('../../server/config');
const conn = require('../../database');

chai.use(chaiHttp);
const request = chai.request.agent(server);

describe('USER After login', () => {
    let user_id = '0';

    before(done => {
        conn.connect()
            .then(() => done())
            .catch(err => done(err));
    });

    after(done => {
        conn.close()
            .then(() => done())
            .catch(err => done(err));
    });

    // it('Register new user', done => {
    //     request
    //         .post('/users/')
    //         .send({...userData.modelUserSignUp[0] })
    //         .then(({ body }) => {
    //             user_id = body.message._doc._id;
    //             expect(body.message._doc.userName).to.equal(userData.modelUserSignUp[0].userName);
    //             expect(body.message._doc.name).to.equal(userData.modelUserSignUp[0].name);
    //             expect(body.message._doc.lastName).to.equal(userData.modelUserSignUp[0].lastName);
    //             expect(body.message._doc.email).to.equal(userData.modelUserSignUp[0].email);
    //             done();
    //         })
    //         .catch(err => done(err));
    // });

    it('Login', done => {
        request
            .post('/auth/sign-in/')
            .send({ email: 'ndpastranzamora@gmail.com', password: '1234' })
            .then(response => {
                const { body, status } = response;
                expect(status).to.equal(401);
                done();
            })
            .catch(err => done(err));

    });


    // it('Get users', done => {

    //     request
    //         .get('/users/')
    //         .then(({ body }) => {
    //             expect(body.message.length).to.not.equal(0);
    //             expect(body.message[0]._id).to.not.equal(undefined);
    //             done();
    //         })
    //         .catch(err => done(err));

    // });

    // it('get correct id user', done => {

    //     request
    //         .get(`/users/${user_id}`)
    //         .then(({ body }) => {
    //             expect(body.message.userName).to.equal(userData.modelUserSignUp[0].userName);
    //             expect(body.message.name).to.equal(userData.modelUserSignUp[0].name);
    //             expect(body.message.lastName).to.equal(userData.modelUserSignUp[0].lastName);
    //             expect(body.message.email).to.equal(userData.modelUserSignUp[0].email);
    //             done();
    //         })
    //         .catch(err => done(err));

    // });

    // it('get wrong id user', done => {
    //     request
    //         .get(`/users/${user_id}0`)
    //         .then(({ body }) => {
    //             expect(body.error).to.not.equal('');
    //             done();
    //         })
    //         .catch(err => done(err));
    // });

    // it('update user with session', done => {

    //     request
    //         .patch('/users/')
    //         .send({
    //             email: 'newemail@gmail.com',
    //             phone: '3203567767'
    //         })
    //         .then(({ body }) => {
    //             expect(body.message).to.equal('Actualizo Usuario');
    //             done();
    //         })
    //         .catch(err => done(err));

    // });

    // it('update user with id', done => {

    //     request
    //         .patch('/users/')
    //         .send({
    //             _id: user_id,
    //             email: 'email@gmail.com',
    //             phone: '3217452738'
    //         })
    //         .then(({ body }) => {
    //             expect(body.message).to.equal('Actualizo Usuario');
    //             done();
    //         })
    //         .catch(err => done(err));

    // });

    // it('delete user with id', done => {

    //     request
    //         .post('/users/')
    //         .send({...userData.modelUserSignUp[1] })
    //         .then(({ body }) => {
    //             request
    //                 .delete('/users/delete')
    //                 .send({
    //                     _id: body.message._doc._id,
    //                     role: body.message._doc.role,
    //                 })
    //                 .then(({ body }) => {
    //                     expect(body.message).to.not.equal('');
    //                     expect(body.error).to.equal('');

    //                     done();
    //                 })
    //                 .catch(err => done(err));
    //         })
    //         .catch(err => done(err));

    // });

    // it('delete user with cookie', done => {

    //     request
    //         .delete('/users/')
    //         .then(({ body }) => {
    //             expect(body.message).to.not.equal('');
    //             expect(body.error).to.equal('');

    //             done();
    //         })
    //         .catch(err => done(err));

    // });
});