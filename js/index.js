/** @format */
const myModal = new bootstrap.Modal('#register-modal');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged();

//logar no sistema
document.getElementById('login-form').addEventListener('submit', function (e) {
	e.preventDefault();

	const email = document.getElementById('exampleInputEmail1').value;
	const password = document.getElementById('exampleInputPassword1').value;
	const checkSession = document.getElementById('session-check').checked;

	const account = getAccount(email);

	if (!account) {
		alert('Ops! Verifique o usúario ou a senha.');
		return;
	}

	if (account) {
		if (account.password !== password) {
			alert('Ops! Verifique o usúario ou a senha.');
			return;
		}

		saveSession(email, checkSession);

		window.location.href = 'home.html';
	}
});

//criar conta
document.getElementById('create-form').addEventListener('submit', function (e) {
	e.preventDefault();

	const email = document.getElementById('email-create-input').value;
	const password = document.getElementById('password-create-input').value;

	if (email.length < 5) {
		alert('preencha o campo com email válido.');
		return;
	}

	if (password.length < 4) {
		alert('Preencha a senha com no minimo 4 digitos.');
		return;
	}
	//salvar conta
	saveAccount({
		login: email,
		password: password,
		transactions: [],
	});

	myModal.hide();

	alert('Conta criada com sucesso!');
});
//função salvar login e senha da sessão.
function checkLogged() {
	if (session) {
		sessionStorage.setItem('logged', session);
		logged = session;
	}

	if (logged) {
		saveSession(logged, session);

		window.location.href = 'home.html';
	}
}

function saveAccount(data) {
	localStorage.setItem(data.login, JSON.stringify(data));
}
function saveSession(data, saveSession) {
	if (saveSession) {
		localStorage.setItem('session', data);
	}

	sessionStorage.setItem('logged', data);
}

function getAccount(key) {
	const account = localStorage.getItem(key);

	if (account) {
		return JSON.parse(account);
	}
	return '';
}
