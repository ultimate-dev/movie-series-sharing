import React, { useEffect, useState } from "react";
import { MdInsertPhoto, MdClose } from "react-icons/md";

export default function ImagePicker({
  value = "",
  className = "",
  height = 200,
  width = 200,
  onChange = () => {},
  fit = "cover",
  isClearBtn = false,
  circle,
  disabled,
}) {
  const _className = className ? " " + className : "";
  const [image, setImage] = useState("");

  function onImageFile(files) {
    const selected = files[0];
    if (selected) {
      const rend = new FileReader();
      rend.onloadend = () => {
        setImage(rend.result);
      };
      rend.readAsDataURL(selected);
      onChange(selected);
    }
  }

  function onClear() {
    setImage("");
    onChange("");
  }

  return (
    <div
      className={
        "app-image-picker" + _className + (circle ? " rounded-circle" : "")
      }
      style={{ height: height, width: width }}
    >
      {isClearBtn ? (
        image || value ? (
          <div className="app-image-picker-clear" onClick={() => onClear()}>
            <MdClose />
          </div>
        ) : null
      ) : null}
      <label
        className={"app-image-picker-label" + (circle ? " rounded-circle" : "")}
      >
        {image || value ? (
          <img
            className={
              "app-image-picker-img" + (circle ? " rounded-circle" : "")
            }
            src={image ? image : value}
            style={{ objectFit: fit }}
            draggable={false}
          />
        ) : (
          <MdInsertPhoto className="app-image-picker-label-icon" />
        )}
        <input
          type="file"
          className="app-image-picker-label-input"
          onChange={(e) => onImageFile(e.target.files)}
          accept="image/*"
          disabled={disabled}
        />
      </label>
    </div>
  );
}
