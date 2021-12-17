import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img 
                            className="profile__image" 
                            src={currentUser.avatar} 
                            alt="аватарка" />
                        <button 
                            type="button" 
                            className="profile__avatar-edit-button" 
                            onClick={onEditAvatar}>
                        </button>
                    </div>
                    <div className="profile__card">
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                        <button 
                            className="profile__edit-button" 
                            type="button" 
                            onClick={onEditProfile}>
                        </button>
                    </div>
                </div>
                <button 
                    className="profile__add-button" 
                    type="button" 
                    onClick={onAddPlace}>
                </button>
            </section>

            <section className="elements">
            {cards.map(card => 
            <Card 
            key={card._id} 
            card={card} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />)
            }
            </section>
        </main>
    )
  }
  
  export default Main