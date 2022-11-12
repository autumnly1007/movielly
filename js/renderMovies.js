import { initElement, showElement, hideElement, setStorage, scrollToElement } from './setElement';
import { getMovies, getStorageMovies, getScrollMovies } from './getMovieData';
import { renderMovieResult } from './renderSearch';

// 영화 정보 렌더링
export const renderMovies = (movies) => {
  for (const movie of movies) {
    const movieEl = document.createElement('div');
    movieEl.className = 'movie';
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
      const likes = JSON.parse(localStorage.getItem('likes'));
      if (!likes.includes(movie.imdbID)) {
        setStorage('likes', movie.imdbID, 'insert');
        spanEl.classList.add('like');
      } else {
        setStorage('likes', movie.imdbID, 'delete');
        spanEl.classList.remove('like');
      }
    });
    likeBtn.append(spanEl);
    aEl.append(imgEl, descEl);
    movieEl.append(aEl, likeBtn);
    document.querySelector('.movies').append(movieEl);
  }
};

// 검색한 영화 정보 렌더링
export const renderSearchMovies = async () => {
  renderMovieResult();
  showElement('.movie-result');
  showElement('.search-loading');
  const movies = await getMovies();
  initElement('.movies');
  if (movies.length > 0) {
    renderMovies(movies);
    infinityScroll();
    showElement('.scroll-loading');
    scrollToElement('.movie-result', 25);
  } else {
    showElement('.not-result');
    document.querySelector('.not-result').addEventListener(
      'animationend',
      () => {
        hideElement('.not-result');
      },
      false
    );
    hideElement('.movie-result');
    hideElement('.scroll-loading');
  }
  hideElement('.search-loading');
};

// 좋아요한 영화 정보 렌더링 (likes 페이지)
export const renderLikes = async () => {
  showElement('.loading');
  const movieLikes = await getStorageMovies('likes');
  renderMovieResult();
  if (movieLikes.length > 0) {
    renderMovies(movieLikes);
  } else {
    const moviesEl = document.querySelector('.movies');
    const h1El = document.createElement('h1');
    h1El.textContent = '해당하는 영화가 없습니다. 😢';
    moviesEl.append(h1El);
  }
  hideElement('.loading');
};

// 무한스크롤 영화 정보 렌더링
export const renderScrollMovies = async () => {
  const movies = await getScrollMovies();
  if (movies) {
    renderMovies(movies);
  } else {
    hideElement('.scroll-loading');
  }
};

// 무한 스크롤 (한 페이지씩 증가)
const infinityScroll = () => {
  let scrollLoading = document.querySelector('.scroll-loading');
  if (!scrollLoading) {
    scrollLoading = document.createElement('div');
    scrollLoading.className = 'scroll-loading';
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      scrollLoading.append(span);
    }
    document.querySelector('main').append(scrollLoading);
  }
  const option = {
    threshold: 1,
  };
  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (document.querySelector('.movie')) {
          await renderScrollMovies();
        }
        observer.observe(scrollLoading);
      }
    });
  };
  const observer = new IntersectionObserver(callback, option);
  observer.observe(scrollLoading);
};
