export const initElement = (element) => {
  document.querySelector(element).innerHTML = '';
};

export const initStorage = (storageName) => {
  if (!localStorage.getItem(storageName)) {
    localStorage.setItem(storageName, '[]');
  }
};
