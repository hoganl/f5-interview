import superagent from 'superagent';

const candidatesFetch = candidates => ({
  type: 'CANDIDATES_FETCH',
  payload: candidates,
});

const candidateCreate = candidate => ({
  type: 'CANDIDATE_CREATE',
  payload: candidate,
});

const candidateUpdate = candidate => ({
  type: 'CANDIDATE_UPDATE',
  payload: candidate,
});

const candidateDelete = candidate => ({
  type: 'CANDIDATE_DELETE',
  payload: candidate,
});

const candidatesFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/candidates`)
    .then((response) => {
      dispatch(candidatesFetch(response.body));
      return response;
    });
};

const candidateCreateRequest = candidate => (dispatch) => {
  return superagent.post(`${API_URL}/api/candidates`)
    .send(candidate)
    .then((response) => {
      dispatch(candidateCreate(response.body));
      return response;
    });
};

const candidateUpdateRequest = candidate => (dispatch) => {
  return superagent.put(`${API_URL}/api/candidates/${candidate._id}`)
    .send(candidate)
    .then((response) => {
      dispatch(candidateUpdate(candidate));
      return response;
    });
};

const candidateDeleteRequest = candidate => (dispatch) => {
  return superagent.delete(`${API_URL}/api/candidates/${candidate._id}`)
    .then((response) => {
      dispatch(candidateDelete(candidate));
      return response;
    });
};

export { candidatesFetchRequest, candidateCreateRequest, candidateUpdateRequest, candidateDeleteRequest }; // eslint-disable-line
