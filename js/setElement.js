export const initElement = (element) => {
  document.querySelector(element).innerHTML = '';
};

export const initStorage = (storageName) => {
  if (!localStorage.getItem(storageName)) {
    localStorage.setItem(storageName, '[]');
  }
};

export const showElement = (element) => {
  document.querySelector(element).classList.add('active');
};

export const hideElement = (element) => {
  document.querySelector(element).classList.remove('active');
};

export const scrollMovieResult = () => {
  let location = document.querySelector('.movie-result').offsetTop - 85;
  window.scrollTo({ top: location, behavior: 'smooth' });
};

export const setStorage = (storageName, item, type) => {
  const storage = JSON.parse(localStorage.getItem(storageName));
  if (type === 'insert') {
    storage.push(item);
  } else if (type === 'delete') {
    const idx = storage.indexOf(item);
    storage.splice(idx, 1);
  }
  localStorage.setItem(storageName, JSON.stringify(storage));
};
