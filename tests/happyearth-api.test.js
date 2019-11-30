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
			.end((error, result) => {
				result.body.should.be.a('array')
			})
		done()
	})
	it('should get at least 1 spot', done => {
		chai
			.request(api)
			.get('/spots')
			.end((error, result) => {
				result.body.should.have.lengthOf.above(0)
			})
		done()
	})
	it('should return an array of documents', done => {
		chai
			.request(api)
			.get('/spots')
			.end((error, result) => {
				result.body.forEach(spot => {
					spot.should.have.property('_id')
				})
			})
		done()
	})
	it('should filter spots city', done => {
		chai
			.request(api)
			.get('/spots?city=Lamai')
			.end((error, result) => {
				result.body.forEach(spot => {
					spot.title.should.equal(Lamai)
				})
			})
		done()
	})
	it('should filter lng', done => {
		chai
			.request(api)
			.get('/spots?lng=22')
			.end((error, result) => {
				result.body.forEach(spot => {
					spot.lng.should.equal(22)
				})
			})
		done()
	})
	// it('should create spot', done => {
	// 	chai
	// 		.request(api)
	// 		.post('/spots')
	// 		.send({
	// 			images: 'image.jpg',
	// 			title: 'testfromtest',
	// 			description: 'description for test',
	// 			city: 'ktown',
	// 			country: 'USA',
	// 			lng: 444,
	// 			lat: 444
	// 		})
	// 		.end((error, result) => {
	// 			result.body.should.have.property('_id')
	// 		})
	// 	done()
	// })
})

// describe('auth', () => {
// 	it('should sign up and get token', done => {
// 		chai
// 			.request(api)
// 			.post('/signup')
// 			.send({
// 				firstName: 'testofauth'
// 			})
// 			.end((error, result) => {
// 				console.log('>>>>> error', { error })
// 				console.log('result>>>>', { result })
// 				result.body.should.have.property('token')
// 				console.log('body', res.body)
// 			})
// 		done()
// 	})
// })
