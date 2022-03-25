const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;
let movieId;

describe('######## MOVIE TESTS ########', () => {
  before((done) => {
    chai.request(server)
      .post('/authenticate')
      .send({ username: 'test', password: '123456' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('**** MOVIE LIST ****', () => {
    it('It should GET all the movies', (done) => {
      chai.request(server)
        .get('/api/movies')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('**** MOVIE CREATE ****', () => {
    it('It should POST a movie', (done) => {
      const movie = {
        title: 'Test Movie',
        director_id: '5c431e954e0fd01974422e22',
        category: 'Horror',
        country: 'Türkiye',
        year: 1999,
        imdb_score: 8
      };
      chai.request(server)
        .post('/api/movies')
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          movieId = res.body._id;
          done();
        });
    });
  });

  describe('**** GET A MOVIE ****', () => {
    it('It should GET a movie by the give id', (done) => {
      chai.request(server)
        .get(`/api/movies/${movieId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          res.body.should.have.property('_id').eql(movieId);
          done();
        });
    });
  });

  describe('**** UPDATE MOVIE ****', () => {
    it('It should UPDATE a movie by given id', (done) => {
      const movie = {
        title: 'Updated Movie',
        director_id: '5c431e954e0fd01974422e21',
        category: 'Crime',
        country: 'Osmanlı',
        year: 1976,
        imdb_score: 9
      };
      chai.request(server)
        .put(`/api/movies/${movieId}`)
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('director_id').eql(movie.director_id);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('year').eql(movie.year);
          res.body.should.have.property('imdb_score').eql(movie.imdb_score);
          done();
        });
    });
  });

  describe('**** DELETE MOVIE ****', () => {
    it('It should DELETE a movie by given id', (done) => {
      chai.request(server)
        .delete(`/api/movies/${movieId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(1);
          done();
        });
    });
  });
});

