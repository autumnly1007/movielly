// 영화 정보 출력하기
const renderMovies = (movies) => {
  const moviesEl = document.querySelector('.movies');
  document.querySelector('.movies').innerHTML = '';
  document.querySelector('.search-result').style.display = 'block';

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
    aEl.append(imgEl, descEl);
    movieEl.append(aEl, likeBtn);
    moviesEl.append(movieEl);
  }
};

export default renderMovies;
