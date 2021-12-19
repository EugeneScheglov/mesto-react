function PopupWithForm({
  title,
  buttonTitle,
  isOpen,
  onClose,
  children,
  onSubmit,
  onButton,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__position">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__submit">
              {buttonTitle}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
