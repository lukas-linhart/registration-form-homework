import React, { Component } from 'react';
import './App.css';

const DATE_FORMAT = 'DD.MM.YYYY';


class FormField extends Component {
  render() {
    return (
        <FormInput
          name={this.props.name}
          label={this.props.label}
          type={this.props.type || "text"}
          placeholder={this.props.placeholder}
          value={this.props.value}
          error={this.props.error}
          changeHandler={this.props.changeHandler}
          blurHandler={this.props.blurHandler}
        />
    );
  };
}


class FormInput extends Component {
  render() {
    return (
      <div>
        <div>
          <label>{this.props.label}</label>
        </div>
        <div>
          <input
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.changeHandler}
            onBlur={this.props.blurHandler}
          />
          <div>{this.props.error}</div>
        </div>
      </div>
    );
  }
}


class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    // order of items will affect order of rendered form inputs
    this.inputs = [
      'firstName',
      'lastName',
      'email',
      'address',
      'birthdate',
      'password1',
      'password2'
    ];

    // We need to first create this obj and only then assign it to state,
    // as React complains that we should use setState, but that's no-op
    // since at this point the component is not mounted.
    let state = {};
    for (let inputName of this.inputs) {
      state[`${inputName}Value`] = '';
      state[`${inputName}Error`] = '';
      state[`${inputName}IsValid`] = false;
    }
    this.state = state;

    this.inputParams = {
      firstName: { label: 'First name', validationHandler: this.validateFirstName },
      lastName: { label: 'Last name' },
      email: { label: 'Email' },
      address: { label: 'Address' },
      birthdate: { label: 'Birthday', placeholder: DATE_FORMAT },
      password1: { label: 'Enter password', type: 'password' },
      password2: { label: 'Verify password', type: 'password' }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    this.setState({
      [`${inputName}Value`]: event.target.value,
      [`${inputName}Error`]: '',
      [`${inputName}IsValid`]: false
    });
  }

  handleInputBlur(event) {
    const inputName = event.target.name;
    if (this.inputParams[inputName].validationHandler) {
      this.inputParams[inputName].validationHandler();
    }
  }

  validateFirstName() {
    console.log('validating first name');
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('no submit yet, sry :troll:');
  }

  render() {
    let formFields = [];
    for (let fieldName of this.inputs) {
      formFields.push(
          <FormField
            key={fieldName}
            name={fieldName}
            label={this.inputParams[fieldName].label}
            type={this.inputParams[fieldName].type}
            placeholder={this.inputParams[fieldName].placeholder}
            value={this.state[`${fieldName}Value`]}
            error={this.state[`${fieldName}Error`]}
            changeHandler={this.handleInputChange}
            blurHandler={this.handleInputBlur}
          />
      );
    }

    return (
        <form onSubmit={this.handleSubmit}>
          {formFields}
          <input type="submit" value="Register" />
        </form>
    );
  }
}


class App extends Component {
  render() {
    return (
      <RegistrationForm />
    );
  }
}

export default App;
