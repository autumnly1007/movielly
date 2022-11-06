const API_KEY = '7035c60c';
localStorage.setItem('likes', '[]');

// 비동기
(async () => {
  // 영화 개봉연도 selectBox 생성
  createYearSelect();

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
})();

// 영화 정보 가져오기
async function getMovies() {
  const search = document.querySelector('.search-input').value;
  if (!search) {
    alert('영화 제목을 입력해 주세요.');
    return;
  }
  const type = document.querySelector('.type').value;
  const year = document.querySelector('.year').value;
  const pages = JSON.parse(document.querySelector('.page').value);
  let movies = [];
  for await (const page of pages) {
    const res = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${search}&type=${type}&y=${year}&page=${page}`);
    const { Search: moviesData } = await res.json();
    if (moviesData) {
      movies.push(...moviesData);
    }
  }
  return movies;
}

// 영화 정보 출력하기
function renderMovies(movies) {
  const moviesEl = document.querySelector('.movies');
  document.querySelector('.movies').innerHTML = '';
  document.querySelector('.search-result').style.display = 'block';
  if (movies.length === 0) {
    const h1El = document.createElement('h1');
    h1El.textContent = '검색 결과가 없습니다. 😢';
    moviesEl.append(h1El);
    return;
  }
  for (const movie of movies) {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.id = movie.imdbID;

    movieEl.addEventListener('click', () => {
      location.href = `detail.html/${movie.imdbID}`;
    });

    const descEl = document.createElement('div');
    descEl.className = 'desc';
    const h1El = document.createElement('h1');
    h1El.textContent = movie.Title;
    const pEl = document.createElement('p');
    pEl.textContent = movie.Year;
    descEl.append(h1El, pEl);

    const imgEl = document.createElement('img');
    imgEl.alt = movie.Title;
    if (movie.Poster !== 'N/A') {
      imgEl.src = movie.Poster;
    } else {
      imgEl.src = '/imgs/no-image.png';
    }

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-btn');

    const spanEl = document.createElement('span');
    spanEl.className = 'material-symbols-outlined';
    spanEl.innerHTML = 'favorite';
    const likes = JSON.parse(localStorage.getItem('likes'));
    if (likes.includes(movie.imdbID)) {
      spanEl.classList.add('like');
    }

    // 좋아요 버튼 클릭 이벤트
    likeBtn.addEventListener('click', () => {
      const likes = JSON.parse(localStorage.getItem('likes'));
      if (!likes.includes(movie.imdbID)) {
        likes.push(movie.imdbID);
        localStorage.setItem('likes', JSON.stringify(likes));
        spanEl.classList.add('like');
      } else {
        const idx = likes.indexOf(movie.imdbID);
        likes.splice(idx, 1);
        localStorage.setItem('likes', JSON.stringify(likes));
        spanEl.classList.remove('like');
      }
    });
    likeBtn.append(spanEl);

    movieEl.append(imgEl, descEl, likeBtn);
    moviesEl.append(movieEl);
  }
}

// 영화 개봉연도 selectBox 생성
function createYearSelect() {
  const selectEl = document.createElement('select');
  selectEl.className = 'year';
  const optionEl = document.createElement('option');
  optionEl.innerHTML = 'All Years';
  selectEl.append(optionEl);

  const curYear = new Date().getFullYear();
  for (let i = curYear; i >= 1985; i--) {
    const optionEl = document.createElement('option');
    optionEl.innerHTML = i;
    optionEl.value = i;
    selectEl.append(optionEl);
  }
  document.querySelector('.search-options').prepend(selectEl);
}
