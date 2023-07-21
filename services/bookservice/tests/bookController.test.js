const { expect } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const proxyquire = require('proxyquire').noCallThru();
const app = require('../app');
const controller = require('../controllers/bookController')

const request = supertest(app);

describe('Get All Book Scenarios', function () {
  describe('getAllBooks', () => {
    it('Should Return All the Books in the DB', async function () {
    });
    it('Should Return a 500 Error if the db is not usable', async function () {
    });
  });
});
