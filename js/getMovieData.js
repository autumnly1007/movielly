const API_KEY = '7035c60c';
const defaultId = 'tt0096283';

// 영화 정보 가져오기
export const getMovies = async () => {
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
};

export const getMovieDetail = async () => {
  const id = window.location.hash.replace('#', '').split('/')[1] || defaultId;
  console.log(id);
  const res = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&i=${id}`);
  const movieDetail = await res.json();
  console.log(movieDetail);
  return movieDetail;
};
