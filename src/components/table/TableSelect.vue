<template>
  <PrimeCheckbox
    :key="extractSelectValue"
    :model-value="selectIndex >= 0"
    binary
    @update:model-value="onSelect()" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ITableHeader } from '@/models/Table.model'

interface IProps {
  col: ITableHeader
  data: any
}

const model = defineModel<any[]>({ default: [] })
const props = defineProps<IProps>()

const selectValue = computed((): any => {
  return props.col?.field
    ? props.data[props.col.field]
    : props.data
})

function extractSelectValue (base: any): any {
  return props.col?.optionKey
    ? base[props.col.optionKey]
    : base
}

const selectIndex = computed((): number => {
  const currentValue = extractSelectValue(props.data)
  return model.value.findIndex((item: any): boolean => {
    const modelValue = extractSelectValue(item)
    return modelValue === currentValue
  })
})

function onSelect (): void {
  if (selectIndex.value >= 0) {
    model.value.splice(selectIndex.value, 1)
    return
  }
  model.value.push(selectValue.value)
}
</script>

<style scoped>

</style>
