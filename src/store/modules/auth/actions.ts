import { auth } from "@/config/firebaseConfig"
import router from "@/router"
import { store } from "@/store";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

export default {
  async register(context: any, { name, email, password }: any) {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response) {
      context.commit("SET_USER_ID", response.user.uid);
      context.commit("SET_USER_EMAIL", response.user.email);
      context.commit("SET_USER_NAME", name);
      context.commit("SET_USER_AVATAR", response.user.photoURL);
      context.commit("SET_LOGGED_IN", false)
      await context.dispatch("user/createUserInDatabase", { id: response.user.uid, email: response.user.email, name: name, avatar: response.user.photoURL, }, { root: true });
      router.push({ path: "/login", query: { registered: "true", active: "false" } });
    } else {
      context.commit("SET_LOGGED_IN", false);
      throw new Error("Something went wrong");
    }
  },
  async login(context: any, { email, password }: any) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response) {
      context.commit("SET_USER_ID", response.user.uid);
      console.log(response.user.uid);
      console.log(store.getters["auth/getUserId"]);
      context.commit("SET_USER_EMAIL", response.user.email);

      context.commit("SET_LOGGED_IN", true);

      await context.dispatch("user/fetchUserFromDatabase", response.user.uid, { root: true });
      console.log(store.getters["user/getUser"]);

      const userName = store.getters["user/getUser"].name;
      console.log(userName);
      context.commit("SET_USER_NAME", userName);

      router.push({ path: "/dashers", query: { loggedIn: "true" } });
    }
  },

  async logout(context: any) {
    auth.signOut();
    context.commit("SET_USER_ID", null);
    context.commit("SET_USER_EMAIL", null);
    context.commit("SET_USER_NAME", null);
    context.commit("SET_USER_AVATAR", null);
    context.commit("SET_LOGGED_IN", false);
    router.push({ path: "/", query: { loggedOut: "true" } });
  },

  async setUser(context: any, user: any) {
    context.commit("SET_USER_ID", user.uid);
    context.commit("SET_USER_EMAIL", user.email);
    context.commit("SET_USER_NAME", user.displayName);
    context.commit("SET_USER_AVATAR", user.photoURL);
    context.commit("SET_LOGGED_IN", true);
    console.log(store.getters['auth/getUserName'])
  },

  async fetchUser({ commit }: any, userId: any) {
    const db = useFirestore();
    const userDoc = doc(db, 'users', userId);
    const user = await getDoc(userDoc);
    if (user.exists()) {
      commit('SET_USER', user.data());
    } else {
      console.log('No such document!');
    }
  }
}