document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        console.clear();
        console.log('Данные формы:');
        console.log('Имя:', formData.fullname);
        console.log('Email:', formData.email);
        console.log('Тема:', formData.topic);
        console.log('Сообщение:', formData.message);

        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('Время отправки:', timestamp);
    });
});