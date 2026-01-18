<template>
  Room Id : {{ roomName }}
  <div class="w-full flex flex-col justify-center items-center h-[100dvh]">
    <div
      v-if="myRole && currentPlayer && !winnerPlayer"
      class="mb-2">
      <span>{{ currentPlayer === 'p1' ? '🟠' : '🔴' }}</span>
      {{ currentPlayer === myRole ? 'YOUR TURN' : 'OPPONENT TURN' }}
    </div>
    <div v-if="winnerPlayer"
      class="my-4 text-4xl font-bold"
      :class=" winnerPlayer === myRole ? 'text-green-400' : 'text-red-400'">
        {{ winnerPlayer === myRole ? 'You Win 🏆' : 'You Lose !' }}
    </div>
    <div v-if="!myRole" class="flex gap-4 mb-6">
      <Button
        label="🟠 เลือก P1"
        severity="warning"
        :disabled="firstChoose === 'p1'"
        @click="chooseSide('p1')"
      />
      <Button
        label="🔴 เลือก P2"
        severity="danger"
        :disabled="firstChoose === 'p2'"
        @click="chooseSide('p2')"
      />
    </div>
    <div class="grid grid-cols-7 gap-2 mb-2">
      <Button
        v-for="c in cols"
        :key="c"
        icon="pi pi-chevron-down"
        class="!w-12 !h-12 rounded-full font-bold text-sm"
        severity="primary"
        :outlined="isColumnFull(c - 1)"
        :disabled="!myRole || !!winnerPlayer || isColumnFull(c - 1)"
        @click="drop(c - 1)"
      />
    </div>
    <div class="bg-[#0b1630] p-4 rounded-xl">
      <div class="grid grid-cols-7 gap-2">
        <Button
          v-for="(cell, index) in cells"
          :key="cell.value"
          :label="cell.value?.toString()"
          class="!w-12 !h-12 rounded-full font-bold text-sm"
          :class="cellClass(cell, index)"
          :outlined="cell.type === 'empty'"
          :disabled="cell.type === 'empty'"
        />
      </div>
    </div>
    <Button
      label="RESET"
      severity="warning"
      class="mt-4"
      @click="reset()"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'
import { bingoSocket } from '@/utils/Socket.ts'
import { useAuthStore } from '@/stores/Auth'

type Player = 'p1' | 'p2'
type CellType = 'active' | 'danger' | 'empty'

interface Cell {
  value?: number
  type: CellType
}
interface IProps {
  roomName: string
}

const props = defineProps<IProps>()
const firstChoose = ref<string>('')
const authStore = useAuthStore()
const rows = 6
const cols = 7

const myRole = ref<'p1' | 'p2' | null>(null)
const myName = computed((): string => authStore.user.fullName)
const currentPlayer = ref<Player | null>(null)
const players = ref<any[]>([])
const winnerPlayer = ref<Player | null>(null)
const winningSet = ref<Set<number>>(new Set())

const cells = ref<Cell[]>(
  Array.from({ length: rows * cols }, () => ({ type: 'empty' }))
)

function drop(col: number) {
  if (!myRole.value) return
  if (winnerPlayer.value) return
  if (isColumnFull(col)) return

  bingoSocket.emit('bingo:drop', {
    room: props.roomName,
    col
  })
}

function isColumnFull(col: number): boolean {
  return cells.value[col].type !== 'empty'
}

function cellClass(cell: Cell, index: number) {
  return {
    'bg-white text-black': cell.type === 'empty',
    'bg-orange-400 text-black': cell.type === 'active',
    'bg-red-500 text-white': cell.type === 'danger',

    'ring-4 ring-yellow-300 animate-bounce':
      winningSet.value.has(index)
  }
}

function chooseSide(role: 'p1' | 'p2') {
  bingoSocket.emit('chooseSide', {
    roomId: props.roomName,
    role,
    name: myName.value,
  })
}
function reset (): void {
  bingoSocket.emit('bingo:reset', {
    roomId: props.roomName,
  })
}

onMounted(() => {
  bingoSocket.emit('bingo:join', {
    roomId: props.roomName,
    name: myName.value
  })
  bingoSocket.on('droped', ({ index, player, currentPlayer: cp }) => {
    cells.value[index].type =
    player === 'p1' ? 'active' : 'danger'

    currentPlayer.value = cp
  })
  bingoSocket.on('gameStart', () => {
    cells.value = Array.from({ length: rows * cols }, () => ({ type: 'empty' }))
    winnerPlayer.value = null
    winningSet.value.clear()
    currentPlayer.value = 'p1'
  })

  bingoSocket.on('playerAssigned', ({ role }) => {
    myRole.value = role
  })

  bingoSocket.on('playersUpdate', list => {
    firstChoose.value = list[0].role 
    players.value = list
  })
  
  bingoSocket.on('gameReset', () => {
    cells.value = Array.from(
      { length: rows * cols },
      () => ({ type: 'empty' })
    )

    winnerPlayer.value = null
    winningSet.value.clear()
    myRole.value = null
    players.value = []
    firstChoose.value = ''
  })
  bingoSocket.on('gameOver', ({ winner, winningIndexes }) => {
    winnerPlayer.value = winner
    winningSet.value = new Set(winningIndexes);
  });
})

</script>
