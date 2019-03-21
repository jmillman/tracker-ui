import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react'; 

import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div>APP</div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
