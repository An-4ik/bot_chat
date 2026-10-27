let tg = window.Telegram.WebApp;

// Раскрываем окно на весь экран
tg.expand();

// Настраиваем главную кнопку
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

// Список специальностей: id → подпись
const SPECIALTIES = [
    { id: "Программирование", title: "Программирование", img: "https://cdn-icons-png.flaticon.com/128/2721/2721280.png" },
    { id: "Экономика",       title: "Экономика",       img: "https://cdn-icons-png.flaticon.com/128/2933/2933932.png" },
    { id: "Медицина",        title: "Медицина",        img: "https://cdn-icons-png.flaticon.com/128/2382/2382533.png" },
    { id: "Машиностроение",  title: "Машиностроение",  img: "https://cdn-icons-png.flaticon.com/128/4777/4777148.png" },
    { id: "Юриспруденция",   title: "Юриспруденция",   img: "https://cdn-icons-png.flaticon.com/128/2317/2317981.png" },
    { id: "Дизайн",          title: "Дизайн",          img: "https://cdn-icons-png.flaticon.com/128/3059/3059518.png" },
];

let selectedId = "";

// Генерируем карточки
const inner = document.getElementById("inner");
const usercard = document.getElementById("usercard");

SPECIALTIES.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="img">
        <button class="btn" data-id="${item.id}">${item.title}</button>
    `;
    inner.appendChild(div);
});

// Обработка нажатий на кнопки
inner.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    // Снимаем выделение со всех
    document.querySelectorAll(".btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedId = btn.dataset.id;

    // Показываем главную кнопку
    tg.MainButton.setText(`Найти ВУЗы: ${selectedId}`);
    tg.MainButton.show();

    usercard.textContent = `Выбрано: ${selectedId}`;
});

// Отправка данных в бота при нажатии MainButton
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    if (selectedId) {
        tg.sendData(selectedId);  // отправит боту строку "Программирование" и закроет окно
    }
});