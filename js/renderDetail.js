import { getMovieDetail } from './getMovieData';

const renderDetail = () => {
  const movieDetail = getMovieDetail();
  const { Poster, Title, Released, Runtime, Country, Ratings, Plot, Director, Actors, Genre } = movieDetail;
  Poster = Poster !== 'N/A' ? Poster : '/imgs/no-image.png';

  // return `상세`;
};

export default renderDetail;
