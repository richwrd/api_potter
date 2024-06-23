<template>
  <div class="product-form">
    <h2 class="title">Atualização de Personagem</h2>
    <div class="alert-card-container">
      <div v-if="personagemAtualizado" class="alert-card" :class="{ 'show-alert': personagemAtualizado }">
        <AlertSuccess />
      </div>
    </div>
    <form @submit.prevent="atualizarPersonagem">
      <div class="flex-container">
        <div class="image-container">
          <img v-if="personagem.imagem" :src="personagem.imagem" alt="Imagem do Personagem">
        </div>

        <div class="fields-container">
          <label class="label" for="nome">Nome do Personagem:</label>
          <input class="input" type="text" id="nome" v-model="personagem.nome" required>

          <label class="label" for="imagem">Imagem:</label>
          <input class="input" type="text" id="imagem" v-model="personagem.imagem">
        </div>
      </div>
      <button type="submit" class="submit-button">Atualizar</button>
      <button type="submit" class="submit-button" @click="deletarPersonagem">Deletar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import AlertSuccess from '@/components/AlertSuccess.vue';

export default {
  name: 'TelaAtualizaPersonagem',
  components: {
    AlertSuccess
  },
  data() {
    return {
      personagemAtualizado: false,
      personagem: {
        id: this.$route.params.id, // Recebe o ID do personagem da rota
        nome: '',
        preco: '',
        quantidade: '',
        imagem: '',
        descricao: '',
        tipo: '',
        categoria: ''
      }
    };
  },
  created() {
    this.carregarPersonagem();
  },
  methods: {
    async carregarPersonagem() {
      try {
        if (!this.personagem.id) {
          console.error('ID do personagem não definido.');
          console.log(this.personagem.id);
          return;
        }
        const response = await axios.get(`http://localhost:3000/personagem/${this.personagem.id}`);
        this.personagem = response.data;
      } catch (error) {
        console.error('Erro ao carregar o personagem:', error);
      }
    },
    async atualizarPersonagem() {
      try {
        const response = await axios.put(`http://localhost:3000/personagem/edit/${this.personagem._id}`, this.personagem);
        console.log('Personagem atualizado com sucesso!', this.personagem._id);
        this.personagem = response.data;
        this.personagemAtualizado = true;

        this.$router.push({ name: 'Personagems' });
      } catch (error) {
        console.error('Erro ao atualizar o personagem:', error);
      }
    },
    async deletarPersonagem() {
      try {
        const response = await axios.delete(`http://localhost:3000/personagem/remove/${this.personagem._id}`);
        console.log('Personagem deleteado com sucesso!', this.personagem._id);
        this.personagem = response.data;
        this.personagemAtualizado = true;

        this.$router.push({ name: 'Personagems' });
      } catch (error) {
        console.error('Erro ao deletar o personagem:', error);
      }
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 50px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.product-form {
  max-width: 1500px;
  margin: 0 auto;
}

.flex-container {
  display: flex;
}

.image-container {
  margin-right: 40px;
}

.input {
  width: 100%;
  height: 44px;
  background-color: #05060f1a;
  border-radius: .5rem;
  padding: 0 1rem;
  border: 2px solid transparent;
  font-size: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 20px;
  margin-bottom: 30px;
}

.input:hover,
.input:focus {
  outline: none;
  border-color: #05060f;
}

.label {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.input:hover+.label,
.input:focus+.label {
  color: #05060fc2;
  font-weight: bolder;
}

textarea {
  max-height: max-content;
}

img {
  display: block;
  max-width: 500px;
  height: 400px;
}

button {
  font-size: 24px;
  padding: 0.5em 2em;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: rgb(2, 0, 36);
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  display: inline-flex;
  margin-right: 20px;
}

button:hover {
  background: rgb(248, 179, 50);
}

button:active {
  transform: translate(0em, 0.2em);
}

.alert-card {
  display: inline-block;
  position: relative;
}

@keyframes slideIn {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100);
  }
}

@keyframes slideOut {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.alert-card {
  display: inline;
  position: absolute;
  left: 77%;
  animation: slideIn 1s forwards;
  animation: fadeInOut 3s forwards;
  padding: 40px;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

</style>
