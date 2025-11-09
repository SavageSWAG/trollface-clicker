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

  // ===== ФИКС ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ =====
  
  // Предотвращаем зум на двойной тап
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Предотвращаем контекстное меню на изображении
  const trollface = document.getElementById('trollface');
  if (trollface) {
    trollface.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
  }

  // Дополнительная защита от выделения
  document.addEventListener('selectstart', function(e) {
    if (e.target === trollface || e.target.closest('.trollface-container')) {
      e.preventDefault();
      return false;
    }
  });

  // Предотвращаем перетаскивание изображения
  if (trollface) {
    trollface.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
  }

  console.log('✅ Мобильные фиксы активированы');
});