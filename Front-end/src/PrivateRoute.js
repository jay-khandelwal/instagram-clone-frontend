import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component,token, ...rest }) => (
  <Route {...rest} render={(props) => (
    token !== null
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = state => ({
  token:state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);