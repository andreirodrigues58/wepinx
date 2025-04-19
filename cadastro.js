
function mostrarSenhaC(){
    let inputPasss = document.getElementById('SenhaCadas')
    let btnShowPas = document.getElementById('btnc-senha')
    
if(inputPasss.type === 'password'){
      
    inputPasss.setAttribute('type', 'text')
    btnShowPas.classList.replace('bi-eye-fill','bi-eye-slash-fill')
}
else{
    inputPasss.setAttribute('type', 'password')
    btnShowPas.classList.replace('bi-eye-slash-fill','bi-eye-fill')
}
}

function mostrarSenhaS(){
    let InputPa = document.getElementById('ConfirmSenhaCadas')
    let btnShowPa = document.getElementById('btns-senha')
    
if(InputPa.type === 'password'){
  
    InputPa.setAttribute('type', 'text')
    btnShowPa.classList.replace('bi-eye-fill','bi-eye-slash-fill')
}
else{
    InputPa.setAttribute('type', 'password')
    btnShowPa.classList.replace('bi-eye-slash-fill','bi-eye-fill')
}
}


let msgError = document.querySelector('#msgError');
let msgSucess = document.querySelector('#msgSucess');


let usuario = document.querySelector('#UserCadas');
let labelUsuario = document.querySelector('#labelUSER');
let validUsuario = false;

let senha = document.querySelector('#SenhaCadas');
let labelSenha = document.querySelector('#labelSENHA');
let validSenha = false;

let Confirmsenha = document.querySelector('#ConfirmSenhaCadas');
let labelConfirmSenha = document.querySelector('#labelConfirmSENHA');
let validConfirmSenha = false;



// Validação usuário
usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 3) {
        labelUsuario.setAttribute('style', 'color:red');
        labelUsuario.innerHTML = '<strong>Usuário *insira no mínimo 3 caracteres</strong>'
        usuario.setAttribute('style', 'border-color:red');
        validUsuario = false;
    } else {
        labelUsuario.setAttribute('style', 'rgb(11, 109, 207');
        labelUsuario.innerHTML = 'Usuário';
        usuario.setAttribute('style', 'border-color:white');
        validUsuario = true;
    }
});

// Validação senha
senha.addEventListener('keyup', () => {
    if (senha.value.length <= 4) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = '<strong>Senha *insira no mínimo 5 caracteres</strong>';
        senha.setAttribute('style', 'border-color:red');
        validSenha = false;
    } else {
        labelSenha.setAttribute('style', 'color: rgb(166, 195, 2)');
        labelSenha.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color:white');
        validSenha = true;
    }
});

// Validação confirmação de senha
Confirmsenha.addEventListener('keyup', () => {
    if (senha.value != Confirmsenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = '<strong>Confirmar Senha *Senhas não conferem</strong>';
        Confirmsenha.setAttribute('style', 'border-color:red');
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color:rgb(166, 195, 2)');
        labelConfirmSenha.innerHTML = '';
        Confirmsenha.setAttribute('style', 'border-color:white');
        validConfirmSenha = true;
    }
});

// Botão cadastrar
