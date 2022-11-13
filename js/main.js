import { deletePopcorn, hideElement, initElement, initStorage } from './setElement.js';
import { renderSearch } from './renderSearch.js';
import { renderLikes } from './renderMovies.js';
import { renderDetail } from './renderDetail.js';

// localStorage 초기화
initStorage('likes');
initStorage('recents');

// 라우터 정의
const routes = [
  { path: 'search', component: renderSearch },
  { path: 'detail', component: renderDetail },
  { path: 'likes', component: renderLikes },
];

// 페이지 초기화 (Search)
renderSearch();

// 해쉬 변경 시 이벤트
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '').split('/')[0];
  let component = '';
  routes.forEach((route) => {
    if (route.path === hash) {
      component = route.component;
      document.querySelector(`.nav-${route.path}`).classList.add('active');
    } else {
      document.querySelector(`.nav-${route.path}`).classList.remove('active');
    }
  });

  // main 요소 초기화
  hideElement('.nav-list');
  initElement('main');
  deletePopcorn();

  // 페이지 렌더링
  component();
});

// 햄버거 클릭 시 nav toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-list').classList.toggle('active');
});
