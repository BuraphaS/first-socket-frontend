<template>
  <div class="flex flex-col gap-0">
    <PrimeImage
      :src="sortIcons"
      alt="sort icon"
      height="20" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  sorted?: boolean
  sortOrder: number
}

const props = defineProps<IProps>()

const sortIcons = computed((): string => {
  if (!props.sorted) {
    return '/svg/sort-default.svg'
  }
  if (props.sortOrder === -1) {
    return '/svg/sort-up.svg'
  }
  if (props.sortOrder === 1) {
    return '/svg/sort-down.svg'
  }
  return ''
})
</script>

<style scoped>

</style>
