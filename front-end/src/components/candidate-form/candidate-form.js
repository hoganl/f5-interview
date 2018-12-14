import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const defaultState = { 
  name: '', 
  acceptance: '', 
  error: null, 
};

export default class CandidateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.candidate ? props.candidate : defaultState;

    autoBind.call(this, CandidateForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.candidate !== this.props.candidate) {
      this.setState(this.props.candidate);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('CANDIDATE FORM ERROR: ', error);
          this.setState({ error });
        });
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="candidate-form"
      >
        <input 
          name="name"
          type="text"
          placeholder="Candidate name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input 
          name="acceptance"
          type="text"
          placeholder="Acceptance status"
          value={this.state.acceptance}
          onChange={this.handleChange}
        />
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

CandidateForm.propTypes = {
  onComplete: PropTypes.func,
  continent: PropTypes.object,
  buttonText: PropTypes.string,
};
