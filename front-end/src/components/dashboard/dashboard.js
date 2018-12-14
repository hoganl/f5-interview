import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CandidateForm from './../candidate-form/candidate-form';
import * as candidateActions from '../../actions/candidate-actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.candidatesFetch();
  }

  render() {
    const { 
      candidates, candidateCreate, candidateUpdate, candidateDelete,
    } = this.props;
    return (
      <div className='dashboard'>
        <h2>Candidate App</h2>
        <CandidateForm 
          onComplete={candidateCreate}
          buttonText='Create Candidate'
        />
        {
          candidates.map((candidate) => {
            return (
              <div key={candidate._id}>
                <h2>{candidate.name}</h2>
                <p>{candidate.acceptance}</p>
                <button onClick={() => candidateDelete(candidate)}>Delete</button>
                <CandidateForm 
                  candidate={candidate}
                  onComplete={candidateUpdate}
                  buttonText='Update Candidate'
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  candidateFetch: PropTypes.func,
  candidateCreate: PropTypes.func,
  candidateUpdate: PropTypes.func,
  candidateDelete: PropTypes.func,
  candidates: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    candidates: state.candidates,
  };
};

const mapDispatchToProps = dispatch => ({
  candidatesFetch: () => dispatch(candidateActions.candidatesFetchRequest()),
  candidateCreate: candidate => dispatch(candidateActions.candidateCreateRequest(candidate)),
  candidateUpdate: candidate => dispatch(candidateActions.candidateUpdateRequest(candidate)),
  candidateDelete: candidate => dispatch(candidateActions.candidateDeleteRequest(candidate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
