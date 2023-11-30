const Button = document.getElementById('Button');
const Popup = document.getElementById('Popup');
const Form = document.getElementById('Form');

Button.addEventListener('click', () => {
    Popup.style.display = 'block';
    history.pushState(null, '', '/form');
});

window.addEventListener('popstate', () => {
    Popup.style.display = 'none';
});
  
Form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(Form);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'https://formcarry.com/s/jDSMpRR850', true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 406) {
            alert("Данные формы успешно отправлены!");
            Form.reset();
            localStorage.removeItem('FormData');
            Popup.style.display = 'none';
        } else {
            alert("Что-то пошло не так! Данные не отправлены!");
        }
        }
    };
    httpRequest.send(formData);
});

Form.addEventListener('change', () => {
    const formData = new FormData(Form);
    const data = Object.fromEntries(formData.entries());
localStorage.setItem('FormData', JSON.stringify(data));
});

window.addEventListener('load', () => {
    const savedFormData = JSON.parse(localStorage.getItem('FormData'));

    if (savedFormData) {
        document.getElementById('FIO').value = savedFormData.FIO;
        document.getElementById('email').value = savedFormData.email;
        document.getElementById('phone').value = savedFormData.phone;
        document.getElementById('organization').value = savedFormData.organization;
        document.getElementById('message').value = savedFormData.message;
        document.getElementById('agreement').checked = savedFormData.agreement;
    }
});
