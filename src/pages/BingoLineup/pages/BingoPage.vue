<template>
  <div v-if="roomName">
    <div>
      <BingoLineupForm  :room-name="roomName"/>
    </div>
    <Chat :room-name="roomName"/>
  </div>
  <div v-else>
    <Dialog v-model:visible="roomDialog" header="Room" :style="{ width: '25rem' }" position="center" :modal="true" :draggable="false" :closable="false">
      <div class="w-full">
       <Button class="w-full" type="button" label="Create New Room" @click="createRoom()"></Button> 
      </div>
      <div class="text-xl font-bold text-center">
        Or
      </div>
      <div class="flex mb-4 gap-2">
        <InputText
          v-model="joinName"
          id="name"
          class="flex-auto"
          autocomplete="off"
          @keydown.enter="joinRoom()" />
        <Button type="button" label="Join" @click="joinRoom()"></Button>
      </div>
    </Dialog>
  </div>
  <Dialog v-model:visible="nameDialog" header="Name" :style="{ width: '25rem' }" position="center" :modal="true" :draggable="false" :closable="false">
    <div class="flex mb-4">
      <InputText
        v-model="username"
        id="name"
        class="flex-auto"
        autocomplete="off"
        @keydown.enter="submit()" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Submit" @click="submit()"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'
import BingoLineupForm from '../components/BingoLineupForm.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { Button, InputText, Dialog } from 'primevue'

const authStore = useAuthStore()
const username = ref<string>('')
const nameDialog = ref<boolean>(false)
const roomDialog = ref<boolean>(false)
const roomName = ref<string>('')
const joinName = ref<string>('')

function submit (): void {
  if (!username.value) return
  authStore.userLogin({ fullName: username.value})
  nameDialog.value = false
}

function randomCode (length = 5): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

function createRoom (): void {
  roomName.value = randomCode()
}

function joinRoom (): void {
  roomName.value = joinName.value
}

onMounted((): void => {
  if (!authStore.user.fullName) {
    nameDialog.value = true
  }

  if (!roomName.value) {
    roomDialog.value = true
  }
})
</script>

<style>
</style>
