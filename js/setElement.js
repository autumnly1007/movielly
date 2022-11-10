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

export const initMovies = () => {
  document.querySelector('.movies').innerHTML = '';
};

export const initMain = () => {
  document.querySelector('main').innerHTML = '';
};
