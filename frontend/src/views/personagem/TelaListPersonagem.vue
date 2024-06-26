<template>
    <div>
        <div>
            <h2>Personagens</h2>

            <template v-if="authenticated">
                <ul class="nav-links">
                    <div style="display:flex; justify-content: flex-end; align-items: center;">
                        <li class="upward"><a href="/personagem/create">Cadastro</a></li>
                    </div>
                </ul>
            </template>

        </div>
        <div class="card-list">
            <div v-for="personagem in Personagens" :key="personagem._id" class="card-item" @click="editarPersonagem(personagem._id)">
                <h3>{{ personagem.nome }}</h3>
                <img :src="personagem.imagem" alt="Imagem do personagem" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TelaPersonagem',
    data() {
        return {
            Personagens: [],
            authenticated: false
        };
    },
    created() {
        this.fetchPersonagens();
        this.verificarToken();
    },
    methods: {
        async fetchPersonagens() {
            try {


                const response = await axios.get('http://localhost:3000/personagens');
                this.Personagens = response.data; // Ajusta para a resposta do servidor
                console.log(response)
            } catch (error) {
                console.error('Erro ao obter Personagens:', error);
            }
        },
        editarPersonagem(idPersonagem) {
            try {
                this.$router.push({ name: 'telaAtualizaPersonagem', params: { id: idPersonagem } });
                console.log('ID do personagem enviado:', idPersonagem);
                console.log(this.personagem);
            } catch (error) {
                console.error('Erro ao editar o personagem:', error);
            }
        },
        async verificarToken() {
            // const AuthorizationStorage = localStorage.getItem('Authorization');
            const authorizationStorage = localStorage.getItem('acessToken');

            const config = {
                headers: {
                    'authorization': `Bearer ${authorizationStorage}`
                },
                timeout: 5000 // Tempo limite em milissegundos (por exemplo, 5 segundos)
            };

            if (authorizationStorage) {
                try {
                    const response = await axios.post('http://localhost:3000/auth/verify', null, config);
                    if (response.status === 200) {
                        this.authenticated = true;

                        console.log('Token verificado com sucesso:', response.data);
                    }
                } catch (error) {
                    console.error('Falha ao verificar o token:', error);
                }
            }
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');

.card-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(300px, 1fr));
    max-width: 1500px;
    margin: 16px auto;
    padding: 20px;
    gap: 30px;
}

.card-list .card-item {
    background: #fff;
    padding: 26px;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
    list-style: none;
    cursor: pointer;
    text-decoration: none;
    border: 2px solid transparent;
    transition: border 0.5s ease;
    max-height: 1000px;
}

.card-list .card-item:hover {
    border: 2px solid #000;
}

h2 {
    margin-top: 20px;
    font-size: 50px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.card-list .card-item img {
    max-width: 300px;
    max-height: 250px;
    padding: 15px;
}

.card-list span {
    display: inline-flex;
    background: #f7dff5;
    margin-top: 32px;
    padding: 8px 15px;
    font-size: 0.75rem;
    border-radius: 50px;
    font-weight: 600;
}

.card-list p {
    margin-top: 20px;
}

.card-list .developer {
    background-color: #f7f599;
    color: #b27424;
}

.card-list .designer {
    background-color: #d1e8ff;
    color: #2968a8;
}

.card-list .editor {
    background-color: #d6f8d6;
    color: #205c20;
}

.card-item h3 {
    color: #000;
    font-size: 1.438rem;
    margin-top: 28px;
    font-weight: 600;
}

@media (max-width: 1200px) {
    .card-list .card-item {
        padding: 15px;
    }
}

@media screen and (max-width: 980px) {
    .card-list {
        margin: 0 auto;
    }
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c1f7f5;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.nav-links {
    position: relative;
    margin-top: 20px;
    display: table;
    justify-content: center;
    background: #eebc16;
    padding: 10px 15px;
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    display: inline-block;
}

.nav-links li {
    list-style: none;
    margin: 0 12px;
}

.nav-links li a {
    position: relative;
    color: #ffffff;
    font-size: 20px;
    font-weight: 500;
    padding: 6px 0;
    text-decoration: none;
}

.nav-links li a:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: #ef5034;
    border-radius: 12px;
    transition: all 0.4s ease;
}

.nav-links li a:hover:before {
    width: 100%;
}

.nav-links li.center a:before {
    left: 50%;
    transform: translateX(-50%);
}

.nav-links li.upward a:before {
    width: 100%;
    bottom: -5px;
    opacity: 0;
}

.nav-links li.upward a:hover:before {
    bottom: 0px;
    opacity: 1;
}

.nav-links li.forward a:before {
    width: 100%;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
}

.nav-links li.forward a:hover:before {
    transform: scaleX(1);
    transform-origin: left;
}
</style>
