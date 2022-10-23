import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FaReact } from "react-icons/fa";

function Todo() {
  let [inputitem, setInputItem] = useState("");
  let [itemList, setItemList] = useState([]);
  // -----------------------------------------------
  let changeItem = (e) => {
    setInputItem(e.target.value);
  };
  let addItems = () => {
    if (inputitem !== "") {
      setItemList((oldItem) => {
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
  let completeTask = (id) => {
    setItemList((oldItem) => {
      oldItem[id].status = true;
      return [...oldItem];
    });
  };
  let removeItem = (id) => {
    setItemList((oldItem) => {
      return oldItem.filter((arrItem, index) => {
        return index !== id;
      });
    });
  };
  let deleteAll = () => {
    setItemList([]);
  };
  // ---------------------------- Update LocalStorage --------------------------------------
  useEffect(() => {
    let data = localStorage.getItem("todoList");
    data === null ? setItemList([]) : setItemList(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(itemList));
  }, [itemList]);
  // ========================== JSX ================================
  return (
    <div className="main-div">
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
            placeholder="Add a Item"
            className="input-text"
          />
          <button
            className="btnadd"
            title="Add item in bucket."
            onClick={addItems}
          >
            Add
          </button>
          <button
            className="btnadd"
            title="Delete All Task"
            onClick={deleteAll}
          >
            Remove All
          </button>
        </div>

        <div className="all-list">
          {itemList.map((element, index) => {
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
