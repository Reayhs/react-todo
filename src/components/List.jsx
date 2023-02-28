import React from "react";

function List({ list, removeItem, editItem, changeStatu }) {
  console.log(list);
  return (
    <>
      {list.map((item) => (
        <li
          className="p-2  w-full flex justify-between items-center gap-20 cursor-pointer"
          key={item.id}
        >
          <h2
            onClick={() => changeStatu(item.id)}
            className={` select-none text-xl lg:text-[15px] ${
              item.statu ? "line-through text-error" : ""
            }`}
          >
            {item.title}
          </h2>
          <div className="icons flex gap-4">
            <button onClick={() => editItem(item.id)}>
              {" "}
              <i className="fa-solid fa-clipboard hover:text-lg hover:text-success"></i>
            </button>

            <button onClick={() => removeItem(item.id)}>
              {" "}
              <i className="fa-solid fa-trash hover:text-lg hover:text-error"></i>
            </button>
          </div>
        </li>
      ))}
    </>
  );
}

export default List;
