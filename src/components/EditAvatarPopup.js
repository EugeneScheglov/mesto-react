import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen, handleEditAvatarClick, onUpdateAvatar}) {
  const inputRef= React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
        
        onUpdateAvatar({
          avatar: inputRef.current.value,
        });
        inputRef.current.value = ''
      }

    return (
    <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        onEditProfile={handleEditAvatarClick} 
        onClose={onClose} 
        isOpen={isOpen} 
        onSubmit={handleSubmit} 
        nameForm="avatar"
        >
        <label className="popup__form-field">

            <input 
            type="url" 
            placeholder="Ссылка" 
            className="popup__text popup__text_avatar" 
            name="userAvatar" 
            required 
            id="avatar"
            ref={inputRef}
            />

            <span id="avatar-error" className="error" />
        </label>
    </PopupWithForm>
    )
}

export default EditAvatarPopup;