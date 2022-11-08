import { showLoading, hideLoading, initMovies } from './setElement';
import { getLikeMovies, getMovies } from './getMovieData';
import { renderMovieResult } from './renderSearch';

// 영화 정보 렌더링
export const renderMovies = (movies) => {
  // 영화결과 출력 영역 렌더링
  renderMovieResult();

  // movies 요소 초기화
  initMovies();

  const moviesEl = document.querySelector('.movies');
  if (!movies || movies.length === 0) {
    const h1El = document.createElement('h1');
    h1El.textContent = '해당하는 영화가 없습니다. 😢';
    moviesEl.append(h1El);
    hideLoading();
    return;
  }

  for (const movie of movies) {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.id = movie.imdbID;

    const aEl = document.createElement('a');
    aEl.href = `#detail/${movie.imdbID}`;

    const descEl = document.createElement('div');
    descEl.className = 'desc';
    const h1El = document.createElement('h1');
    h1El.textContent = movie.Title;
    const pEl = document.createElement('p');
    pEl.textContent = movie.Year;
    descEl.append(h1El, pEl);

    const imgEl = document.createElement('img');
    imgEl.alt = movie.Title;
    imgEl.src = movie.Poster !== 'N/A' ? movie.Poster : '/imgs/no-image.png';

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-btn');
    const spanEl = document.createElement('span');
    spanEl.className = 'material-symbols-outlined';
    spanEl.innerHTML = 'favorite';
    const likes = JSON.parse(localStorage.getItem('likes'));
    if (likes.includes(movie.imdbID)) spanEl.classList.add('like');

    // 좋아요 버튼 클릭 이벤트
    likeBtn.addEventListener('click', () => {
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
    aEl.append(imgEl, descEl);
    movieEl.append(aEl, likeBtn);
    moviesEl.append(movieEl);
  }
};

// 검색한 영화 정보 렌더링
export const renderSearchMovies = async () => {
  showLoading();
  const movies = await getMovies();
  renderMovies(movies);
  hideLoading();
};

// 좋아요한 영화 정보 렌더링 (likes 페이지)
export const renderLikes = async () => {
  showLoading();
  const movieLikes = await getLikeMovies();
  renderMovies(movieLikes);
  hideLoading();
};
