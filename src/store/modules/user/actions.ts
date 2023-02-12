import router from '@/router';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
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
      description: marked(description),
      status: status,
      hiddenSolution: "",
      location: "",
      snack: "",
      solutionProviderId: "",
      temporalSolutionProviderId: "",
      completedTransaction: "false",
    });

    context.commit('SET_ACTIVE_REQUEST', {
      userId: id,
      question: question,
      description: marked(description),
      status: status,
      hiddenSolution: "",
      location: "",
      snack: "",
      solutionProviderId: "",
      temporalSolutionProviderId: "",
      completedTransaction: "false",
    });
    router.push('/dashboard');
  },

  async makeSolution(context: any, { requestId, location, snack, solution, status, solutionProviderId }: any) {
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
      solutionProviderId: "",
      temporalSolutionProviderId: solutionProviderId,
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

  async acceptSolution(context: any, { requestId }: any) {
    const db = useFirestore();
    const requestRef = collection(db, "requests");
    const requestRefQuery = query(requestRef, where("requestId", "==", requestId));
    const requestRefQuerySnapshot = await getDocs(requestRefQuery);
    const finalRequestDoc = requestRefQuerySnapshot.docs[0].ref;
    const solution = marked(requestRefQuerySnapshot.docs[0].data().hiddenSolution);
    const solutionProviderId = requestRefQuerySnapshot.docs[0].data().temporalSolutionProviderId;
    await updateDoc(finalRequestDoc, {
      hiddenSolution: solution,
      solutionProviderId: solutionProviderId,
    });
    router.push('/dashboard');
  },

  async startDelivery(context: any, { requestId, dashingUser, solutionUser, snack, location, deliveryStarted }: any) {
    const db = useFirestore();
    const dashingUserRef = doc(db, 'users', dashingUser);
    const dashingUserDoc = await getDoc(dashingUserRef);
    let dashingUserName = "";
    if (dashingUserDoc.exists()) {
      dashingUserName = dashingUserDoc.data().user.name;
    } else {
      console.log('No such document!');
    }

    const solutionUserRef = doc(db, 'users', solutionUser);
    const solutionUserDoc = await getDoc(solutionUserRef);
    let solutionUserName = "";
    if (solutionUserDoc.exists()) {
      solutionUserName = solutionUserDoc.data().user.name;
    } else {
      console.log('No such document!');
    }


    const deliveryRef = await addDoc(collection(db, "deliveries"), {
      deliveryId: uuidv4(),
      requestId: requestId,
      dashingUserName: dashingUserName,
      dashingUser: dashingUser,
      solutionUser: solutionUser,
      solutionUserName: solutionUserName,
      deliveryStarted: deliveryStarted,
      deliveryFinished: "false",
      snack: snack,
      location: location,
    });
    router.push('/dashboard');
  },

  async fetchDeliveries(context: any) {
    const db = useFirestore();
    const deliveries: any = [];
    const querySnapshot = await getDocs(collection(db, 'deliveries'));
    querySnapshot.forEach((doc) => {
      deliveries.push(doc.data());
    });

    context.commit('SET_DELIVERIES', deliveries);
  },

  async finishDelivery(context: any, { deliveryId }: any) {
    const db = useFirestore();
    const deliveryRef = collection(db, "deliveries");
    const deliveryRefQuery = query(deliveryRef, where("deliveryId", "==", deliveryId));
    const deliveryRefQuerySnapshot = await getDocs(deliveryRefQuery);
    const finalDeliveryDoc = deliveryRefQuerySnapshot.docs[0].ref;
    await updateDoc(finalDeliveryDoc, {
      deliveryFinished: "true",
    });

    const requestId = deliveryRefQuerySnapshot.docs[0].data().requestId;
    const requestRef = collection(db, "requests");
    const requestRefQuery = query(requestRef, where("requestId", "==", requestId));
    const requestRefQuerySnapshot = await getDocs(requestRefQuery);
    const finalRequestDoc = requestRefQuerySnapshot.docs[0].ref;
    const solution = marked(requestRefQuerySnapshot.docs[0].data().hiddenSolution);

    await updateDoc(finalRequestDoc, {
      status: "delivery_complete",
      solution: solution,
    });

    context.dispatch("user/fetchSolution", { requestId: requestId }, { root: true });


    router.push('/dashboard');
  },

  async markSolutionAsRead(context: any, { requestId }: any) {
    const db = useFirestore();
    const requestRef = collection(db, "requests");
    const requestRefQuery = query(requestRef, where("requestId", "==", requestId));
    const requestRefQuerySnapshot = await getDocs(requestRefQuery);
    const finalRequestDoc = requestRefQuerySnapshot.docs[0].ref;
    await updateDoc(finalRequestDoc, {
      status: "solution_read",
      completedTransaction: "true",
    });
    router.push('/dashboard');
  },

  async fetchSolution(context: any, { requestId }: any) {
    const db = useFirestore();
    const requestRef = collection(db, "requests");
    const requestRefQuery = query(requestRef, where("requestId", "==", requestId));
    const requestRefQuerySnapshot = await getDocs(requestRefQuery);
    const solution = marked(requestRefQuerySnapshot.docs[0].data().hiddenSolution);

    context.commit('SET_SOLUTION', solution);
  },


  async fetchUserNameById(context: any, userId: any) {
    const db = useFirestore();
    const userDoc = doc(db, 'users', userId);
    const user = await getDoc(userDoc);
    if (user.exists()) {
      return user.data().user.name;
    } else {
      console.log('No such document!');
    }
  },

  async destroyCompletedTransactions(context: any) {
    const db = useFirestore();
    const querySnapshot = await getDocs(collection(db, 'requests'));
    querySnapshot.forEach((doc) => {
      if (doc.data().completedTransaction == "true") {
        deleteDoc(doc.ref);
      }
    });
  }
}