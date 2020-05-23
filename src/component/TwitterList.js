import React from 'react';
import PropTypes from "prop-types";

import List from '@material-ui/core/List';

import TwitterAction from './TwitterAction';

const component = (props) => {
  return (
  <List>
    {props.profiles.map((d) => 
      <TwitterAction key={d.id} actionUrl={props.actionUrl} actionText={props.actionText} {...d}></TwitterAction>
    )}
  </List>
  );
}

// you can have actionText (text of function(profile))
component.propTypes = {
  actionUrl : PropTypes.string,
  actionText : PropTypes.string.isRequired,
};
export default component;

