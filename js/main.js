document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const burgerButton = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  function toggleMenu() {
    burgerButton.classList.toggle("active");
    nav.classList.toggle("header__nav--active");
  }

  burgerButton.addEventListener("click", toggleMenu);

  // Кастомный селект
  document.querySelectorAll('.custom-select').forEach(function(select) {
    const trigger = select.querySelector('.custom-select__trigger');
    const options = select.querySelectorAll('.custom-select__option');
    const hiddenInput = document.getElementById('hiddenSelectValue');

    // Открытие и закрытие селекта
    trigger.addEventListener('click', function() {
      select.classList.toggle('open');
      const optionsList = select.querySelector('.custom-select__options');
      optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
    });

    // Закрытие селекта при клике вне его
    document.addEventListener('click', function(e) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
        select.querySelector('.custom-select__options').style.display = 'none';
      }
    });

    // Обработка выбора опции
    options.forEach(function(option) {
      option.addEventListener('click', function() {
        trigger.querySelector('span').textContent = this.textContent;
        hiddenInput.value = this.getAttribute('data-value');
        select.classList.remove('open');
        select.querySelector('.custom-select__options').style.display = 'none';
      });
    });
  });

  // Обработка значения range
  const range = document.getElementById('range');
  const rangeValue = document.querySelector('.order__form-range-value');

  range.addEventListener('input', function() {
    rangeValue.textContent = `${this.value}%`;
  });

  // Обработка отправки формы
  document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('http://someurl.com/api', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Успешный ответ:', data);
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });

    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });
  });
  
});
