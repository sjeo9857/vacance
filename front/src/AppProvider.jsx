import React, { Component } from 'react';
import App from './App';

const AppContext = React.createContext();

class AppProvider extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: {
        id: '',
        username: '',
        email: '',
        joined: '',
      },
    };
  }

  // Define a function to update the state
  updateUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        username: data.name,
        email: data.email,
        joined: data.joined,
      },
      auth: true,
    });
  };

  render() {

    const context = {
      state: this.state,
      updateUser: this.updateUser,
    };

    return (
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    );
  }
}

export { AppProvider, AppContext };