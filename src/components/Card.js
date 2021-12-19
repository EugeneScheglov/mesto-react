import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки //
  const isOwn = card.owner._id === currentUser._id;

  // Переменная для отображения кнопки удаления //
  const cardDeleteButtonClassName = `card__trash-button ${
    isOwn ? "" : "card__trash-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк //
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Переменная для кнопки лайка //
  const cardLikeButtonClassName = `card__button-like ${
    isLiked ? "card__button-like_active" : ""
  }`;

  // Обработчики событий в карточке //
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__item">
        <h2 className="card__info">{card.name}</h2>
        <div className="card__like-box">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
