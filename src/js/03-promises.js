import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('form'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const valueInput = e.currentTarget.elements;

  let delay = Number(valueInput.delay.value);
  const step = Number(valueInput.step.value);
  const amount = Number(valueInput.amount.value);

  if (delay < 0 || step < 0 || amount < 0) {
    return Notify.failure('All field values must be positive');
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onFulfilled).catch(onRejected);
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
}

function onFulfilled(result) {
  Notify.success(
    `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
  );
}

function onRejected(error) {
  Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
}
