export const showLoading = () => {
  document.querySelector('.loading').classList.add('active');
};

export const hideLoading = () => {
  document.querySelector('.loading').classList.remove('active');
};

export const initMovies = () => {
  document.querySelector('.movies').innerHTML = '';
};

export const initMain = () => {
  document.querySelector('main').innerHTML = '';
};
