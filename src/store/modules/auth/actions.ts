import { auth } from "@/config/firebaseConfig"
import router from "@/router"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { query } from "firebase/firestore";

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
      context.commit("SET_USER_EMAIL", response.user.email);
      context.commit("SET_USER_NAME", response.user.displayName);
      context.commit("SET_USER_AVATAR", response.user.photoURL);
      context.commit("SET_LOGGED_IN", true);
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
  }
}