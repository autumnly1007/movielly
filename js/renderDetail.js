import { DEFAULT_ID, getMovieDetail, getStorageMovies } from './getMovieData';
import { setStorage, showElement, hideElement, deletePopcorn } from './setElement';

const renderDetailMovie = async (movieDetail) => {
  let { Poster, Title, Released, Runtime, Country, Ratings, Plot, Director, Actors, Genre, imdbID } = movieDetail;
  Poster = Poster !== 'N/A' ? Poster.replace('SX300', 'SX700') : '/imgs/no-image.png';

  Ratings = Ratings.map((rating) => {
    return `
      <div class="rating">
        <img src='/imgs/${rating.Source}.png' alt='${rating.Source}' />
        <span>${rating.Value}</span>
      </div>`;
  }).join('');

  const html = `
    <div class='detail'>
      <img class="poster" src='${Poster}' alt='${Title}' />
      <div class='info'>
        <div class='title'>
          <h1>${Title}</h1>
        </div>
        <div class='labels'>
          <span>${Released}</span>
          <span>${Runtime}</span>
          <sapn>${Country}</sapn>
          <button class="like-btn">
            <span class="material-symbols-outlined">favorite</span>
          </button>
        </div>
        <div class='plot'>${Plot}</div>
        <div class='ratings'>
          <h3>Ratings</h3>
          ${Ratings}
        </div>
        <div class='actors'>
          <h3>Actors</h3>
          <p>${Actors}</p>
        </div>
        <div class='director'>
          <h3>Director</h3>
          <p>${Director}</p>
        </div>
        <div class='genre'>
          <h3>Genre</h3>
          <p>${Genre}</p>
        </div>
      </div>
    </div>
    <div class='recents'>
      <h1>📌 Recents</h1>
      <div class="recents-loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>`;
  document.querySelector('main').innerHTML = html;

  const likes = JSON.parse(localStorage.getItem('likes'));
  const spanEl = document.querySelector('.like-btn span');
  if (likes.length > 0 && likes.includes(imdbID)) spanEl.classList.add('like');

  // 좋아요 버튼 클릭 이벤트
  document.querySelector('.like-btn').addEventListener('click', () => {
    if (!likes.includes(imdbID)) {
      setStorage('likes', imdbID, 'insert');
      spanEl.classList.add('like');
    } else {
      setStorage('likes', imdbID, 'delete');
      spanEl.classList.remove('like');
    }
  });
};

const renderRecentsMovie = async (movies) => {
  const recentsEl = document.querySelector('.recents');
  const moviesEl = document.createElement('div');
  moviesEl.className = 'movies';

  for (const movie of movies) {
    const movieEl = document.createElement('div');
    movieEl.className = 'movie';
    movieEl.id = movie.imdbID;

    const aEl = document.createElement('a');
    aEl.href = `#detail/${movie.imdbID}`;

    const imgEl = document.createElement('img');
    imgEl.alt = movie.Title;
    imgEl.src = movie.Poster !== 'N/A' ? movie.Poster : '/imgs/no-image.png';

    aEl.append(imgEl);
    movieEl.append(aEl);
    moviesEl.append(movieEl);
  }

  recentsEl.append(moviesEl);
  document.querySelector('main').append(recentsEl);
};

// 영화 상세 정보 렌더링
export const renderDetail = async () => {
  deletePopcorn();
  showElement('.loading');
  const movieId = window.location.hash.replace('#', '').split('/')[1];
  const movieDetail = await getMovieDetail(movieId);
  setRecentsStorage(movieId);
  renderDetailMovie(movieDetail);
  renderRecents();
  hideElement('.loading');
};

// 최근 본 영화 정보 렌더링
const renderRecents = async () => {
  showElement('.recents-loading');
  const movieRecents = await getStorageMovies('recents');
  renderRecentsMovie(movieRecents);
  hideElement('.recents-loading');
};

// 최근 본 영화 정보 셋팅
const setRecentsStorage = (movieId = DEFAULT_ID) => {
  const recents = JSON.parse(localStorage.getItem('recents'));
  if (recents[recents.length - 1] !== movieId) {
    if (recents.includes(movieId)) {
      setStorage('recents', movieId, 'delete');
      setStorage('recents', movieId, 'insert');
    } else {
      setStorage('recents', movieId, 'insert');
    }
  }
};
