// =============================================================================================
// === Todo app version 3 - working with firebase - authentication and database storage ===
// ==============================================================================================

import React, { useState, useContext } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FaReact } from "react-icons/fa";
import Login from "./login";
import { DataContext } from "./DataContext";
import { auth, db } from "./firebase";
import { AuthContext } from "./AuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

function Todo() {
  let [inputitem, setInputItem] = useState("");

  // ============ Reading Current User Data from Context API ==========
  const { currentUser } = useContext(AuthContext);
  const { userData, setUserData, todoData, setTodoData } =
    useContext(DataContext);

  // -----------------------------------------------
  let changeItem = (e) => {
    setInputItem(e.target.value);
  };
  let addItems = () => {
    if (inputitem !== "") {
      setUserData((oldItem) => {
        return { title: inputitem, status: false };
      });
      setTodoData((oldItem) => {
        return [...oldItem, { title: inputitem, status: false }];
      });
      setInputItem("");
    }
  };
  let add = (e) => {
    if (e.key === "Enter") {
      addItems();
    }
  };
  let completeTask = async (id) => {
    if (currentUser) {
      document.getElementById("load").classList.add("load");
      const userDataRef = doc(db, "userdata", currentUser.uid);
      await updateDoc(userDataRef, {
        data: arrayRemove(todoData[id]),
      }).then(() => {
        document.getElementById("load").classList.remove("load");
        setTodoData((oldItem) => {
          oldItem[id].status = true;
          return [...oldItem];
        });
      });
      document.getElementById("load").classList.add("load");
      await updateDoc(userDataRef, {
        data: arrayUnion(todoData[id]),
      }).then(() => {
        document.getElementById("load").classList.remove("load");
      });
    } else {
      setTodoData((oldItem) => {
        oldItem[id].status = true;
        return [...oldItem];
      });
    }
  };

  let removeItem = async (id) => {
    if (currentUser) {
      document.getElementById("load").classList.add("load");
      const userDataRef = doc(db, "userdata", currentUser.uid);
      await updateDoc(userDataRef, {
        data: arrayRemove(todoData[id]),
      }).then(() => {
        document.getElementById("load").classList.remove("load");
        setTodoData((oldItem) => {
          return oldItem.filter((arrItem, index) => {
            return index !== id;
          });
        });
      });
    } else {
      setTodoData((oldItem) => {
        return oldItem.filter((arrItem, index) => {
          return index !== id;
        });
      });
    }
  };

  let deleteAll = async () => {
    if (currentUser) {
      document.getElementById("load").classList.add("load");
      const userDataRef = doc(db, "userdata", currentUser.uid);
      await updateDoc(userDataRef, {
        data: [],
      }).then(() => {
        document.getElementById("load").classList.remove("load");
        setTodoData([]);
      });
    } else {
      setTodoData([]);
    }
  };
  // ========================== JSX ================================
  return (
    <div className="main-div">
      <Login />
      <div className="center-div">
        <br />
        <h1 className="heading">To Do List</h1>

        <div className="inpbtn">
          <input
            type="text"
            onChange={changeItem}
            id="input"
            onKeyPress={add}
            value={inputitem}
            placeholder="Type a item to add"
            className="input-text"
            autoComplete="off"
          />
          <button
            className={`btnadd ${
              inputitem.length === 0 ? "disableBtn" : "btnadd"
            }`}
            title="Add item in bucket."
            onClick={addItems}
          >
            Add
          </button>
          <button
            className={`btnadd ${
              todoData.length === 0 ? "disableBtn" : "btnadd"
            }`}
            title="Delete All Task"
            onClick={deleteAll}
          >
            Remove All
          </button>
        </div>

        <div className="all-list">
          {todoData &&
            todoData.map((element, index) => {
              return (
                <div key={index} id={index} className="list-div">
                  <li
                    className={`list-item ${
                      element.status ? "completed-task" : ""
                    }`}
                    id={"id" + index}
                  >
                    {element.title}
                  </li>
                  <div className="icons">
                    <div
                      title="Complete"
                      onClick={(e) => completeTask(index)}
                      className={`${
                        element.status ? " check-complete" : "check  "
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div
                      title="Remove"
                      onClick={(e) => removeItem(index)}
                      className="remove"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <p>
        <a href="https://www.linkedin.com/in/mdmojahid01/" target="blank">
          Made in <FaReact style={{ fontWeight: "600" }} /> By Md Mojahid
        </a>
      </p>
    </div>
  );
}

export default Todo;
