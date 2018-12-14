import { validateCandidate } from '../utils';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'CANDIDATES_FETCH':
      return payload;
    case 'CANDIDATE_CREATE':
      validateCandidate(payload);
      return [payload, ...state];
    case 'CANDIDATE_UPDATE':
      validateCandidate(payload);
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'CANDIDATE_DELETE':
      validateCandidate(payload);
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
};
