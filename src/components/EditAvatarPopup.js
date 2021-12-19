import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  onClose,
  isOpen,
  handleEditAvatarClick,
  onUpdateAvatar,
}) {
  const avatarRef = React.useRef("");

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      className="popup_avatar"
      title="Обновить аватар"
      onEditProfile={handleEditAvatarClick}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      nameForm="avatar"
      buttonTitle="Сохранить"
    >
      <label className="popup__form-field">
        <input
          type="url"
          placeholder="Ссылка"
          className="popup__text popup__text_avatar"
          name="userAvatar"
          required
          id="avatar"
          ref={avatarRef}
        />

        <span id="avatar-error" className="error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
