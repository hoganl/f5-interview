'use strict';

import faker from 'faker';
import Candidate from '../../model/candidate-model';

const createCandidateMock = () => {
  return new Candidate({
    name: faker.lorem.word(2),
    acceptance: faker.lorem.words(15),
  }).save();
};

const removeCandidateMock = () => Candidate.remove({});

export { createCandidateMock, removeCandidateMock };
