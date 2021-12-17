class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(this._url + '/users/me', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(this._url + '/cards', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(this._url + '/users/me', {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(this._checkResponse)
    }

    updateCards(data) {
        return fetch(this._url + '/cards', {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(this._url + `/cards/likes/${id}`, {
          method: `${isLiked ? 'PUT' : 'DELETE'}`,
          headers: this._headers
        })
        .then(this._checkResponse)
      }

    removeCard(id) {
        return fetch(this._url + `/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers

            })
            .then(this._checkResponse)
    }

    setUserAvatar(data) {
        return fetch(this._url + `/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar,
                })
            })
            .then(this._checkResponse)
    }

    getAllNeededData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
    headers: {
      authorization: '1e53c369-0342-4013-857c-26a049ec0854',
      'Content-Type': 'application/json'
    }
  });

export {api};