import React, { Component } from 'react';

export default ChildComponent => {
  class ResolveUserType extends Component {
    render() {
      let { userType } = this.props;
      switch (userType) {
        case 0:
          return null;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  return ResolveUserType;
};
