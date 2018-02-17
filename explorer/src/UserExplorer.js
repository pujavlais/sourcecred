import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  commitWeight,
  propTypes as commitUtilsPropTypes,
  userWeightForPath,
} from './commitUtils';

export class UserExplorer extends Component {
  static propTypes = {
    selectedPath: PropTypes.string.isRequired,
    selectedUser: PropTypes.string,
    onSelectUser: PropTypes.func.isRequired,
    data: commitUtilsPropTypes.commitData.isRequired,
  }

  render() {
    const weights = userWeightForPath(this.props.selectedPath, this.props.data, commitWeight);
    const sortedUserWeightTuples =
        Object.keys(weights)
        .map(k => [k, weights[k]])
        .sort((a,b) => b[1] - a[1]);
    const entries = sortedUserWeightTuples.map(authorWeight => { 
      const [author, weight] = authorWeight;
      return <UserEntry userId={author} weight={weight} key={author}/>
    });
    return <div className="user-explorer"> 
      <h3> User Explorer </h3> 
      {entries}
    </div>
  }
}

/**
 * Record the cred earned by the user in a given scope.
 */
class UserEntry extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
  }

  render() {
    return <div className="user-entry">
      <span> {this.props.userId} </span>
      <span> {this.props.weight.toFixed(1)} </span>
    </div>
  }
}