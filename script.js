class Balls {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }
  setup() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
  }
  play() {
    this.setup();
    this.source.start(this.context.currentTime);
  }
  stop() {
    var ct = this.context.currentTime + 1;
    this.gainNode.gain.exponentialRampToValueAtTime(.1, ct);
    this.source.stop(ct);
  }
}

class Buffer {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }
  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      thisBuffer.context
        .decodeAudioData(request.response, function(buffer) {
          thisBuffer.buffer[index] = buffer;
          if(index == thisBuffer.urls.length-1) {
            thisBuffer.loaded();
          }
        });
    };
    request.send();
  };
  getBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    })
  }
  loaded() {
    loaded = true;
  }
  getSound(index) {
    return this.buffer[index];
  }
}

let balls = null,
    preset = 0,
    loaded = false;
let path = 'audio/';
let sounds = [
  path + 'sound1.mp3',
  path + 'sound2.mp3',
  path + 'sound3.mp3',
  path + 'sound4.mp3',
  path + 'sound5.mp3',
  path + 'sound6.mp3',
  path + 'sound7.mp3',
  path + 'sound8.mp3',
  path + 'sound9.mp3',
  path + 'sound10.mp3',
  path + 'sound11.mp3',
  path + 'sound12.mp3',
  path + 'sound13.mp3',
  path + 'sound14.mp3',
  path + 'sound15.mp3',
  path + 'sound16.mp3',
  path + 'sound17.mp3',
  path + 'sound18.mp3',
  path + 'sound19.mp3',
  path + 'sound20.mp3',
  path + 'sound21.mp3',
  path + 'sound22.mp3',
  path + 'sound23.mp3',
  path + 'sound24.mp3',
  path + 'sound25.mp3',
  path + 'sound26.mp3',
  path + 'sound27.mp3',
  path + 'sound28.mp3',
  path + 'sound29.mp3',
  path + 'sound30.mp3',
  path + 'sound31.mp3',
  path + 'sound32.mp3',
  path + 'sound33.mp3',
  path + 'sound34.mp3',
  path + 'sound35.mp3',
  path + 'sound36.mp3'
];
let context = new (window.AudioContext || window.webkitAudioContext)();

function playBalls() {
  let index = parseInt(this.dataset.note) + preset;
  balls = new Balls(context, buffer.getSound(index));
  balls.play();
}

function stopBalls() {
  balls.stop();
}

let buffer = new Buffer(context, sounds);
let ballsSound = buffer.getBuffer();
let buttons = document.querySelectorAll('.b-ball_bounce');
buttons.forEach(button => {
  button.addEventListener('mouseenter', playBalls.bind(button));
  button.addEventListener('mouseleave', stopBalls);
})

function ballBounce(e) {
  var i = e;
  if (e.className.indexOf(" bounce") > -1) {
  return;
  }
  toggleBounce(i);
}

function toggleBounce(i){
  i.classList.add("bounce");
  function n() {
    i.classList.remove("bounce")
    i.classList.add("bounce1");
    function o() {
      i.classList.remove("bounce1")
      i.classList.add("bounce2");
      function p() {
        i.classList.remove("bounce2")
        i.classList.add("bounce3");
        function q() {
          i.classList.remove("bounce3");
        }
        setTimeout(q, 300)
      }
      setTimeout(p, 300)
    }
    setTimeout(o, 300)
  }
  setTimeout(n, 300)
}

var array1 = document.querySelectorAll('.b-ball_bounce')
var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right')

for(var i=0; i<array1.length; i++){
  array1[i].addEventListener('mouseenter', function(){
    ballBounce(this)
  })
}

for(var i=0; i<array2.length; i++){
  array2[i].addEventListener('mouseenter', function(){
    ballBounce(this)
  })
}

