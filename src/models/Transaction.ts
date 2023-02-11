type Transaction = {
  id: string,
  toUser: '',
  fromUser: '',
  snackToBeDelivered: '',
  isPendingDelivery: boolean, // default false
  isDelivered: boolean, // default false
  toUserSolution: '',
  fromUserReceivedSolution: boolean, // default false
}

export default Transaction;