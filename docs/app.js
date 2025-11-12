document.addEventListener('DOMContentLoaded', function () {
  // Получаем элементы
  const startButton = document.getElementById('start-button');
  const trollfaceButton = document.getElementById('trollfacemainbutton-button');
  const clickCounter = document.getElementById('click-counter');
  const mainScreen = document.getElementById('main-screen');
  const gameScreen = document.getElementById('game-screen');
  const shopButton = document.getElementById('shop-button');
  const shopModal = document.getElementById('shop-modal');
  const closeShop = document.getElementById('close-shop');
  const shopBalance = document.getElementById('shop-balance');
  const buyButtons = document.querySelectorAll('.buy-button');
  const shopItems = document.querySelectorAll('.shop-item');
  const purchaseToast = document.getElementById('purchase-toast');
  const toastMessage = document.querySelector('.toast-message');
  const toastClose = document.querySelector('.toast-close');

  let clickCount = 0;
  let canClick = true;
  let toastTimeout;

  // Обработчик для кнопки "Начать троллить"
  startButton.addEventListener('click', () => {
    mainScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
  });

  // Обработчик клика по троллфейсу
  trollfaceButton.addEventListener('click', () => {
    if (canClick) {
      canClick = false;
      clickCount++;
      updateCounter();
      updateShopBalance();
      
      setTimeout(() => {
        canClick = true;
      }, 50);
    }
  });

  // Функция обновления счетчика
  function updateCounter() {
    if (clickCount === 1) {
      clickCounter.innerText = `${clickCount} Troll Coin`;
    } else {
      clickCounter.innerText = `${clickCount} Troll Coins`;
    }
  }

  // Функция обновления баланса в магазине
  function updateShopBalance() {
    shopBalance.textContent = clickCount;
    updateBuyButtons();
  }

  // Функция обновления состояния кнопок покупки
  function updateBuyButtons() {
    buyButtons.forEach((button, index) => {
      const shopItem = shopItems[index];
      const price = parseInt(shopItem.getAttribute('data-price'));
      
      if (clickCount >= price) {
        button.disabled = false;
        button.classList.add('enough-money');
      } else {
        button.disabled = true;
        button.classList.remove('enough-money');
      }
    });
  }

  // Функция показа уведомления о покупке
  function showPurchaseToast(itemName) {
    // Останавливаем предыдущую анимацию
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      purchaseToast.style.display = 'none';
    }
    
    // Устанавливаем сообщение
    toastMessage.textContent = `Вы купили "${itemName}"!`;
    
    // Показываем toast
    purchaseToast.style.display = 'block';
    
    // Автоматическое скрытие через 3 секунды
    toastTimeout = setTimeout(() => {
      purchaseToast.style.display = 'none';
    }, 3000);
  }

  // Закрытие toast по клику на крестик
  toastClose.addEventListener('click', () => {
    purchaseToast.style.display = 'none';
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
  });

  // Открытие магазина
  shopButton.addEventListener('click', () => {
    shopModal.style.display = 'flex';
    updateShopBalance();
  });

  // Закрытие магазина
  closeShop.addEventListener('click', () => {
    shopModal.style.display = 'none';
  });

  // Закрытие магазина при клике вне окна
  shopModal.addEventListener('click', (e) => {
    if (e.target === shopModal) {
      shopModal.style.display = 'none';
    }
  });

  // Обработка покупок
  buyButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const shopItem = shopItems[index];
      const price = parseInt(shopItem.getAttribute('data-price'));
      const itemName = shopItem.querySelector('.item-name').textContent;
      
      if (clickCount >= price) {
        clickCount -= price;
        updateCounter();
        updateShopBalance();
        
        // Показываем красивое уведомление вместо alert
        showPurchaseToast(itemName);
        
        // Здесь можно добавить логику применения покупки
        // Например: applyPurchase(itemName);
      }
    });
  });

  // ===== ФИКС ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ =====
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  const trollface = document.getElementById('trollface');
  if (trollface) {
    trollface.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
  }

  console.log('✅ Приложение загружено');
});