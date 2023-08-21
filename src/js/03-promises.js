import Notiflix from 'notiflix';

const form = document.querySelector('.form');

addEventListener('submit', listPromises);

function listPromises(evt) {
  evt.preventDefault();
  const firstDelay = parseInt(
    document.querySelector('input[name="delay"]').value
  );
  const step = parseInt(document.querySelector('input[name="step"]').value);
  const amount = parseInt(document.querySelector('input[name="amount"]').value);

  const arr = [];
  let delay = firstDelay;
  for (let i = 1; i <= amount; i++) {
    arr.push(createPromise(i, delay));
    delay += step;
  }
  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
  arr.forEach(promise => {
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  });
}
