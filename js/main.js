const API_KEY = '7035c60c';
let search = 'cat';
let page = 1;
let year = '';

// 비동기
(async () => {
  const moreBtn = document.querySelector('.btn');
  const searchBtn = document.querySelector('.search-btn');

  // 영화 정보 가져오기
  // const movies = await getMovies();

  // 영화 정보 출력하기
  // renderMovies(movies);

  // 영화 개봉연도 selectBox 생성
  createYearSelect();

  // 검색 버튼 클릭 이벤트
  searchBtn.addEventListener('click', async () => {
    const movies = await getMovies(page);
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

  // 더보기 버튼 클릭 이벤트
  moreBtn.addEventListener('click', async () => {
    const movies = await getMovies(page);
    page += 1;
    renderMovies(movies);
  });
})();

// 영화 정보 가져오기
async function getMovies(page = 1) {
  const search = document.querySelector('.search-input').value;
  if (!search) {
    alert('영화 제목을 입력해 주세요.');
    return;
  }
  const year = document.querySelector('.year').value;
  const type = document.querySelector('.type').value;
  document.querySelector('.movies').innerHTML = '';
  const res = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${search}&type=${type}&y=${year}&page=${page}`);
  const { Search: movies } = await res.json();
  return movies;
}

// 영화 정보 출력하기
function renderMovies(movies) {
  const moviesEl = document.querySelector('.movies');
  for (const movie of movies) {
    const el = document.createElement('div');
    el.classList.add('movie');

    const h1El = document.createElement('h1');
    h1El.textContent = movie.Title;

    h1El.addEventListener('click', () => {
      console.log(movie.Title);
    });

    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster;

    el.append(imgEl, h1El);
    moviesEl.append(el);
  }
  document.querySelector('.actions .btn').style.display = 'inline-block';
}

// 영화 개봉연도 selectBox 생성
function createYearSelect() {
  const select = document.createElement('select');
  select.className = 'year';
  const option = document.createElement('option');
  option.innerHTML = 'All Years';
  select.append(option);

  const curYear = new Date().getFullYear();
  for (let i = curYear; i >= 1985; i--) {
    const option = document.createElement('option');
    option.innerHTML = i;
    option.value = i;
    select.append(option);
  }
  document.querySelector('.search-options').prepend(select);
}
