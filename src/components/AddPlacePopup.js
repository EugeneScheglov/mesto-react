import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ handleAddPlaceClick, onClose, isOpen, onAddPlace }) {
  const nameRef = React.useRef("");
  const linkRef = React.useRef("");

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      className="popup_create"
      title="Новое Место"
      onAddPlace={handleAddPlaceClick}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      nameForm="create"
      buttonTitle="Создать"
    >
      <label className="popup__form-field">
        <input
          type="text"
          placeholder="Название"
          className="popup__text popup__text_place"
          name="name"
          minLength="2"
          maxLength="30"
          required
          id="place"
          ref={nameRef}
        />

        <span id="place-error" className="error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__text popup__text_url"
          name="link"
          required
          id="link"
          ref={linkRef}
        />

        <span id="link-error" className="error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
