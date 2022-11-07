import renderSearch from './renderSearch.js';
import renderDetail from './renderDetail.js';
import renderLikes from './renderLikes.js';
import renderNotFound from './renderNotFound.js';
import { initMovies, initMain } from './initElement.js';
// import renderMovies from './renderMovies.js';
// import { getMovies, getMovieDetail } from './getMovieData.js';

// localStorage 초기화
if (!localStorage.getItem('likes')) {
  localStorage.setItem('likes', '[]');
}

// 페이지 초기화 (Search)
renderSearch();

const routes = [
  { path: 'search', component: renderSearch },
  { path: 'detail', component: renderDetail },
  { path: 'likes', component: renderLikes },
];

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '').split('/')[0];
  let component = renderNotFound;
  routes.forEach((route) => {
    if (route.path === hash) {
      component = route.component;
      document.querySelector(`.nav-${route.path}`).classList.add('active');
    } else {
      document.querySelector(`.nav-${route.path}`).classList.remove('active');
    }
  });
  initMain();
  component();
});
