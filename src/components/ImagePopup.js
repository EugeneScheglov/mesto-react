import React from "react";

function ImagePopup({ card, onPopupClick, onClose }) {
  return (
    <div className={`popup ${card && "popup_opened"}`} onClick={onPopupClick}>
      <div className="popup__block">
        <button
          className="popup__close popup__close_image"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__card">
          <img
            className="popup__viewer popup__viewer_image"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <h2 className="popup__viewer popup__viewer_title">
            {card ? card.name : ""}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
