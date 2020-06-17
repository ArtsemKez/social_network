import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { withRouter, } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  refreshProfile(){
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = this.props.authUserId
      if(!userId){
        userId = this.props.history.push("/login")
      }
    }
    this.props.getUserProfile(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.match.params.userId != prevProps.match.params.userId){
    this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId}
      profile={this.props.profile} status={this.props.status}
      updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto}
      saveProfile={this.props.saveProfile} />
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
  connect (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)