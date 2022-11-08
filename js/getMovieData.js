const API_KEY = '7035c60c';
const API_URL = 'https://omdbapi.com/';
const defaultId = 'tt0096283';

// 영화 정보 목록 가져오기
export const getMovies = async () => {
  const search = document.querySelector('.search-input').value;
  const type = document.querySelector('.type').value;
  const year = document.querySelector('.year').value;
  const pages = JSON.parse(document.querySelector('.page').value);
  let movieSearch = [];
  for await (const page of pages) {
    const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}&type=${type}&y=${year}&page=${page}`);
    const { Search: movies } = await res.json();
    if (movies) movieSearch.push(...movies);
  }
  return movieSearch;
};

// 영화 상세 정보 가져오기
export const getMovieDetail = async (movieId = defaultId) => {
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
  const movieDetail = await res.json();
  return await movieDetail;
};

// 좋아요한 영화 정보 가져오기
export const getLikeMovies = async () => {
  const likes = JSON.parse(localStorage.getItem('likes'));
  let movieLikes = [];
  for await (const id of likes) {
    const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}`);
    const movies = await res.json();
    if (movies) movieLikes.push(movies);
  }
  return movieLikes;
};
