import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../config/FirebaseConfig";

export const sendPayment = async (transactionData) => {
    const { amount, type } = transactionData;

    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
        console.log('No user is signed in');
        return;
    }
    try {
        const userTransactionsRef = collection(FIRESTORE_DB, 'users', user.uid, 'transactions');
        await addDoc(userTransactionsRef, transactionData)
        console.log('Transaction added!');

        const userRef = doc(FIRESTORE_DB, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error('User document not found');
            return;
        }

        const userData = userDoc.data();
        let newBalance = userData.balance;

        if (type === 'Income') {
            newBalance += amount;
        } else if (type === 'Expense') {
            newBalance -= amount;
        }

        await updateDoc(userRef, { balance: newBalance })
        console.log('User balance updated!');

    } catch (error) {
        console.error('Error adding transaction:', error);
    }

}