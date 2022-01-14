import React, {useState } from "react";
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// faCheckCircle
function Todo(){
    let [inputitem, setInputItem] = useState("");
    let [itemList, setItemList] = useState([]);

    // useEffect(() => {
    //     document.getElementById("input").focus();
    // })


   let  changeItem = (e) => {
      setInputItem(e.target.value);
    }
    // let removeAlldone = () => {
    //     itemList.forEach((v, index) => {
    //         let i = "id" + index;
    //         let underline = document.getElementById(i);
    //         underline.classList.remove("line-through");
    //     })
        
    // }
    
    // element of li tag:=> <FontAwesomeIcon title="Done" onClick={(e) =>done(index)} id={index} className='check' icon={faCheckCircle} />
    // let done = (index) => {
    //         let i = "id" + index;

    //     if (index != null) {
    //         let underline = document.getElementById(i);
    //         underline.classList.add("line-through");
    //     }
    // }
    let removeItem = (id) => {
//   let i = "id" + id;
//         let underline = document.getElementById(i);
//         underline.classList.remove("line-through");
 setItemList((oldItem) => {
    
       return oldItem.filter((arrItem, index) => {
            return index !== id;
       })
     
    })
    
        // done(id)
    }
    let add = (e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
            if (inputitem !== "") {
            setItemList((oldItem) => {
                return [...oldItem, inputitem];
            });
            setInputItem("");
        }
    }
    }
    
    let addItems = () => {
        
        if (inputitem !== "") {
            setItemList((oldItem) => {
                return [...oldItem, inputitem];
            });
            setInputItem("");
        }
    }

    let deleteAll = () => {
        setItemList([]);
    }
    let deleteCheck = (e) => {
        // console.log(e);
        if (e.key === "Delete") {

            deleteAll();
      }
    }
    document.addEventListener("keydown", changeItem);
    document.addEventListener("keydown", deleteCheck);
   
  return (
    <div className="main-div">
      <div className='center-div'><br />
        <h1 className="heading">To Do List</h1>
             
              <div className="inpbtn">
        <input type="text" onChange={changeItem}id="input" onKeyPress={add} value={inputitem} placeholder='Add a Item' className='input-text'/>       
                  <button className='btnadd' title="Add item in bucket." onClick={addItems} >+</button>
                  <FontAwesomeIcon title="Delete all Task." className='delete' onClick={deleteAll} icon={faTrash} />
                  </div>
       
        <div className="all-list">
              {itemList.map((element, index) => { return (<div key={index} id={index} className="list-div"><li className="list-item" id={"id"+index} >{element}</li><div className="icons"><FontAwesomeIcon title="Remove" onClick={(e) =>removeItem(index)} className='remove' icon={faTrash} /></div></div>); })}
          
        </div>
    </div>
    </div>
  );
    }


export default Todo;
