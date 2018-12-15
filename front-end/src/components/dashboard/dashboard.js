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
        <h1>Candidates</h1>
        <h2>Add New Candidate</h2>
        <div className='newSection'>
          <CandidateForm 
            onComplete={candidateCreate}
            buttonText='Create Candidate'
          />
        </div>
        <h2>Active Candidates</h2>
        {
          candidates.map((candidate) => {
            return (
              <div className='activeSection' key={candidate._id}>
                <h3>{candidate.name}</h3>
                <p>{candidate.acceptance}</p>
                <button className='deleteButton' onClick={() => candidateDelete(candidate)}>Delete</button>
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
