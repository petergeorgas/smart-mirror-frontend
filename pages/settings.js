import { useState, useEffect } from "react";
import Settings from "../src/components/Settings/Settings";
import WebSocket from "../src/components/WebSocket/WebSocket";
import { firestore, auth } from "../src/firebase/firebase";

export default function SettingsPage() {
  const [user, setUser] = useState(auth.currentUser);

  // Put this in a Context/Provider use Context API create an <FirebaseAuthProvider>
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("loggedIn", !!user);
        setUser(user);
      }
    });
  }, []);

  return (
    <WebSocket>
      <Settings user={user} />
    </WebSocket>
  );
}
