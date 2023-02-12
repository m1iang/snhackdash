export default {
  getUser(state: any) {
    return {
      name: state.name,
      email: state.email,
      uid: state.uid,
      avatar: state.avatar,
      activeRequest: state.activeRequest,
      introduction: state.introduction,
      solutionAdaquatelyAnsweredRating: state.solutionAdaquatelyAnsweredRating,
      solutionAsJokeAnsweredFlags: state.solutionAsJokeAnsweredFlags,
    }
  },
  getRequests(state: any) {
    return state.requests;
  },
  getDelivery(state: any) {
    return state.delivery;
  },
  getDeliveries(state: any) {
    return state.deliveries;
  },
  getSolution(state: any) {
    return state.solution;
  }
}