import { useEffect, useState, useCallback } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../config/FirebaseConfig';

export const useBalance = () => {
    const user = FIREBASE_AUTH?.currentUser;
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const userDocRef = doc(FIRESTORE_DB, `users/${user.uid}`);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                setBalance(doc.data().balance || 0);
            } else {
                setBalance(0);
            }
        });
        return () => unsubscribe();
    }, [user]);

    return balance;
};