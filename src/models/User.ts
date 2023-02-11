type User = {
  name: '',
  email: '',
  uid: '',
  avatar: '',
  activeRequest: {},
  introduction: '',
  favouriteSnacks: [],
  solutionsGiven: [],
  solutionsReceived: [],
  snacksReceived: [],
  snacksGiven: [],
  solutionAdaquatelyAnsweredRating: 100, // 100 is the highest value for computing the rating of a user's solutions
  solutionAsJokeAnsweredFlags: 0,
}

export default User;
