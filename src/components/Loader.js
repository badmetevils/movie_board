import React, { Fragment } from 'react';
import '../styles/loader.css';

const Loader = props => (
  <Fragment>
    <div className="loader">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className="msg">{props.msg}</p>
    </div>
  </Fragment>
);

export default Loader;
