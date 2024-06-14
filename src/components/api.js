const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: 'ddc4c4f7-66e9-4455-8175-b3b7ef652c24',
    'Content-Type': 'application/json'
  }
}

export const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    
} 

export const patchProfileData = (name, about) => {

  fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})


} 

export const patchAvatar = (url) => {

  fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: url
  })
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})


} 

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
  .then((res) => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
} 

export const delCardFromServer = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
  headers: config.headers,
  method: 'DELETE',
})
.then((res) => {
  if (res.ok) {
  return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
} 


export const putCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  headers: config.headers,
  method: 'PUT',
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data.likes.length;
  })
}
  

export const delCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  headers: config.headers,
  method: 'DELETE',
})
.then((res) => {
  return res.json();
})
.then((data) => {
  return data.likes.length;
})
}