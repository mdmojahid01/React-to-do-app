import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import { db } from "./firebase";
import { AuthContext } from "./AuthContext";
import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// ================== Context API For User Todo Data =====================
export const DataContext = createContext();

// ======== Data Provider ==============
const DataContextProvider = ({ children }) => {
  // ============ Reading Current User Data from Context API ==========
  const { currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [todoData, setTodoData] = useState([]);
  let skip = useRef(false);

  async function FirstTimeReadData(currentUser) {
    if (currentUser) {
      document.getElementById("load").classList.add("load");
      const docRef = doc(db, "userdata", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodoData(docSnap.data().data);
        document.getElementById("load").classList.remove("load");
      } else {
        await setDoc(doc(db, "userdata", currentUser.uid), { data: [] });
      }
    } else {
      setTodoData([]);
    }
  }

  useEffect(() => {
    FirstTimeReadData(currentUser);
  }, [currentUser]);

  const updateHandle = async () => {
    if (currentUser && skip) {
      document.getElementById("load").classList.add("load");
      const userDataRef = doc(db, "userdata", currentUser.uid);
      await updateDoc(userDataRef, {
        data: arrayUnion(userData),
      })
        .then(() => {
          document.getElementById("load").classList.remove("load");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (currentUser) {
      updateHandle();
      skip.current = true;
    }
  }, [userData]);
  // ======================================================================
  return (
    <DataContext.Provider
      value={{ userData, setUserData, todoData, setTodoData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
