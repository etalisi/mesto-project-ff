const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: 'ddc4c4f7-66e9-4455-8175-b3b7ef652c24',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  }

export const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(handleResponse)
} 

export const patchProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
})
.then(handleResponse)
} 

export const patchAvatar = (url) => {

  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: url
  })
})
.then(handleResponse)
} 

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(handleResponse);
} 

export const postNewCard = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
  method: 'POST',
  body: JSON.stringify({
    name: newCard.name,
    link: newCard.link
  }),
})
.then(handleResponse)
} 

export const delCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
  headers: config.headers,
  method: 'DELETE',
})
.then(handleResponse)
} 


export const putCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  headers: config.headers,
  method: 'PUT',
})
  .then(handleResponse)
  .then((data) => {
    return data.likes.length;
  })
}
  

export const delCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  headers: config.headers,
  method: 'DELETE',
})
.then(handleResponse)
.then((data) => {
  return data.likes.length;
})
}