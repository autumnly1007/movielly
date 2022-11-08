import { renderMovieResult } from './renderSearch';
import { getLikeMovies } from './getMovieData';

// 영화 정보 출력하기
export const renderMovies = (movies) => {
  // 영화결과 출력 영역 렌더링
  renderMovieResult();

  // movies 요소 초기화
  document.querySelector('.movies').innerHTML = '';

  document.querySelector('.movie-result').style.display = 'block';
  const moviesEl = document.querySelector('.movies');

  if (movies.length === 0) {
    const h1El = document.createElement('h1');
    h1El.textContent = '검색 결과가 없습니다. 😢';
    moviesEl.append(h1El);
    return h1El.outerHTML;
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

// 좋아요한 영화 정보 출력하기
export const renderLikes = async () => {
  const movieLikes = await getLikeMovies();
  renderMovies(movieLikes);
};

// 영화 정보가 없을 경우 출력하기
export const renderNotFound = () => {
  const el = document.createElement('div');
  el.className = 'not-found';
  const h1El = document.createElement('h1');
  h1El.innerText = '잘못된 페이지 입니다. 😞';

  const btnEl = document.createElement('button');
  btnEl.innerText = 'Home';
  const aEl = document.createElement('a');
  aEl.href = '#search';
  aEl.append(btnEl);

  el.append(h1El, aEl);
  document.querySelector('main').append(el);
};
