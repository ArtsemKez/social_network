import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import { withRouter, } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = this.props.authUserId
      if(!userId){
        userId = this.props.history.push("/login")
      }
    }
    this.props.getUserProfile(userId);
    
    setTimeout(()=>{
      this.props.getStatus(userId);
    }, 1000)
  }
  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} status={this.props.status}
      updateStatus={this.props.updateStatus} />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  authUserId: state.auth.userId,
})

export default compose(
  connect (mapStateToProps, {getUserProfile, getStatus, updateStatus}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)