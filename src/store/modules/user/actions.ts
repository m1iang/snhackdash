import router from '@/router';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { store } from '@/store';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';


export default {
  async createUserInDatabase(context: any, { id, email, name, avatar, }: any) {
    const db = useFirestore();
    const user = {
      name: name,
      email: email,
      uid: id,
      activeRequest: {},
      avatar: avatar,
      solutionAdaquatelyAnsweredRating: 100, // 100 is the highest value for computing the rating of a user's solutions
      solutionAsJokeAnsweredFlags: 0,
    };
    await setDoc(doc(db, 'users', id), {
      user
    });
  },

  async fetchUserFromDatabase(context: any, userId: any) {
    const db = useFirestore();
    const userDoc = doc(db, 'users', userId);
    const user = await getDoc(userDoc);
    if (user.exists()) {
      context.commit('SET_USER', user.data());
    } else {
      console.log('No such document!');
    }
  },

  async makeRequest(context: any, { id, question, description, status }: any) {
    const db = useFirestore();
    const requestRef = await addDoc(collection(db, "requests"), {
      requestId: uuidv4(),
      userId: id,
      question: question,
      description: description,
      status: status,
      hiddenSolution: "",
      location: "",
      snack: "",
    });

    context.commit('SET_ACTIVE_REQUEST', {
      userId: id,
      question: question,
      description: description,
      status: status,
      hiddenSolution: "",
      location: "",
      snack: "",
    });
    router.push('/dashboard');
  },

  async makeSolution(context: any, { requestId, location, snack, solution, status }: any) {
    const db = useFirestore();
    const requestRef = collection(db, "requests");
    const requestRefQuery = query(requestRef, where("requestId", "==", requestId));
    const requestRefQuerySnapshot = await getDocs(requestRefQuery);
    const finalRequestDoc = requestRefQuerySnapshot.docs[0].ref;
    await updateDoc(finalRequestDoc, {
      status: status,
      hiddenSolution: solution,
      location: location,
      snack: snack,
      solution: "",
    });
    router.push('/dashboard');
  },

  async fetchMyActiveRequest(context: any, activeRequest: any) {
    context.commit('SET_ACTIVE_REQUEST', activeRequest);
  },

  async fetchRequests(context: any) {
    const db = useFirestore();
    const requests: any = [];
    const querySnapshot = await getDocs(collection(db, 'requests'));
    querySnapshot.forEach((doc) => {
      requests.push(doc.data());
    });
    context.commit('SET_REQUESTS', requests);
  },

}