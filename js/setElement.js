export const initElement = (element) => {
  document.querySelector(element).innerHTML = '';
};

export const initStorage = (storageName) => {
  if (!localStorage.getItem(storageName)) {
    localStorage.setItem(storageName, '[]');
  }
};

export const showElement = (element) => {
  document.querySelector(element).classList.add('active');
};

export const hideElement = (element) => {
  document.querySelector(element).classList.remove('active');
};

export const scrollToElement = (element, height = 0) => {
  let location = document.querySelector(element).offsetTop - height;
  window.scrollTo({ top: location, behavior: 'smooth' });
};

export const setStorage = (storageName, item, type) => {
  const storage = JSON.parse(localStorage.getItem(storageName));
  if (type === 'insert') {
    storage.push(item);
  } else if (type === 'delete') {
    const idx = storage.indexOf(item);
    storage.splice(idx, 1);
  }
  localStorage.setItem(storageName, JSON.stringify(storage));
};