let l = ["49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "81", "87", "69", "82", "84", "89", "85", "73", "79", "80", "219", "221", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "220"];
let k = ["90", "88", "67", "86", "66", "78", "77", "188", "190", "191"];
let a = {};
for (let e = 0, c = l.length; e < c; e++) {
    a[l[e]] = e
}
for (let e = 0, c = k.length; e < c; e++) {
    a[k[e]] = e
}

document.addEventListener('keydown', function (j) {
  let i = j.target;
  if (j.which in a) {
    let index = parseInt(a[j.which]);
    balls = new Balls(context, buffer.getSound(index));
    balls.play();
    let ball = document.querySelector('[data-note="' + index + '"]');
    toggleBounce(ball);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Установите конечную дату
  const deadline = new Date('2026-01-01T00:00:01');
  
  // Найдите элементы DOM
  const elDays = document.querySelector('.timer__days');
  const elHours = document.querySelector('.timer__hours');
  const elMinutes = document.querySelector('.timer__minutes');
  const elSeconds = document.querySelector('.timer__seconds');
  
  // Функция склонения числительных
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
  };

  // Функция обновления таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

    if (diff === 0) {
      clearInterval(timerId);
    }
  };

  // Запустите таймер
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});

function addParallax(selector, intensityX, intensityY) {
  const element = document.querySelector(selector);
  if (!element) return;

  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const offsetX = (clientX / innerWidth - 0.5) * 2;
    const offsetY = (clientY / innerHeight - 0.5) * 2;

    element.style.transform = `translate(${-offsetX * intensityX}%, ${-offsetY * intensityY}%)`;
  });
}

addParallax('.background', 2, 2);

document.querySelector(".card-container").addEventListener("click", () => {
    document.querySelector(".card").classList.toggle("is-opened");;
});

const cracker = document.getElementById("crackerWrapper");
const leftCracker = document.getElementById("leftCracker");
const rightCracker = document.getElementById("rightCracker");
const message = document.getElementById("message");
const jokeWrap = document.getElementById("jokeWrap");
const joke = document.getElementById("joke");
const punchline = document.getElementById("punchline");

let counter = 0
let jokes =[{Q: "Чем отличается наш Дед Мороз от их Санта Клауса?" ,A: "Их всегда трезвый и один, а наш всегда пьяный и с какой-то девкой."}, {Q: "Двоечник Вовочка 1 января проснулся с грудью 4-го размера." ,A: "не надо было списывать письмо Деду Морозу у своей старшей сестры."}, {Q: "- Как прошла новогодняя ночь?" ,A: "- Не знаю - еще не рассказывали...."}, {Q: "На самом деле 2025 год был неплохим." ,A: "Скоро увидите сами."}, {Q: "Акция: Не трогайте, это на Новый год! закончилась 31 декабря." ,A: "С 1 января началась другая: Жрите, а то испортится!"}, {Q: "Походила по магазинам, посмотрела цены." ,A: "Как сказать детям, что Дед Мороз умер?"}, {Q: "- Хочу такую работу как у Деда Мороза!" ,A: "Сутки через 364..."}, {Q: "Продам ёлку." ,A: "Срочно!"}, {Q: "Новогоднее настроение:" ,A: "наряжая елку, подрался с котом из-за дождика."}, {Q: "До нового года осталось..." ,A: "Понять, как жить дальше"}]
let num = Math.floor(Math.random() * jokes.length)

cracker.addEventListener('click', () => {
  if(counter < 13){
    counter++
  } else{
    joke.textContent = jokes[num].Q
    punchline.textContent = jokes[num].A
    leftCracker.style.animation = "left 1s forwards"
    rightCracker.style.animation = "right 1s forwards"
    message.style.animation = "title 1s forwards"
    jokeWrap.style.animation = "joke 2s forwards"
    cracker.style.transform = "scaleX(1)"
  }
})

function Loop(){      
  window.requestAnimationFrame(Loop);
  if(counter > 0 && counter < 13){
    cracker.style.transform = `scaleX(${1 + (counter / 100)})`
    counter -= 0.05
  }
}
Loop()