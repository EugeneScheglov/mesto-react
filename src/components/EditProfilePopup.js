import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Использование компонентов профиля //
    React.useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser])
    
    function handleNameChange(e) {
        setName(e.target.value)
    }
      
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы //
        e.preventDefault()
        // Передаём значения управляемых компонентов во внешний обработчик //
        props.onUpdateUser({
          name: name,
          about: description,
        })
    }
    
    return (
    <PopupWithForm 
        name="profile" 
        title="Редактировать профиль"  
        onClose={props.onClose} 
        isOpen={props.isOpen}
        nameForm="profile"
        onSubmit={handleSubmit}
    >
            <label className="popup__form-field">

                <input 
                type="text" 
                placeholder="Имя" 
                className="popup__text popup__text_name" 
                name="userName" 
                minLength="2" 
                maxLength="40" 
                required id="name"
                onChange={handleNameChange}
                value={name || ''}
                />

                <span id="name-error" className="error"></span>
            </label>
            <label className="popup__form-field">

                <input 
                type="text" 
                placeholder="О себе" 
                className="popup__text popup__text_job" 
                name="userAbout" 
                minLength="2" 
                maxLength="200" 
                required id="job"
                onChange={handleDescriptionChange}
                value={description || ''}
                />

                <span id="job-error" className="error"></span>
            </label>
    </PopupWithForm>
    )
}

export default EditProfilePopup;