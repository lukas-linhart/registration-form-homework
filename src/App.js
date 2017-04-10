import React, { Component } from 'react';
import './App.css';


class FormField extends Component {
  render() {
    return (
        <FormInput
          name={this.props.name}
          label={this.props.label}
          value={this.props.value}
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
            name={this.props.name}
            value={this.props.value}
          />
          <div>error placeholder</div>
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
  }

  render() {
    let formFields = [];
    for (let fieldName of this.inputs) {
      formFields.push(
          <FormField
            key={fieldName}
            name={fieldName}
            label={fieldName}
            value=""
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
