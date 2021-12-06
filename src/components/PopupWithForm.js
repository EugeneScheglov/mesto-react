function PopupWithForm({ name, title, buttonTitle = 'Сохранить', isOpened, onClose, children }) {
  return (
    <div className={`popup popup_${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__position">
        <button type="button" 
        className="popup__close" 
        onClick={onClose}>
        </button>
          <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" name="???" noValidate>
              {children}
              <button type="submit" className="popup__submit">{buttonTitle}</button>
            </form>
          </div>
      </div>
    </div>
    )
  }

export default PopupWithForm;