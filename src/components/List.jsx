import React from "react";

function List({ list, removeItem, editItem, changeStatu, searchText }) {
  return (
    <>
      {list
        .filter((item) => {
          if (searchText == "") {
            return item;
          } else if (
            item.title
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase().trim())
          ) {
            return item;
          }
        })
        .map((item) => (
          <li
            className="p-2  w-full flex justify-between items-center gap-20 cursor-pointer"
            key={item.id}
          >
            <div className="flex gap-2 items-center">
              <input  onClick={() => changeStatu(item.id)} type="checkbox" className="checkbox checkbox-bordered h-5 w-5" />
              <h2
                className={` select-none text-xl lg:text-[15px] ${
                  item.statu ? "line-through text-error" : ""
                }`}
              >
                {item.title}
              </h2>
            </div>

            <div className="icons flex gap-4">
              <button onClick={() => editItem(item.id)}>
                {" "}
                <i className="fa-solid fa-clipboard hover:text-lg text-success"></i>
              </button>

              <button onClick={() => removeItem(item.id)}>
                {" "}
                <i className="fa-solid fa-trash hover:text-lg text-error"></i>
              </button>
            </div>
          </li>
        ))}
    </>
  );
}

export default List;
