import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAxTazwM8kZ627U38B63ks3ZFniBApjWEs",
  authDomain: "clothing-store-ed072.firebaseapp.com",
  projectId: "clothing-store-ed072",
  storageBucket: "clothing-store-ed072.firebasestorage.app",
  messagingSenderId: "772524431536",
  appId: "1:772524431536:web:635abf87d0d56399f08375"
};


const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // e.g. 'hats'
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Upload complete!');
};

// Google Auth
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Firebase authenticate / create user from Google Login
export const db = getFirestore();

export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
  const collectionRef = await collection(db, collectionKey);
  const batch = await writeBatch(db);

  objectsToAdd.forEach((category) => {
    const docRef = doc(collectionRef, category.title.toLowerCase());
    batch.set(docRef, category);
  });

  await batch.commit();
}

export const getCategories = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocFromAuth = async (userAuth, extraInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...extraInfo
      })
    } catch (error) {
      console.log(`Error creating user: ${error.message}`);
    }
  }

  return userDocRef;
};

export const createUserWithEmailPwd = async (email, password) => {
  if (email && password) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
};

export const loginUserWithEmailPwd = async (email, password) => {
  if (email && password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }
};

export const logOutUser = async () => await signOut(auth);

export const authChangedListener = (callback) => onAuthStateChanged(auth, callback)
