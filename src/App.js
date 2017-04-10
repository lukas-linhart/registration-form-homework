import React, { Component } from 'react';
import './App.css';
import axios from './api/axios';

const emailValidator = require('email-validator');
const moment = require('moment');
const ageCalculator = require('age-calculator');


const DATE_FORMAT = 'DD.MM.YYYY';
const FIRST_NAME_MAX_LENGTH = 20;
const LAST_NAME_MAX_LENGTH = 30;
const MIN_AGE = 18;
const MAX_AGE = 120;


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
      <div className="inputRow">
        <div className="labelBlock">
          <label>{this.props.label}</label>
        </div>
        <div className="inputBlock">
          <input
            className="inputElem"
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.changeHandler}
            onBlur={this.props.blurHandler}
          />
          <div className="errorElem">{this.props.error}</div>
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
      firstName: {
        label: 'First name',
        validationHandler: this.validateFirstName.bind(this)
      },
      lastName: {
        label: 'Last name',
        validationHandler: this.validateLastName.bind(this)
      },
      email: {
        label: 'Email',
        validationHandler: this.validateEmail.bind(this)
      },
      address: {label: 'Address',
        validationHandler: this.validateAddress.bind(this)
      },
      birthdate: {
        label: 'Birthday',
        placeholder: DATE_FORMAT,
        validationHandler: this.validateBirthdate.bind(this)
      },
      password1: {
        label: 'Enter password',
        type: 'password',
        validationHandler: this.validatePassword1.bind(this)
      },
      password2: {
        label: 'Verify password',
        type: 'password',
        validationHandler: this.validatePassword2.bind(this)
      }
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
    const length = this.state.firstNameValue.trim().length;
    if (length === 0) {
      this.setState({
        firstNameError: `First name can't be empty`
      });
      return;
    }
    if (length > FIRST_NAME_MAX_LENGTH) {
      this.setState({
        firstNameError: `First name can't have more than
          ${FIRST_NAME_MAX_LENGTH} characters`
      });
      return;
    }
    this.setState({
      firstNameIsValid: true,
      firstNameError: ''
    });
  }

  validateLastName() {
    const length = this.state.lastNameValue.trim().length;
    if (length === 0) {
      this.setState({
        lastNameError: `Last name can't be empty`
      });
      return;
    }
    if (length > LAST_NAME_MAX_LENGTH) {
      this.setState({
        lastNameError: `Last name can't have more than
          ${LAST_NAME_MAX_LENGTH} characters`
      });
      return;
    }
    this.setState({
      lastNameIsValid: true,
      lastNameError: ''
    });
  }

  validateEmail() {
    const email = this.state.emailValue.trim();
    return Promise.resolve()
    .then( () => {
      if (email.length === 0) {
        throw new Error(`Email can't be empty`);
      }
      if (emailValidator.validate(email) === false) {
        throw new Error(`Invalid email address format`);
      }
    })
    .then( () => {
      return axios.post('/validate', { email: email })
      .then( (response) => {
        console.log(response.data.message);
      });
    })
    .then( () => {
      this.setState({
        emailIsValid: true,
        emailError: ''
      });
    })
    .catch( (err) => {
      this.setState({
        emailError: err.message
      });
    });
  }

  validateAddress() {
    const address = this.state.addressValue.trim();
    return Promise.resolve()
    .then( () => {
      if (address.length === 0) {
        throw new Error(`Address can't be empty`);
      }
    })
    .then( () => {
      console.log('TODO: send request to server');
    })
    .then( () => {
      this.setState({
        addressIsValid: true,
        addressError: ''
      });
    })
    .catch( (err) => {
      this.setState({
        addressError: err.message
      });
    });
  }

  validateBirthdate() {
    const birthdate = this.state.birthdateValue.trim();
    if (birthdate.length === 0) {
      this.setState({
        birthdateError: `Birthdate can't be empty`
      });
      return;
    }
    if (moment(birthdate, DATE_FORMAT).isValid() === false) {
      this.setState({
        birthdateError: `Invalid birthdate format`
      });
      return;
    }
    const [day, month, year] = birthdate.split('.');
    const age = new ageCalculator.AgeFromDateString(
      `${year}-${month}-${day}`
    ).age;
    if (age < MIN_AGE || age > MAX_AGE) {
      this.setState({
        birthdateError: `Age must be between ${MIN_AGE} and ${MAX_AGE} years`
      });
      return;
    }
    this.setState({
      birthdateIsValid: true,
      birthdateError: ''
    });
  }

  validatePassword1() {
    const length = this.state.password1Value.length;
    if (length === 0) {
      this.setState({
        password1Error: `Password can't be empty`
      });
      return;
    }
    this.setState({
      password1IsValid: true,
      password1Error: ''
    });
  }

  validatePassword2() {
    const password1 = this.state.password1Value;
    const password2 = this.state.password2Value;
    if (password2.length === 0) {
      this.setState({
        password2Error: `Password can't be empty`
      });
      return;
    }
    if (password1 !== password2) {
      this.setState({
        password2Error: `Passwords don't match`
      });
      return;
    }
    this.setState({
      password2IsValid: true,
      password2Error: ''
    });
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
        <form className="registrationForm" onSubmit={this.handleSubmit}>
          {formFields}
          <input className="submitButton" type="submit" value="Register" />
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
