import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    var res = await auth.createUserWithEmailAndPassword(email, password);
    var res2 = await firestore.collection("users").doc(res.user.uid).set({
      uid: res.user.uid,
      username: username
    });
    return res2;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setCurrentUser(user);
      if (user) {
        var res = await firestore.collection("users").doc(user.uid).get();
        setCurrentUsername(res.data().username);
      } else {
        setCurrentUsername(null);
      }
      setLoading(false);
    })

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUsername,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}