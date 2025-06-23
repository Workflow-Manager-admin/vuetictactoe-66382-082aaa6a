import { defineStore } from 'pinia'
import { ref } from 'vue'

// PUBLIC_INTERFACE
export const useScoreStore = defineStore('tictactoeScore', () => {
  /**
   * Tracks scores during a session.
   * X/O for wins, ties for number of games drawn.
   */
  const scoreX = ref(0)
  const scoreO = ref(0)
  const ties = ref(0)

  // PUBLIC_INTERFACE
  function increment(player: 'X' | 'O') {
    if (player === 'X') scoreX.value += 1
    else if (player === 'O') scoreO.value += 1
  }
  // PUBLIC_INTERFACE
  function incrementTie() {
    ties.value += 1
  }
  // PUBLIC_INTERFACE
  function reset() {
    scoreX.value = 0
    scoreO.value = 0
    ties.value = 0
  }
  return { scoreX, scoreO, ties, increment, incrementTie, reset }
})
