
<template>
    <div class="card">
        <div class="flex flex-wrap justify-center gap-2">
            <Button class="chat-btn" label="Chat" icon="pi pi-comments" @click="openModal()" severity="primary" style="min-width: 10rem" />
        </div>

        <Dialog v-model:visible="visible" header="Chat" :style="{ width: '25rem' }" position="bottomright" :modal="true" :draggable="false">
          <Card class="border h-[255px] mb-4 overflow-auto">
            <template #content>
                <p class="m-0" v-for="(m, i) in messages"
                  :key="i">
                  {{ m }}
                </p>
            </template>
          </Card>
            <div class="flex justify-end gap-2">
                <InputText v-model="text" id="chat" class="flex-auto" autocomplete="off" @keydown.enter="send()"/>
                <Button type="submit" label="Send" @click="send()"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { chatSocket } from '@/utils/Socket.ts'
import { Button, Dialog, InputText, Card } from "primevue"
import { useAuthStore } from '@/stores/Auth'

interface IProps {
  roomName: string
}

const props = defineProps<IProps>()
const authStore = useAuthStore()
const visible = ref<boolean>(false)
const fullName = computed((): string => authStore.user.fullName)

const messages = ref<string[]>([])
const text = ref<string>('')

function openModal (): void {
  visible.value = true
}

function send (): void {
  if (!text.value) return
  chatSocket.emit('chat:send-message', {
    roomId: props.roomName,
    sender: fullName.value,
    message: text.value
  })
  text.value = ''
}

onMounted((): void => {
  chatSocket.emit('chat:join-room', props.roomName)

  chatSocket.on('new-message', (data: any): void => {
    messages.value.push(
      `${data.sender}: ${data.message}`
    )
  })
})
</script>

<style scope lang="css">
.chat-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 10rem;
  z-index: 1000;
}
</style>