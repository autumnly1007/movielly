const API_KEY = '7035c60c';
const API_URL = 'https://omdbapi.com/';
export const DEFAULT_ID = 'tt0096283';
let curPage = 1;

// 영화 정보 목록 가져오기
export const getMovies = async () => {
  const search = document.querySelector('.search-input').value;
  const type = document.querySelector('.type').value;
  const year = document.querySelector('.year').value;
  const pages = Array.from(new Array(Number(document.querySelector('.page').value)), (val, idx) => idx + 1);
  curPage = Number(document.querySelector('.page').value);
  let movieSearch = [];
  for await (const page of pages) {
    const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}&type=${type}&y=${year}&page=${page}`);
    const { Search: movies } = await res.json();
    if (movies) movieSearch.push(...movies);
  }
  return movieSearch;
};

// 영화 상세 정보 가져오기
export const getMovieDetail = async (movieId = DEFAULT_ID) => {
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
  const movieDetail = await res.json();
  return movieDetail;
};

// localStoage 영화 정보 가져오기 (최근 본 영화 정보, 좋아요한 영화 정보)
export const getStorageMovies = async (storageName) => {
  const storage = JSON.parse(localStorage.getItem(storageName));
  let moviesArr = [];
  for await (const id of storage) {
    const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}`);
    const movies = await res.json();
    if (movies) moviesArr.push(movies);
  }
  return moviesArr.reverse();
};

// 무한스크롤 영화 정보 가져오기
export const getScrollMovies = async () => {
  const search = document.querySelector('.search-input').value;
  const type = document.querySelector('.type').value;
  const year = document.querySelector('.year').value;
  const page = ++curPage;
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}&type=${type}&y=${year}&page=${page}`);
  const { Search: movies } = await res.json();
  return movies;
};
