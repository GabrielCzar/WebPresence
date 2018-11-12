const inputDateInit = document.querySelector('#date_init');
inputDateInit.addEventListener('keyup', function (evt) {
   const year = evt.slice(0, 4);
   const month = evt.slice(4, 6);
   const day = evt.slice(6, 8);
   inputDateInit.textContent = year + '/' + month + '/' + day;
});