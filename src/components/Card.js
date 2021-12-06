import React from "react";

function Card({card, onCardClick}) {

    // Обработчик события //
    function handleClick() {
        onCardClick(card);
      }

    return (
        <div class="card">
            <button class="card__trash-button" type="button"></button>
            <img class="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div class="card__item">
                <h2 class="card__info">{card.name}</h2>
                <div class="card__like-box">
                    <button class="card__button-like" type="button"></button>
                    <p class="card__like-count">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;