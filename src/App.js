import React, { Component } from 'react';
import './App.css';



class RegistrationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div>Registration form</div>
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
