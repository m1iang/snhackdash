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
  SET_FAVOURITE_SNACKS(state: any, favouriteSnacks: string[]) {
    state.favouriteSnacks = favouriteSnacks;
  },
  SET_SOLUTIONS_GIVEN(state: any, solutionsGiven: string[]) {
    state.solutionsGiven = solutionsGiven;
  },
  SET_SOLUTIONS_RECEIVED(state: any, solutionsReceived: string[]) {
    state.solutionsReceived = solutionsReceived;
  },
  SET_SNACKS_RECEIVED(state: any, snacksReceived: string[]) {
    state.snacksReceived = snacksReceived;
  },
  SET_SNACKS_GIVEN(state: any, snacksGiven: string[]) {
    state.snacksGiven = snacksGiven;
  },
  SET_SOLUTION_ADAQUATELY_ANSWERED_RATING(state: any, solutionAdaquatelyAnsweredRating: number) {
    state.solutionAdaquatelyAnsweredRating = solutionAdaquatelyAnsweredRating;
  },
  SET_SOLUTION_AS_JOKE_ANSWERED_FLAGS(state: any, solutionAsJokeAnsweredFlags: number) {
    state.solutionAsJokeAnsweredFlags = solutionAsJokeAnsweredFlags;
  },
}