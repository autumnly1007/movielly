import { renderSearchMovies } from './renderMovies.js';

// main 요소에 search 영역 렌더링
const renderSearchMain = () => {
  const html = `
    <div class="search">
      <div class="main-image">
        <div class="img-left"></div>
        <img src="./imgs/popcorn-cat.jpg"/>
        <div class="img-right"></div>
      </div>
      <div class="search-container">
        <div class="search-options">
          <select class="year" name="">
            <option value="" selected>All Years</option>
          </select>
          <select class="type" name="">
            <option value="" selected>All Types</option>
            <option value="movie">movie</option>
            <option value="series">series</option>
            <option value="episode">episode</option>
          </select>
          <select class="page" name="">
            <option value="1" selected>10</option>
            <option value="2">20</option>
            <option value="3">30</option>
          </select>
        </div>
        <div class="search-bar">
          <input class="search-input" type="text" placeholder="영화 제목으로 검색해 보세요!" />
          <button class="search-btn">
            <span class="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </div>`;
  document.querySelector('main').innerHTML = html;
};

// 영화결과 출력 영역 렌더링
export const renderMovieResult = () => {
  if (!document.querySelector('.movie-result')) {
    const movieResultEl = document.createElement('div');
    movieResultEl.className = 'movie-result active';
    const moviesEl = document.createElement('div');
    moviesEl.className = 'movies';
    const loadingEl = document.createElement('div');
    loadingEl.className = 'search-loading';
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      loadingEl.append(span);
    }
    movieResultEl.append(moviesEl, loadingEl);
    document.querySelector('main').append(movieResultEl);
  } else {
    document.querySelector('.movies').innerHTML = '';
  }
};

// 영화 개봉연도 selectBox 생성
const renderSelectYear = () => {
  const selectEl = document.querySelector('.year');
  const curYear = new Date().getFullYear();
  for (let i = curYear; i >= 1985; i--) {
    const optionEl = document.createElement('option');
    optionEl.innerHTML = i;
    optionEl.value = i;
    selectEl.append(optionEl);
  }
};

// 영화 검색 페이지 렌더링
export const renderSearch = () => {
  // main 요소에 search 영역 렌더링
  renderSearchMain();

  // 영화 개봉연도 selectBox 렌더링
  renderSelectYear();

  // 검색 버튼 클릭 이벤트
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', async () => {
    const search = document.querySelector('.search-input').value;
    if (!search) {
      alert('영화 제목을 입력해 주세요.');
      return;
    }
    if (search.length < 3) {
      alert('세 글자 이상 입력해 주세요.');
      return;
    }
    renderSearchMovies();
  });

  // 검색창 엔터키 입력 이벤트
  const search = document.querySelector('.search-input');
  search.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchBtn.click();
    }
  });
};
