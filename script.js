const Button = document.getElementById('Button');
const Popup = document.getElementById('Popup');
const Form = document.getElementById('Form');
const Message_Success = document.getElementById('Message_Success');
const Message_Error = document.getElementById('Message_Error');

Button.addEventListener('click', () => {
    Popup.style.display = 'block';
    history.pushState(null, '', '/form');
});

window.addEventListener('popstate', () => {
    popup.style.display = 'none';
});
  
Form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(Form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formcarry.com/s/jDSMpRR850', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            Message_Success.style.display = 'block';
            Form.reset();
            localStorage.removeItem('FormData');
        } else {
            Message_Error.style.display = 'block';
        }
        }
    };
    xhr.send(formData);
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

Form.addEventListener('input', () => {
    Message_Success.style.display = 'none';
    Message_Error.style.display = 'none';
});
document.getElementById("Form").addEventListener("submit", function(event){
    event.preventDefault();
    document.getElementById("Form").reset();
})