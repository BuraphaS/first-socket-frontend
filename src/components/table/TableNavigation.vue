<template>
  <div class="flex items-center justify-between">
    <span class="text-[13px]">
      {{ numberFormatNoDecimal(pagination?.count) || 0 }} item{{ pagination?.count > 1 ? 's':'' }}
    </span>
    <div class="flex items-center">
      <PrimeButton
        :disabled="pagination.page <= 1"
        class="text-black disabled:opacity-25"
        icon="pi pi-arrow-left"
        size="small"
        variant="text"
        @click="prevPage()" />
      <span class="text-[13px]">
        {{ displayValue }}
      </span>
      <PrimeButton
        :disabled="pagination.page >= pagination.totalPage"
        class="text-black disabled:opacity-25"
        icon="pi pi-arrow-right"
        size="small"
        variant="text"
        @click="nextPage()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { numberFormatNoDecimal } from '@/plugins/Filters.plugin'
import type { IPagination } from '@/models/Table.model'

interface IEmits {
  change: []
}

const emits = defineEmits<IEmits>()

const pagination = defineModel<IPagination>({ default: {
  page: 1,
  totalPage: 1,
  count: 0,
  perPage: 25
} })

const displayValue = computed((): string => {
  const page = numberFormatNoDecimal(pagination.value?.page || 0)
  const totalPage = numberFormatNoDecimal(pagination.value?.totalPage || 0)
  return `${page} / ${totalPage}`
})

function prevPage (): void {
  if (pagination.value.page < 1) {
    return
  }
  pagination.value.page--
  emits('change')
}

function nextPage (): void {
  if (pagination.value.page >= pagination.value.totalPage) {
    return
  }
  pagination.value.page++
  emits('change')
}
</script>

<style scoped>

</style>
