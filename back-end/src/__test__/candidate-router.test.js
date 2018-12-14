'use strict';

import faker from 'faker';
import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createCandidateMock, removeCandidateMock } from './lib/candidate-mock';

const apiURL = `http://localhost:${process.env.PORT}/api/candidates`;

describe('/api/candidates', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeCandidateMock);

  describe('POST api/candidates', () => {
    test('200', () => {
      const mockContinent = {
        name: faker.lorem.word(2),
        acceptance: faker.lorem.words(20),
      };
      return superagent.post(apiURL)
        .send(mockContinent)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(mockContinent.name);
          expect(response.body.acceptance).toEqual(mockContinent.acceptance);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();
        });
    });

    test('409 due to duplicate name', () => {
      return createCandidateMock()
        .then((candidate) => {
          const mockCandidate = {
            name: candidate.name,
            acceptance: candidate.acceptance,
          };
          return superagent.post(apiURL)
            .send(mockCandidate);
        })
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(409);
        });
    });

    test('400 due to lack of name', () => {
      return superagent.post(apiURL)
        .send({})
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });

    test('400 due to bad json', () => {
      return superagent.post(apiURL)
        .send('{')
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });
  
  describe('PUT /api/candidates', () => {
    test('200 for successful PUT', () => {
      let candidateToUpdate = null;
      return createCandidateMock()
        .then((candidate) => {
          candidateToUpdate = candidate;
          return superagent.put(`${apiURL}/${candidate._id}`)
            .send({ name: 'Lacy Hogan' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Lacy Hogan');
          expect(response.body.acceptance).toEqual(candidateToUpdate.acceptance);
          expect(response.body._id).toEqual(candidateToUpdate._id.toString());
        });
    });

    test('409 due to duplicate name', () => {
      return createCandidateMock()
        .then((candidate) => {
          return superagent.put(`${apiURL}/${candidate._id}`)
            .send({ name: candidate.name });
        })
        .catch((err) => {
          expect(err.status).toEqual(409);
        });
    });

    test('404 due to no candidate found', () => {
      return superagent.put(`${apiURL}/InvalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });

    test('400 due to lack of name', () => {      
      return createCandidateMock()
        .then((candidate) => {
          return superagent.put(`${apiURL}/${candidate._id}`)
            .send({ name: '' });
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });
  
  describe('GET /api/candidates', () => {
    test('200', () => {
      let tempCandidate = null;
      return createCandidateMock()
        .then((candidate) => {
          tempCandidate = candidate;
          return superagent.get(`${apiURL}/${candidate._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(tempCandidate.name);  
          expect(response.body.acceptance).toEqual(tempCandidate.acceptance);
          expect(response.body._id).toEqual(tempCandidate._id.toString());
        });
    });

    test('404 due to no id being passed', () => {
      return superagent.get(`${apiURL}`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });

    test('404 due to no candidate found', () => {
      return superagent.get(`${apiURL}/InvalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
  
  describe('DELETE /api/candidates', () => {
    test('204', () => {
      return createCandidateMock()
        .then((candidate) => {
          return superagent.delete(`${apiURL}/${candidate._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(204);
        });
    });
    test('404 due to no candidate found', () => {
      return superagent.delete(`${apiURL}/InvalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
