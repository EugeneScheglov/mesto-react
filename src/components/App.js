
import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    
    // Отрисовка карточек по запросу //
    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => console.log(err));
        }, []);
            // Функция для лайка карточки //
        function handleCardLike(card) {
            // Снова проверяем, есть ли уже лайк на этой карточке //
            const isLiked = card.likes.some(i => i._id === currentUser._id);
            
            // Отправляем запрос в API и получаем обновлённые данные карточки //
            api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
        }
    
            // Функция для удаления карточки //
        function handleCardDelete(card) {
            api.removeCard(card._id)
          .then(() => {
            setCards(cards.filter((item) => item !== card));
          })
          .catch((err) => console.log(err));
        };

    // Обработчики событий всех popup's //
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
        };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
        };

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
        };

    function handleCardClick(card){
        setSelectedCard(card)
        };

    // Обработчик закрытия popup's //
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        };

    // Запрос в API для отрисовки данных //
    React.useEffect(() => {
        api.getUserInfo()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => console.log(err));
        }, []);
        // PROFILE //
    function handleUpdateUser(userData) {
        api.setUserInfo(userData)
          .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
          })
          .catch((err) => console.log(err));
        };
        // AVATAR //
    function handleUpdateAvatar(avatar){
        api.setUserAvatar(avatar)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err => {
            console.error(err);
        })
        };

    function handleAddPlaceSubmit(data) {
        api.updateCards(data)
          .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
          })
          .catch((err) => console.log(err))
        };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <div className="page__container">

        <Header />

        <Main 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick} 
            cards={cards} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete}
        />

        <Footer />

        <ImagePopup
        card = {selectedCard} 
        onClose = {closeAllPopups}
        />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} 
        />

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}  
        onClose={closeAllPopups}  
        onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}       
        onAddPlace={handleAddPlaceSubmit} 
        />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
