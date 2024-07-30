import { FIREBASE_AUTH, FIRESTORE_DB } from "../config/FirebaseConfig";
import { addDoc, collection, doc, getDocs, query, runTransaction, serverTimestamp, where } from "firebase/firestore";

const addOrUpdateDoc = async (ref, id, date, category, description, type, amount, userDisplayName, userField, transaction) => {
    const snapshot = await getDocs(ref);
    const data = {
        id: `${id}`,
        date: `${date}`,
        category: `${category}`,
        description: `${description}`,
        type: `${type}`,
        amount: `${amount}`,
        [userField]: `${userDisplayName}`,
        timestamp: serverTimestamp(),
    }
    if (snapshot.empty) {
        await addDoc(ref, data).then(() => {
            console.log('Transaction successful');
        });
    } else {
        const docRef = doc(ref);
        transaction.set(docRef, data);
    }
}

const getUserDoc = async (userRef, displayName) => {
    const userQuery = query(userRef, where('displayName', '==', displayName));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
        throw new Error('User not found');
    }

    return userSnapshot.docs[0];
};

export const sendTransaction = async (transactionData) => {
    const {
        id,
        amount,
        category,
        description,
        date,
        type,
        fromUser: fromUserDisplayName,
        toUser: toUserDisplayName,
    } = transactionData;
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
        console.log('No user is signed in');
        return;
    }

    try {
        const userRef = collection(FIRESTORE_DB, 'users');
        const fromUserDoc = await getUserDoc(userRef, fromUserDisplayName);
        const toUserDoc = await getUserDoc(userRef, toUserDisplayName);

        const fromUserData = fromUserDoc.data();
        const toUserData = toUserDoc.data();

        if (fromUserData.balance < amount) {
            console.error('Insufficient balance');
            return;
        }

        await runTransaction(FIRESTORE_DB, async (transaction) => {
            const newFromUserBalance = Number(fromUserData.balance) - amount;
            const newToUserBalance = Number(toUserData.balance) + amount;

            transaction.update(fromUserDoc.ref, { balance: newFromUserBalance });
            transaction.update(toUserDoc.ref, { balance: newToUserBalance });

            const fromTransactionRef = collection(fromUserDoc.ref, 'transactions');
            const toTransactionRef = collection(toUserDoc.ref, 'transactions');

            await addOrUpdateDoc(fromTransactionRef, id, date, category, description, type, amount, toUserDisplayName, 'to', transaction);
            await addOrUpdateDoc(toTransactionRef, id, date, category, description, 'Income', amount, fromUserDisplayName, 'from', transaction);
        });

    } catch (error) {
        console.error('Transaction failed:', error);
    }

}