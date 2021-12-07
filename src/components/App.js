
import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    // Обработчики всех popup's //
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card){
        setSelectedCard(card)
    }

    // Обработчик закрытия popup's //
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
    }


  return (
    <div className="page">
    <div className="page__container">

        <Header />

        <Main 
            handleEditAvatarClick={ () =>
                setEditAvatarPopupOpen(true)
            }
            handleEditProfileClick={ () =>
                setEditProfilePopupOpen(true)
            }
            handleAddPlaceClick={ () =>
                setAddPlacePopupOpen(true)
            }
            onCardClick={ 
                handleCardClick}
        />

        <Footer />

        <ImagePopup
          card = {selectedCard}
          onClose = {closeAllPopups}
        />

        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            onEditProfile={handleEditProfileClick} 
            onClose={closeAllPopups} 
            isOpen={isEditProfilePopupOpen}
            nameForm="profile"
            >
            <label className="popup__form-field">
                <input type="text" placeholder="Имя" className="popup__text popup__text_name" name="userName" minLength="2" maxLength="40" required id="name"/>
                <span id="name-error" className="error"></span>
            </label>
            <label className="popup__form-field">
                <input type="text" placeholder="Профессия" className="popup__text popup__text_job" name="userAbout" minLength="2" maxLength="200" required id="job"/>
                <span id="job-error" className="error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            onEditProfile={handleEditAvatarClick} 
            onClose={closeAllPopups} 
            isOpen={isEditAvatarPopupOpen}
            nameForm="avatar"
            >
            <label className="popup__form-field">
                <input type="url" placeholder="Ссылка" className="popup__text popup__text_avatar" name="userAvatar" required id="avatar"/>
                <span id="avatar-error" className="error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm 
            name="create" 
            title="Новое Место" 
            onEditProfile={handleAddPlaceClick} 
            onClose={closeAllPopups} 
            isOpen={isAddPlacePopupOpen}
            nameForm="create"
            >
            <label className="popup__form-field">
                <input type="text" placeholder="Название" className="popup__text popup__text_place" name="name" minLength="2" maxLength="30" required id="place" />
                <span id="place-error" className="error"></span>
            </label>
            <label className="popup__form-field">
                <input type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_url" name="link" required id="link" />
                <span id="link-error" className="error"></span>
            </label>
        </PopupWithForm>

        {/* <div className="popup popup_delete">
            <div className="popup__position">
                <button className="popup__close popup__close_delete" type="button"></button>
                <div className="popup__container popup__container_delete">
                    <h2 className="popup__title">Вы уверены?</h2>
                    <form className="popup__form" name="delete">
                        <button type="submit" className="popup__submit popup__submit_delete popup__submit_valid">Да</button>
                    </form>
                </div>
            </div>
        </div> */}

        </div>

    </div>
  );
}

export default App;
