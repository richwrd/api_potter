<template>
    <div class="container">
        <form class="form" @submit.prevent="registerUser">
            <p class="title">Registre-se</p>
            <p class="message">Faça seu cadastro e desfrute do site! </p>
            <div class="flex">
            </div>

            <label>
                <input class="input" type="email" v-model="username" placeholder="" required>
                <span>Username</span>
            </label>

            <label>
                <input class="input" type="text" v-model="nome" placeholder="" required>
                <span>Nome</span>
            </label>

            <label>
                <input class="input" type="email" v-model="email" placeholder="" required>
                <span>E-mail</span>
            </label>

            <label>
                <input class="input" type="password" v-model="senha" placeholder="" required>
                <span>Senha</span>
            </label>

            <label>
                <input class="input" type="password" v-model="confirmasenha" placeholder="" required>
                <span>Confirme sua senha</span>
            </label>
            <button class="submit">Enviar</button>
            <p class="signin">Já tem uma conta? <a href="/auth/login">Fazer login</a> </p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            nome: '',
            email: '',
            senha: '',
            confirmasenha: ''
        }
    },
    methods: {
        async registerUser() {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const usuario = {
                    username: this.username,
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                    confirmasenha: this.confirmasenha
                };
                const response = await axios.post('http://localhost:3000/auth/register', usuario, config);
                console.log('Usuário cadastrado:', response.data);
                // Implemente a lógica adequada após o registro, se necessário
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);

                const usuario = {
                    username: this.username,
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                    confirmasenha: this.confirmasenha
                };
                
                console.log('Usuário que apresenhou erro:', usuario);
            }
        }
    }
}
</script>

<style>
.container {
    margin-top: 50px;
    display: inline-block;
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 5px;
    border-radius: 12px;
    position: relative;
}

.title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
}

.title::before,
.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
}

.title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
}

.title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
}

.message,
.signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
}

.signin {
    text-align: center;
}

.signin a {
    color: royalblue;
}

.signin a:hover {
    text-decoration: underline royalblue;
}

.flex {
    display: flex;
    width: 100%;
    gap: 6px;
}

.form label {
    position: relative;
    margin: 10px;
    padding: 5px;
    text-align: justify;
}

.form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
}

.form label .input+span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
}

.form label .input:placeholder-shown+span {
    top: 15px;
    font-size: 0.9em;
}

.form label .input:focus+span,
.form label .input:valid+span {
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
}

.form label .input:valid+span {
    color: green;
}

.submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
}

.submit:hover {
    background-color: rgb(56, 90, 194);
    cursor: pointer;
}

@keyframes pulse {
    from {
        transform: scale(0.9);
        opacity: 1;
    }

    to {
        transform: scale(1.8);
        opacity: 0;
    }
}
</style>