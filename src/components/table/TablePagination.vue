<template>
  <div class="flex items-center justify-between">
    <div class="text-[13px] flex items-center">
      <BaseSelect
        v-model="pagination.perPage"
        :options="perPageItems"
        class="h-8 mr-3 bg-transparent *:h-8 min-h-0 *:px-2.5 *:py-[7px]"
        @change="onPageChange()" />
      <span class="whitespace-nowrap">
        {{ perPageDisplayValue }}
      </span>
    </div>
    <div class="flex items-center gap-2 text-[13px]">
      <PrimeInputNumber
        v-model="pagination.page"
        :max="pagination.totalPage"
        :min="0"
        class="w-12 *:h-8 *:px-2.5 *:py-[7px]"
        fluid
        @blur="onPageChange()"
        @keypress.enter="onPageChange()" />
      <span class="whitespace-nowrap">
        of {{ numberFormatNoDecimal(pagination?.totalPage) || 0 }}
      </span>
      <PrimeButton
        :disabled="pagination.page <= 1"
        class="text-black border-black size-[30px] disabled:opacity-25 p-1.5"
        icon="pi pi-angle-left"
        variant="outlined"
        @click="prevPage()" />
      <PrimeButton
        :disabled="pagination.page >= pagination.totalPage"
        class="text-black border-black size-[30px] disabled:opacity-25 p-1.5"
        icon="pi pi-angle-right"
        variant="outlined"
        @click="nextPage()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const perPageDisplayValue = computed((): string => {
  const page = pagination.value.page - 1
  const firstItem = pagination.value.count
    ? (page * pagination.value.perPage) + 1
    : 0
  const lastItem = firstItem + pagination.value.perPage - 1
  const count = pagination.value?.count || 0
  const lastItemValue = lastItem > count
    ? count
    : lastItem
  return `${numberFormatNoDecimal(firstItem)}-${numberFormatNoDecimal(lastItemValue)} of ${numberFormatNoDecimal(count)}`
})

const perPageItems = ref<number[]>([
  5, 10, 25, 50, 100
])

function onPageChange (): void {
  emits('change')
}

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

<style lang="postcss" scoped>
:deep(.p-select-label) {
  @apply flex items-center
}
</style>
