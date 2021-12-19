import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import DeletePlacePopup from "./DeletePlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState({});

  // Отрисовка карточек с индификацией пользователя по запросу //
  React.useEffect(() => {
    api
      .getAllNeededData()
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  // Функция для лайка карточки //
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке //
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки //
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  // Функция для удаления карточки //

  function handleCardDelete(evt) {
    evt.preventDefault();
    api
      .removeCard(cardForDelete._id)
      .then(() => {
        const newCards = cards.filter((elem) => elem !== cardForDelete);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Обработчики событий всех popup's //
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeletePlaceClick(card) {
    setDeletePlacePopupOpen(true);
    setCardForDelete(card);
  }

  // Обработчики close popup's //
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setSelectedCard(null);
  }

  // setPROFILE //
  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // setAVATAR //
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // setCard //
  function handleAddPlaceSubmit(data) {
    api
      .updateCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

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
            onCardDelete={handleDeletePlaceClick}
          />

          <Footer />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            className="popup_image"
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

          <DeletePlacePopup
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
