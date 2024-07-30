import { FIRESTORE_DB } from "../config/FirebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getUserData = async (user) => {
    if (!user) {
        console.log('No user is signed in');
        return null;
    }
    try {
        const userTransactionsRef = collection(FIRESTORE_DB, 'users', user.uid, 'transactions');
        const querySnapshot = await getDocs(userTransactionsRef);
        const transactions = querySnapshot.docs.map(doc => doc.data());

        const userRef = doc(FIRESTORE_DB, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        console.log(userData)

        //console.log('User data:', JSON.stringify({ userData, transactions }, null, 2));
        return { transactions, balance: userData.balance };
    } catch (error) {
        console.error('Error getting transactions:', error);
    }
    
}

export const getBalance = async (user) => {
    if (user) {
        const userRef = doc(FIRESTORE_DB, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        return userData.balance;
    } else {
        console.log('No user is signed in');
    }
}