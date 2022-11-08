import { getMovieDetail } from './getMovieData';
import { hideLoading, showLoading } from './setElement';

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
    </div>`;
  document.querySelector('main').innerHTML = html;

  const likes = JSON.parse(localStorage.getItem('likes'));
  const spanEl = document.querySelector('.like-btn span');
  if (likes.includes(imdbID)) spanEl.classList.add('like');

  // 좋아요 버튼 클릭 이벤트
  document.querySelector('.like-btn').addEventListener('click', () => {
    if (!likes.includes(imdbID)) {
      likes.push(imdbID);
      localStorage.setItem('likes', JSON.stringify(likes));
      spanEl.classList.add('like');
    } else {
      const idx = likes.indexOf(imdbID);
      likes.splice(idx, 1);
      localStorage.setItem('likes', JSON.stringify(likes));
      spanEl.classList.remove('like');
    }
  });
};

// 영화 상세 정보 렌더링
export const renderDetail = async () => {
  showLoading();
  const movieId = window.location.hash.replace('#', '').split('/')[1];
  const movieDetail = await getMovieDetail(movieId);
  renderDetailMovie(movieDetail);
  hideLoading();
};
