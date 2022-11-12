export const initMain = () => {
  document.querySelector('main').innerHTML = '';
};

export const initMovies = () => {
  document.querySelector('.movies').innerHTML = '';
};

export const showLoading = () => {
  document.querySelector('.loading').classList.add('active');
};

export const hideLoading = () => {
  document.querySelector('.loading').classList.remove('active');
};

export const showSearchLoading = () => {
  document.querySelector('.search-loading').classList.add('active');
};

export const hideSearchLoading = () => {
  document.querySelector('.search-loading').classList.remove('active');
};

export const showScrollLoading = () => {
  document.querySelector('.scroll-loading').classList.add('active');
};

export const hideScrollLoading = () => {
  document.querySelector('.scroll-loading').classList.remove('active');
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
