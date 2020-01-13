const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const api = require('../index')

chai.use(chaiHttp)

describe('users', () => {
	it('should sign up and get token, decipher token, delete user afterwards', done => {
		chai
			.request(api)
			.post('/signup')
			.send({
				firstName: 'testUser',
				lastName: 'User',
				residenceCountry: 'Test',
				email: 'testUser@User.com',
				password: 'testUser',
				avatar: 'testUser.jpg'
			})
			.end((err, res) => {
				res.body.should.have.property('token')
				let token = res.body.token
				chai
					.request(api)
					.get('/auth')
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.body.should.have.property('_id')
						let id = res.body._id
						chai
							.request(api)
							.delete(`/users/${id}`)
							.end((err, res) => {
								res.body.should.not.have.property(`${id}`)
								done()
							})
					})
			})
	})
	it('should NOT sign up', done => {
		chai
			.request(api)
			.post('/signup')
			.send({
				firstName: 'testUser2',
				lastName: 'User2',
				residenceCountry: 'Test',
				password: 'testUser',
				avatar: 'testUser.jpg'
			})
			.end((err, res) => {
				res.body.should.not.have.property('_id')
				done()
			})
	})
	it('should login and get token', done => {
		chai
			.request(api)
			.post('/login')
			.send({
				email: 'test@test.com',
				password: 'test'
			})
			.end((err, res) => {
				res.body.should.have.property('token')
				done()
			})
	})
	it('should NOT login', done => {
		chai
			.request(api)
			.post('/login')
			.send({
				email: 'testUser@User.com',
				password: 'testUser'
			})
			.end((err, res) => {
				res.body.should.not.have.property('token')
				done()
			})
	})
	it('patch user', done => {
		chai
			.request(api)
			.post('/login')
			.send({
				email: 'test@test.com',
				password: 'test'
			})
			.end((err, res) => {
				res.body.should.have.property('token')
				let token = res.body.token
				chai
					.request(api)
					.get('/auth')
					.set('Authorization', `Bearer ${token}`)
					.end((err, res) => {
						res.body.should.have.property('_id')
						let id = res.body._id
						chai
							.request(api)
							.patch(`/users/${id}`)
							.send({
								firstName: 'patchedUser'
							})
							.end((err, res) => {
								res.body.should.have.property('_id')
								done()
							})
					})
			})
	})
})
