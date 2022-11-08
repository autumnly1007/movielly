import { getMovies } from './getMovieData.js';
import renderMovies from './renderMovies.js';

const renderSearchMain = () => {
  return `
    <div class="search">
      <div class="desc">
        <p class="emoji">🎬 🎞 🍿 🎥 📽</p>
        <!-- <p class="text">OMDb API 를 이용한 영화 검색 사이트입니다.</p> -->
      </div>
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
          <option value="[1]" selected>10</option>
          <option value="[1, 2]">20</option>
          <option value="[1, 2, 3]">30</option>
        </select>
      </div>
      <div class="search-bar">
        <input class="search-input" type="text" placeholder="영화 제목으로 검색해 보세요!" />
        <button class="search-btn">
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
    <div class="search-result">
      <div class="movies"></div>
    </div>`;
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

const renderSearch = () => {
  document.querySelector('main').innerHTML = renderSearchMain();

  // 영화 개봉연도 selectBox 렌더링
  renderSelectYear();

  // 검색 버튼 클릭 이벤트
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', async () => {
    const movies = await getMovies();
    renderMovies(movies);
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

export default renderSearch;
