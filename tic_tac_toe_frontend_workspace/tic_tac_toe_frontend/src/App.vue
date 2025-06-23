<script setup lang="ts">
import TicTacToeBoard from './components/TicTacToeBoard.vue'
</script>

<template>
  <div class="fullscreen">
    <header class="tttHeader">
      <h1>Tic Tac Toe</h1>
    </header>
    <main>
      <TicTacToeBoard />
    </main>
    <footer>
      <small class="credits">
        <span>
          <a href="https://vuejs.org/" target="_blank">Built with Vue.js</a> | Minimal UI | ©️
          <a href="https://kavia.ai/" target="_blank" style="color:#4FC08D">Kavia</a>
        </span>
      </small>
    </footer>
  </div>
</template>

<style scoped>
.fullscreen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8faf9;
}
.tttHeader {
  width: 100%;
  text-align: center;
  padding-top: 2rem;
  margin-bottom: 0.4rem;
}
.tttHeader h1 {
  font-family: inherit;
  color: #35495E;
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.012em;
  margin-bottom: 0;
  margin-top: 0;
}
main {
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
footer {
  width: 100vw;
  text-align: center;
  color: #a8b7c3;
  font-size: 0.93rem;
  background: none;
  margin-top: auto;
  padding-bottom: 0.8rem;
  padding-top: 0.9rem;
}
.credits a {
  color: #4FC08D;
  text-decoration: none;
}
.credits a:hover {
  color: #F9DC5C;
  text-decoration: underline;
}
@media (max-width: 550px) {
  .tttHeader h1 {
    font-size: 1.28rem;
    padding-top: 1rem;
    font-weight: 800;
  }
  main {
    padding-bottom: 0;
    padding-top: 0;
  }
}
</style>
