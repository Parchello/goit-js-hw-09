import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0];
  },
};

const onTimer = document.querySelector('[data-start]');

onTimer.addEventListener('click', timerStart);
const numbers = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const flatpickrInstance = flatpickr('#datetime-picker', options);
const onInput = document.querySelector('#datetime-picker');
onInput.addEventListener('input', chooseDateOn);
onTimer.disabled = true;

function chooseDateOn() {
  const currentDate = new Date();
  const selectedDate = flatpickrInstance.selectedDates[0];
  console.log(selectedDate);
  if (selectedDate > currentDate) {
    onTimer.disabled = false;
    console.log(selectedDate);
  } else {
    {
      Notiflix.Notify.failure('Please choose a date in the future');

      clearInterval(timerId);
      return;
    }
  }
}

function timerStart() {
  const timerId = setInterval(() => {
    const currentDate = new Date();
    const selectedDate = flatpickrInstance.selectedDates[0];
    const diferense = selectedDate - currentDate;
    onTimer.disabled = true;
    onInput.disabled = true;

    convertMs(diferense);
  }, 1000);

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    numbers.days.textContent = days;
    numbers.hours.textContent = hours;
    numbers.minutes.textContent = minutes;
    numbers.seconds.textContent = seconds;
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
}
