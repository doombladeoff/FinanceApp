import { useEffect, useState, useCallback } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../config/FirebaseConfig';

export const useTransactions = () => {
    const user = FIREBASE_AUTH?.currentUser;
    const [transactions, setTransactions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getTransactions = useCallback(() => {
        try{
            setRefreshing(true);
            const transactionsCollection = collection(FIRESTORE_DB, `users/${user.uid}/transactions`);
            const q = query(transactionsCollection);
    
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const trans = [];
                snapshot.forEach((doc) => {
                    trans.push({ id: doc.id, ...doc.data() });
                });
                setTransactions(trans);
                return unsubscribe;
            });
        } catch (error){
            console.error('Error getting transactions:', error);

        } finally{
            setRefreshing(false);
        }
    }, [user]);

    useEffect(() => {
        const unsubscribe = getTransactions();
        return () => unsubscribe && unsubscribe();
    }, [getTransactions]);

    return { transactions, refreshing, getTransactions };
};