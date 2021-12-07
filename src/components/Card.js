import React from "react";

function Card({card, onCardClick}) {

    // Обработчик события //
    function handleClick() {
        onCardClick(card);
      }

    return (
        <div className="card">
            <button className="card__trash-button" type="button"></button>
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="card__item">
                <h2 className="card__info">{card.name}</h2>
                <div className="card__like-box">
                    <button className="card__button-like" type="button"></button>
                    <p className="card__like-count">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;