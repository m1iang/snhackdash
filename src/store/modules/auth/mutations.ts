export default {
  SET_LOGGED_IN(state: any, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn;
  },
  SET_USER_ID(state: any, id: any) {
    state.id = id;
  },
  SET_USER_EMAIL(state: any, email: string) {
    state.email = email;
  },
  SET_USER_NAME(state: any, name: string) {
    state.name = name;
  },
  SET_USER_AVATAR(state: any, avatar: any) {
    state.avatar = avatar;
  },

}