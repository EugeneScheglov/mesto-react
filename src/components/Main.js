import React from 'react';
import { api } from "../utils/Api";
import Card from "./Card";


function Main({ handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, onCardClick }) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    // Запрос данных профиля через API //
    React.useEffect( () => {
        api.getUserInfo()
        .then(data =>{
            setUserName(data.name);
            setUserDescription(data.about);
            setUserAvatar(data.avatar);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    // Запрос карточек через API //
    React.useEffect( () => {
        api.getInitialCards()
        .then(data => {
            setCards(data)
        })
        .catch(err => {
            console.error(err);
        });
    }, []);


    return (
    <>
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img 
                            className="profile__image" 
                            src={userAvatar} 
                            alt="аватарка" />
                        <button 
                            type="button" 
                            className="profile__avatar-edit-button" 
                            onClick={handleEditAvatarClick}>
                        </button>
                    </div>
                    <div className="profile__card">
                        <div className="profile__info">
                            <h1 className="profile__title">{userName}</h1>
                            <p className="profile__subtitle">{userDescription}</p>
                        </div>
                        <button 
                            className="profile__edit-button" 
                            type="button" 
                            onClick={handleEditProfileClick}>
                        </button>
                    </div>
                </div>
                <button 
                    className="profile__add-button" 
                    type="button" 
                    onClick={handleAddPlaceClick}>
                </button>
            </section>

            <section className="elements">
            {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} />)}
            </section>
        </main>
    </>
    )
  }
  
  export default Main