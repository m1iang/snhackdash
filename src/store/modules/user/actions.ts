import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import User from '@/models/User';

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

  async makeADealWithSolutionRequester(context: any, { solutionId, snackId, solutionRequesterId, solutionRequesterName, solutionRequesterAvatar, solutionRequesterEmail, }: any) {
    const db = useFirestore();
    const user: User = {
      name: solutionRequesterName,
      email: solutionRequesterEmail,
      uid: solutionRequesterId,
      avatar: solutionRequesterAvatar,
      introduction: '',
      favouriteSnacks: [],
      solutionsGiven: [],
      solutionsReceived: [],
      snacksReceived: [],
      snacksGiven: [],
      solutionAdaquatelyAnsweredRating: 100, // 100 is the highest value for computing the rating of a user's solutions
      solutionAsJokeAnsweredFlags: 0,
    };
    await setDoc(doc(db, 'users', solutionRequesterId), {
      user
    });
  },


}