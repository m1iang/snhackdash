export default {
  getUser(state: any) {
    return {
      name: state.name,
      email: state.email,
      uid: state.uid,
      avatar: state.avatar,
      introduction: state.introduction,
      favouriteSnacks: state.favouriteSnacks,
      solutionsGiven: state.solutionsGiven,
      solutionsReceived: state.solutionsReceived,
      snacksReceived: state.snacksReceived,
      snacksGiven: state.snacksGiven,
      solutionAdaquatelyAnsweredRating: state.solutionAdaquatelyAnsweredRating,
      solutionAsJokeAnsweredFlags: state.solutionAsJokeAnsweredFlags,
    }
  },

}