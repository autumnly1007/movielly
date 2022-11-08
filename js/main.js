import { renderSearch } from './renderSearch.js';
import { renderLikes, renderNotFound } from './renderMovies.js';
import renderDetail from './renderDetail.js';

// localStorage 초기화
if (!localStorage.getItem('likes')) {
  localStorage.setItem('likes', '[]');
}

// 페이지 초기화 (Search)
renderSearch();

// 라우터
const routes = [
  { path: 'search', component: renderSearch },
  { path: 'detail', component: renderDetail },
  { path: 'likes', component: renderLikes },
];

// 해쉬 변경 시 이벤트
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

  // main 요소 초기화
  document.querySelector('main').innerHTML = '';

  // 페이지 렌더링
  component();
});
