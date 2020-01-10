const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const api = require('../index')

chai.use(chaiHttp)

describe('spots', () => {
	it('should get an array of spots', done => {
		chai
			.request(api)
			.get('/spots')
			.end((err, res) => {
				res.body.should.be.a('array')
				done()
			})
	})
	it('should get at least 1 spot', done => {
		chai
			.request(api)
			.get('/spots')
			.end((err, res) => {
				res.body.should.have.lengthOf.above(0)
				done()
			})
	})
	it('should return an array of documents', done => {
		chai
			.request(api)
			.get('/spots')
			.end((err, res) => {
				res.body.forEach(spot => {
					spot.should.have.property('_id')
				})
				done()
			})
	})
	it('should filter spots city', done => {
		chai
			.request(api)
			.get('/spots?city=Lamai')
			.end((err, res) => {
				res.body.forEach(spot => {
					spot.title.should.equal(Lamai)
				})
				done()
			})
	})
	it('should filter lng', done => {
		chai
			.request(api)
			.get('/spots?lng=22')
			.end((err, res) => {
				res.body.forEach(spot => {
					spot.lng.should.equal(22)
				})
				done()
			})
	})
	it('should create spot and delete it afterwards', done => {
		chai
			.request(api)
			.post('/spots')
			.send({
				images: 'image.jpg',
				title: 'testfromtest',
				spotters: '5de38d84392a0925a9053f3a',
				description: 'description for test',
				types: '5ddf9709397b993ae31c4367',
				toggleEatins: false,
				toggleTakeaways: false,
				city: 'ktown',
				country: 'USA',
				lng: 444,
				lat: 444
			})
			.end((err, res) => {
				res.body.spot.should.have.property('_id')
				let id = res.body.spot._id
				chai
					.request(api)
					.delete(`/spots/${id}`)
					.end((err, res) => {
						res.body.should.not.have.property(`${id}`)
						done()
					})
			})
	})
	it('should not create spot', done => {
		chai
			.request(api)
			.post('/spots')
			.send({
				images: 'image.jpg',
				title: 'test2',
				spotters: '5de38d84392a0925a9053f3a',
				description: 'description for test',
				types: '5ddf9709397b993ae31c4367'
			})
			.end((err, res) => {
				res.body.should.not.have.property('_id')
				done()
			})
	})
})

describe('auth', () => {
	it('should sign up and get token', done => {
		chai
			.request(api)
			.post('/signup')
			.send({
				firstName: 'testUser',
				lastName: 'User',
				residenceCountry: 'Test',
				email: 'testUser2@User.com',
				password: 'testUser',
				avatar: 'testUser.jpg'
			})
			.end((err, res) => {
				res.body.should.have.property('token')
				done()
			})
	})
	it('should delete user', done => {
		chai
			.request(api)
			.delete('/users/5e186060866cee1406d09666')
			.end((err, res) => {
				res.body.should.not.have.property('_id')
				done()
			})
	})
	it('should decipher token', done => {
		chai
			.request(api)
			.get('/auth')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE4NjBiOWFjYzQ4YzE0MTJiY2I0ZDEiLCJlbWFpbCI6InRlc3RVc2VyMUBVc2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHZVTmpVWG14MExDaXhYazZ5YlhPemV2RDBNOC5iQTQxc1lvU2pHT0FjeDNJcmdsN2pyRmIyIiwiaWF0IjoxNTc4NjU2MTg0fQ.hGRCn6BNgmf1S8n_F1ib__dt3XorNNM023pcj8K-oEc'
			)
			.end((err, res) => {
				res.body.should.have.property('_id')
				done()
			})
	})
})
