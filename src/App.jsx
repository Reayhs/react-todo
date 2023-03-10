import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import List from "./components/List";

const getLocalStorage = () => {
  let storage = localStorage.getItem("list");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

function App() {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const [control, setControl] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      showAlert(true, "error", "Please Enter Value");
      setControl(true);
      setTimeout(() => {
        setControl(false);
      }, 3000);
      setText("");
    } else if (text && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: text };
          }
          return item;
        })
      );
      setIsEditing(false);
      setText("");
      showAlert(true, "success", "value changed");
      setEditId(null);
    } else {
      showAlert(true, "success", "Item Added To The List");
      const user = { id: Date.now(), title: text, statu: false };
      setList([...list, user]);
      setText("");
      setControl(false);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const changeStatu = (el) => {
    const change = list.map((item) =>
      item.id === el ? { ...item, statu: !item.statu } : item
    );
    setList(change);
  };

  const clearList = () => {
    const change = list.filter((item) => !item.statu);
    console.log(change.length);
    setList(change);

    if (list.length > change.length) {
      showAlert(true, "error", "Tasks deleted");
      if (isEditing) {
        setIsEditing(false);
        setText("");
      }
    } else {
      showAlert(true, "error", "selected task not found");
    }
  };

  const removeItem = (id) => {
    if (isEditing && editId === id) {
      showAlert(true, "error", "You are currently updating value");
      return list;
    }
    showAlert(true, "error", "item removed");
    const filters = list.filter((item) => item.id !== id);
    setList(filters);
  };

  const editItem = (id) => {
    const editIt = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditId(id);
    setText(editIt.title);
  };

  localStorage.setItem("list", JSON.stringify(list));

  return (
    <>
      <div className="wrapper flex flex-col  items-center mt-20 w-auto mx-80 lg:mx-4 shadow-2xl rounded-2xl p-16 lg:px-10 pd:px-6 text-white relative">
        <div className="title text-center flex flex-col gap-4">
          <h1 className={`text-4xl ${control && "text-error"} pd:text-[30px] `}>To Do App</h1>
          {alert.show && <Alert showAlert={showAlert} {...alert} list={list} />}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-1 mt-8">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="..."
            className={`input input-bordered ${
              control && "input-error"
            }  w-full max-w-xs`}
          />
          <button className="btn btn-outline">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </form>
        <ul className="flex flex-col gap-2 justify-between items-center p-4 w-full ">
          <List
            list={list}
            removeItem={removeItem}
            editItem={editItem}
            changeStatu={changeStatu}
            searchText={searchText}
          />
        </ul>
        {list.length > 0 && (
          <>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search"
              className={`input input-bordered w-46  max-w-xs absolute top-2 right-8 pd:w-40 pd:text-[10px]`}
            />
            <button
              onClick={clearList}
              className="btn btn-outline btn-error mt-4 pd:w-40 pd:text-[10px]"
            >
              delete completed tasks
            </button>{" "}
            <h2 className="mt-4 text-lg w-full ml-12 pd:text-[15px] pd:ml-16">Todo: {list.length}</h2>
          </>
        )}
      </div>
    </>
  );
}

export default App;
