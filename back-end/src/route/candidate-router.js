'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Candidate from '../model/candidate-model';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();
const candidateRouter = new Router();

candidateRouter.post('/api/candidates', jsonParser, (request, response, next) => {
  if (!request.body.name) {
    logger.log(logger.ERROR, 'CANDIDATE-ROUTER: Responding with 400 error code');
    return next(new HttpErrors(400, 'Candidate name is required'));
  }
  return new Candidate(request.body).save()
    .then(candidate => response.json(candidate))
    .catch(next);
});

candidateRouter.put('/api/candidates/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  
  return Candidate.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedCandidate) => {
      logger.log(logger.INFO, 'CANDIDATE-ROUTER: responding with a 200 status code');
      return response.json(updatedCandidate);
    })
    .catch(next);
});

candidateRouter.get('/api/candidates/:id', (request, response, next) => {
  return Candidate.findById(request.params.id)
    .then((candidate) => {
      logger.log(logger.INFO, 'CANDIDATE ROUTER: responding with 200 status code');
      logger.log(logger.INFO, `CANDIDATE ROUTER: ${JSON.stringify(candidate)}`);
      return response.json(candidate);
    })
    .catch(next);
});

candidateRouter.get('/api/candidates', (request, response, next) => {
  return Candidate.find({})
    .then((candidates) => {
      logger.log(logger.INFO, 'CANDIDATE ROUTER: responding with 200 status code');
      logger.log(logger.INFO, `CANDIDATE ROUTER: ${JSON.stringify(candidates)}`);
      return response.json(candidates);
    })
    .catch(next);
});

candidateRouter.delete('/api/candidates/:id', (request, response, next) => {
  return Candidate.findByIdAndRemove(request.params.id)
    .then(() => {
      logger.log(logger.INFO, 'CANDIDATE ROUTER: responding with 204 status code');
      return response.sendStatus(204);
    })
    .catch(next);
});

export default candidateRouter;
