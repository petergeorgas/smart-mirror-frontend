import Settings from "../src/components/Settings/Settings";
import { firestore, auth } from "../src/firebase/firebase";

export default function SettingsPage() {
  const isLoggedIn = !!auth.currentUser;
  
  return <Settings user={auth.currentUser}/>
};
