<script setup lang="ts">
import { ref } from 'vue'
import { useScoreStore } from '../stores/tictactoeScore'

const size = 3
const initialBoard = () => Array(size * size).fill(null) as (null | 'X' | 'O')[]
const board = ref(initialBoard())
const currentPlayer = ref<'X' | 'O'>('X')
const winner = ref<null | 'X' | 'O'>(null)
const tie = ref(false)
const scoreStore = useScoreStore()

function getStatusMessage() {
  if (winner.value) {
    return `Player ${winner.value} wins!`
  } else if (tie.value) {
    return "It's a tie!"
  } else {
    return `Player ${currentPlayer.value}'s turn`
  }
}

function checkWinner(bd: (null | 'X' | 'O')[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diags
  ]
  for (const [a,b,c] of lines) {
    if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
      return bd[a]
    }
  }
  return null
}

function handleCellClick(idx: number) {
  if (winner.value || tie.value || board.value[idx]) return
  board.value[idx] = currentPlayer.value
  const win = checkWinner(board.value)
  if (win) {
    winner.value = win
    scoreStore.increment(win)
  } else if (board.value.every(cell => cell !== null)) {
    tie.value = true
    scoreStore.incrementTie()
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function resetBoard() {
  board.value = initialBoard()
  currentPlayer.value = 'X'
  winner.value = null
  tie.value = false
}

function newGame() {
  resetBoard()
  scoreStore.reset()
}
</script>

<template>
  <div class="ttt-wrapper">
    <div class="status" :class="{ win: !!winner, tie: !!tie }">
      {{ getStatusMessage() }}
    </div>
    <div class="score-bar">
      <span :class="['pX', currentPlayer==='X' && !winner && !tie ? 'active' : '']">X: {{ scoreStore.scoreX }}</span>
      <span class="tie">Tie: {{ scoreStore.ties }}</span>
      <span :class="['pO', currentPlayer==='O' && !winner && !tie ? 'active' : '']">O: {{ scoreStore.scoreO }}</span>
    </div>
    <div class="ttt-board" role="grid">
      <button
        v-for="(cell, idx) in board"
        :key="idx"
        class="ttt-cell"
        :aria-label="'Cell ' + (idx+1)"
        :disabled="!!cell || !!winner || !!tie"
        @click="handleCellClick(idx)"
        :tabindex="cell === null && !winner && !tie ? 0 : -1"
      >
        <span v-if="cell">{{ cell }}</span>
      </button>
    </div>
    <div class="controls">
      <button class="primary" @click="resetBoard">Reset Board</button>
      <button class="accent" @click="newGame">New Game (Reset Scores)</button>
    </div>
  </div>
</template>

<style scoped>
.ttt-wrapper {
  max-width: 370px;
  margin: 2.5rem auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 12px rgba(80,80,80,0.09);
  padding: 2rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.status {
  font-size: 1.2rem;
  margin-bottom: 0.9rem;
  margin-top: 0.3rem;
  min-height: 2em;
  color: #35495E;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}
.status.win {
  color: #4FC08D;
}
.status.tie {
  color: #F9DC5C;
}
.score-bar {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;
  margin-bottom: 1.2rem;
  background: #f6faf8;
  border-radius: 12px;
  padding: 0.6em 0.7em;
}
.score-bar span {
  flex: 1 1 0;
  text-align: center;
}
.score-bar .active {
  background: #4FC08D;
  color: #fff;
  border-radius: 7px;
  padding: 0 0.4em;
}
.score-bar .pX {
  color: #4FC08D;
}
.score-bar .pO {
  color: #35495E;
}
.score-bar .tie {
  color: #F9DC5C;
}
.ttt-board {
  display: grid;
  grid-template-columns: repeat(3, minmax(70px,1fr));
  grid-template-rows: repeat(3, minmax(70px,1fr));
  gap: 8px;
  width: 100%;
  max-width: 320px;
  margin-bottom: 1.7rem;
  background: #e6f8f2;
  border-radius: 18px;
  box-shadow: 0 0 4px 0 #e8e8e8 inset;
  padding: 1em;
}
.ttt-cell {
  aspect-ratio: 1/1;
  border: none;
  background: #fff;
  font-size: 2.3rem;
  font-weight: bold;
  color: #35495E;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(80,80,80,0.08);
  transition: background 0.17s, color 0.15s;
  cursor: pointer;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.ttt-cell[disabled] {
  cursor: default;
  color: #abb6c0;
  background: #f9fafc;
}
.ttt-cell:hover:not([disabled]) {
  background: #4FC08D;
  color: #fff;
}
.ttt-cell span {
  user-select: none;
}
.controls {
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top:1rem;
  justify-content: center;
}
.controls button {
  font-size: 1.05rem;
  font-weight: 600;
  padding: 0.7em 1.5em;
  border: none;
  border-radius: 10px;
  background: #f0f2f4;
  color: #35495E;
  cursor: pointer;
  transition: background 0.17s, color 0.13s;
}
.controls .primary {
  background: #4FC08D;
  color: #fff;
}
.controls .primary:hover,
.controls .primary:focus {
  background: #3beb9e;
}
.controls .accent {
  background: #F9DC5C;
  color: #35495E;
}
.controls .accent:hover,
.controls .accent:focus {
  background: #ffe470;
}
@media (max-width: 600px) {
  .ttt-wrapper {
    max-width: 99vw;
    box-shadow: none;
    padding: 1.2rem 3vw 1rem;
    border-radius: 11pt;
  }
  .ttt-board {
    max-width: 99vw;
    padding: 0.5em;
    border-radius: 11pt;
  }
  .controls {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
