import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import User from '@/models/User';
import { store } from '@/store';
import SnhackDashTransaction from '@/models/Transaction';
import DashPost from '@/models/DashPost';

export default {
  async createUserInDatabase(context: any, { id, email, name, avatar, }: any) {
    const db = useFirestore();
    const user: User = {
      name: name,
      email: email,
      uid: id,
      avatar: avatar,
      introduction: '',
      favouriteSnacks: [],
      solutionsGiven: [],
      solutionsReceived: [],
      snacksReceived: [],
      snacksGiven: [],
      solutionAdaquatelyAnsweredRating: 100, // 100 is the highest value for computing the rating of a user's solutions
      solutionAsJokeAnsweredFlags: 0,
    };
    await setDoc(doc(db, 'users', id), {
      user
    });
  },


  async updateUserInDatabase(context: any, { id, email, name, avatar, introduction, favouriteSnacks, solutionsGiven, solutionsReceived, snacksReceived, snacksGiven, solutionAdaquatelyAnsweredRating, solutionAsJokeAnsweredFlags }: any) {
    const db = useFirestore();
    const userInStore = store.getters['user/getUser'];
    // if there is a new value for a field, use it, otherwise use the value from the store
    const user: User = {
      name: name ? name : userInStore.name,
      email: email ? email : userInStore.email,
      uid: id ? id : userInStore.uid,
      avatar: avatar ? avatar : userInStore.avatar,
      introduction: introduction ? introduction : userInStore.introduction,
      favouriteSnacks: favouriteSnacks ? favouriteSnacks : userInStore.favouriteSnacks,
      solutionsGiven: solutionsGiven ? solutionsGiven : userInStore.solutionsGiven,
      solutionsReceived: solutionsReceived ? solutionsReceived : userInStore.solutionsReceived,
      snacksReceived: snacksReceived ? snacksReceived : userInStore.snacksReceived,
      snacksGiven: snacksGiven ? snacksGiven : userInStore.snacksGiven,
      solutionAdaquatelyAnsweredRating: solutionAdaquatelyAnsweredRating ? solutionAdaquatelyAnsweredRating : userInStore.solutionAdaquatelyAnsweredRating,
      solutionAsJokeAnsweredFlags: solutionAsJokeAnsweredFlags ? solutionAsJokeAnsweredFlags : userInStore.solutionAsJokeAnsweredFlags,
    };
    await setDoc(doc(db, 'users', id), {
      user
    });
  },

  async makeAWillDashPost(context: any, { fromUser, question }: any) {
    const db = useFirestore();
    const dashPost: DashPost = {
      fromUser: fromUser,
      question: question,
    };
    await setDoc(doc(db, 'dashPosts', dashPost.fromUser), {
      dashPost
    });
  },

  // this transaction is from the side of the person that has a solution and wants to be delivered a snack
  async makeASolutionDashPost(context: any, { fromUser, myOwnSolution }: any) {
    const db = useFirestore();
    const dashRef = doc(db, 'dashPosts', fromUser);
    const dashPostSnap = await getDoc(dashRef);

    if (dashPostSnap.exists()) {
      const dashPost = dashPostSnap.data().dashPost;
      const transaction: SnhackDashTransaction = {
        id: crypto.randomUUID(),
        toUser: dashPost.fromUser,
        fromUser: store.getters['user/getUserId'],
        snackToBeDelivered: '',
        isPendingDelivery: true,
        isDelivered: false,
        toUserSolution: myOwnSolution,
        fromUserReceivedSolution: true,
      }
      await setDoc(doc(db, 'transactions',), {
        transaction
      });
    } else {
      console.log('No such document!');
    }
  },




}