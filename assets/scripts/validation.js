document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const topic = document.getElementById('topic');
    const message = document.getElementById('message');
    const agreement = document.getElementById('agreement');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;

        const fullnameValue = fullname.value.trim();
        const emailValue = email.value.trim();
        const topicValue = topic.value;
        const messageValue = message.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const words = fullnameValue.split(' ').filter(word => word.length > 0);

        if (fullnameValue === '') {
            showError(fullname, 'Введите ФИО');
            isValid = false;
        } else if (words.length < 3) {
            showError(fullname, 'Введите полное ФИО');
            isValid = false;
        }

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректную почту');
            isValid = false;
        }

        if (topicValue === '') {
            showError(topic, 'Выберите тему обращения');
            isValid = false;
        }

        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else if (messageValue.length > 500) {
            showError(message, 'Сообщение не должно превышать 500 символов');
            isValid = false;
        }

        if (!agreement.checked) {
            showCheckboxError(agreement, 'Необходимо согласие на обработку персональных данных');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                topic: topicValue,
                message: messageValue
            };

            document.dispatchEvent(new CustomEvent('formValid', { detail: formData }));

            alert('Форма успешно отправлена!');
            form.reset();
        }
    });

    [fullname, email, message].forEach(input => {
        input.addEventListener('input', function () {
            removeFieldError(this);
        });
    });

    topic.addEventListener('change', function () {
        removeFieldError(this);
    });

    agreement.addEventListener('change', function () {
        removeCheckboxError(this);
    });

    function clearErrors() {
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });

        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
    }

    function showError(input, message) {
        input.classList.add('is-danger');

        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;

        const field = input.closest('.field');
        if (field) {
            field.appendChild(help);
        }
    }

    function showCheckboxError(input, message) {
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;

        const field = input.closest('.field');
        if (field) {
            field.appendChild(help);
        }
    }

    function removeFieldError(input) {
        input.classList.remove('is-danger');

        const field = input.closest('.field');
        if (!field) return;

        const error = field.querySelector('.help.is-danger');
        if (error) {
            error.remove();
        }
    }

    function removeCheckboxError(input) {
        const field = input.closest('.field');
        if (!field) return;

        const error = field.querySelector('.help.is-danger');
        if (error) {
            error.remove();
        }
    }
});