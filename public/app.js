document.addEventListener('DOMContentLoaded', function () {
  // Получаем элементы
  const startButton = document.getElementById('start-button');
  const trollfaceButton = document.getElementById('trollfacemainbutton-button');
  const clickCounter = document.getElementById('click-counter');
  const mainScreen = document.getElementById('main-screen');
  const gameScreen = document.getElementById('game-screen');

  let clickCount = 0;

  // Обработчик для кнопки "Начать троллить"
  startButton.addEventListener('click', () => {
    mainScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
  });

  // Обработчик для кнопки "Trollface"
  trollfaceButton.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
      clickCounter.innerText = `${clickCount} Troll Coin`;
    } else {
      clickCounter.innerText = `${clickCount} Troll Coins`;
    }
  });
});
