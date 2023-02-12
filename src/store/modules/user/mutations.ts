export default {
  SET_USER_ID(state: any, id: string) {
    state.uid = id;
  },
  SET_USER_EMAIL(state: any, email: string) {
    state.email = email;
  },
  SET_USER_NAME(state: any, name: string) {
    state.name = name;
  },
  SET_USER_AVATAR(state: any, avatar: string) {
    state.avatar = avatar;
  },
  SET_INTRODUCTION(state: any, introduction: string) {
    state.introduction = introduction;
  },
  SET_ACTIVE_REQUEST(state: any, activeRequest: any) {
    state.activeRequest = activeRequest;
  },
  SET_SOLUTION_ADAQUATELY_ANSWERED_RATING(state: any, solutionAdaquatelyAnsweredRating: number) {
    state.solutionAdaquatelyAnsweredRating = solutionAdaquatelyAnsweredRating;
  },
  SET_SOLUTION_AS_JOKE_ANSWERED_FLAGS(state: any, solutionAsJokeAnsweredFlags: number) {
    state.solutionAsJokeAnsweredFlags = solutionAsJokeAnsweredFlags;
  },
  SET_REQUESTS(state: any, requests: any) {
    state.requests = requests;
  },
  SET_DELIVERY(state: any, delivery: any) {
    state.delivery = delivery;
  },
  SET_DELIVERIES(state: any, deliveries: any) {
    state.deliveries = deliveries;
  },
  SET_SOLUTION(state: any, solution: string) {
    state.solution = solution;
  }

}