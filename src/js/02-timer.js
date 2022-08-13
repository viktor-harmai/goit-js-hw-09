import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//require('flatpickr/dist/themes/confetti.css');

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let endTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();

    if (selectedTime <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      endTime = selectedTime;
    }
    //console.log(selectedDates[0].getTime());
    // console.log(selectedDates[0]);
  },
};

flatpickr(refs.inputDate, options);

class Timer {
  constructor({ valueTimer }) {
    this.intervalId = null;
    this.isActive = false;
    this.valueTimer = valueTimer;
    refs.startBtn.disabled = true;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = endTime - currentTime;
      const time = this.convertMs(deltaTime);
      //console.log(deltaTime);
      this.valueTimer(time);
      if (deltaTime < 1000) {
        this.stop();
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
  //Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  //Принимает время в миллисекундах высчитывает сколько в них вмещается дней/часов/минут/секунд
  //возвращает обьект со свойствами { days, hours, minutes, seconds }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  valueTimer: updateValueTimer,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateValueTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
