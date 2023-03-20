const test = require('ava');
const sinon = require('sinon');
const axios = require('axios');
const app = require('../app');

test('should call the API and return data', async t => {
  const apiData = { data: 'example data' };
  const axiosStub = sinon.stub(axios, 'get').resolves(apiData);
  const response = await app.inject({ method: 'GET', url: '/api' });
  t.is(response.statusCode, 200);
  t.deepEqual(response.json(), apiData);
  sinon.assert.calledWith(axiosStub, 'https://api.example.com/data');
  axios.get.restore();
});
