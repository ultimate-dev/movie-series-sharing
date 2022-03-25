import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { showLoading } from "../redux/actions";

export default function Pagination({
  count = 0,
  limits = [],
  limit = 3,
  offset = 0,
  onChange,
  className = "",
  lod = true,
}) {
  function Items() {
    let _items = [];

    for (let i = 0; i < Math.ceil(count / limit); i++) {
      _items.push(i + 1);
    }

    return _items;
  }

  function setChange(offset, limit) {
    onChange(offset, limit);
    if (lod) {
      showLoading(600);
    }
  }

  return (
    <div className={"app-pagination " + className}>
      <select
        className="form-control mr-2"
        type="number"
        value={limit}
        onChange={(e) => {
          onChange(0, e.target.value);
        }}
      >
        {limits.map((p, i) => (
          <option value={p} key={i}>
            {p}
          </option>
        ))}
      </select>
      <button
        className="app-pagination-item"
        disabled={1 > offset ? true : false}
        onClick={() => setChange(offset - 1 >= 0 ? offset - 1 : offset, limit)}
      >
        <BsChevronLeft size={20} />
      </button>

      {Items().map((p, i) => (
        <button
          className={"app-pagination-item" + (i == offset ? " active" : "")}
          key={i}
          onClick={() => setChange(i, limit)}
        >
          {p}
        </button>
      ))}

      <button
        className="app-pagination-item"
        disabled={Math.ceil(count / limit) - 1 <= offset ? true : false}
        onClick={() =>
          setChange(
            offset + 1 < Math.ceil(count / limit) ? offset + 1 : offset,
            limit
          )
        }
      >
        <BsChevronRight size={20} />
      </button>
    </div>
  );
}
