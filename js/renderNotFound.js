const renderNotFound = () => {
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

export default renderNotFound;
