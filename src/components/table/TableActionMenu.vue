<template>
  <div v-bind="attrs">
    <PrimeButton
      aria-controls="overlay_menu"
      aria-haspopup="true"
      class="text-black !size-8"
      icon="pi pi-ellipsis-h"
      size="small"
      type="button"
      variant="text"
      rounded
      @click="toggle($event)" />
  </div>
  <PrimeMenu
    id="overlay_menu"
    ref="menu"
    :model="formatMenuItem(menuItems, data, index)"
    popup />
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import type { IMenuItems } from '@/models/Global.model'

interface IProps {
  menuItems?: IMenuItems[]
  data: any
  index: number
}

const attrs: any = useAttrs()
withDefaults(defineProps<IProps>(), {
  menuItems: (): IMenuItems[] => [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: (): void => {}
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (): void => {}
    }
  ]
})

const menu = ref()
function toggle (event: any): void {
  menu.value.toggle(event)
}

function formatMenuItem (items: IMenuItems[], data: any, index: number): any {
  return items.map((item: IMenuItems): any => ({
    ...item,
    data,
    index
  }))
}
</script>

<style scoped>

</style>
