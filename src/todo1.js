// =============================================================================================
// == Todo app version1 - only add and delete and after refresh all state value goes empty ==
// ==============================================================================================

import React, { useState, useEffect } from "react";
import "./App.css";
// import img1 from "./todolist.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
        return [...oldItem, inputitem];
      });
      setInputItem("");
    }
  };
  let add = (e) => {
    if (e.key === "Enter") {
      addItems();
    }
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
  let deleteCheck = (e) => {
    if (e.key === "Delete") {
      deleteAll();
    }
  };
  useEffect(() => {}, [itemList]);
  document.addEventListener("keydown", changeItem);
  document.addEventListener("keydown", deleteCheck);
  // ========================== JSX ================================
  return (
    <div className="main-div">
      <div className="center-div">
        <br />
        <h1 className="heading">
          {/* <img src={img1} width="23px" alt="logo" /> */}
          To Do List
        </h1>

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
            +
          </button>
          <FontAwesomeIcon
            title="Delete all Task."
            className="delete"
            onClick={deleteAll}
            icon={faTrash}
          />
        </div>

        <div className="all-list">
          {itemList.map((element, index) => {
            return (
              <div key={index} id={index} className="list-div">
                <li className="list-item" id={"id" + index}>
                  {element}
                </li>
                <div className="icons">
                  <FontAwesomeIcon
                    title="Remove"
                    onClick={(e) => removeItem(index)}
                    className="remove"
                    icon={faTrash}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
