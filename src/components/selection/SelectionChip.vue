<template>
  <span v-if="!value?.length">
    <PrimeChip
      :label="optionLabel
        ? value?.[optionLabel] || value?.name || value
        : value"
      class="items-center"
      remove-icon="pi pi-times"
      removable
      @remove="emits('remove')" />
  </span>
  <div
    v-else
    class="flex flex-wrap w-full space-x-2 space-y-1">
    <PrimeChip
      v-for="(item, index) in value"
      :key="index"
      :label="optionLabel
        ? item?.[optionLabel] || item?.name || item
        : item"
      class="items-center"
      remove-icon="pi pi-times"
      removable
      @remove="emits('remove', index)" />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  value: any
  placeholder?: string
  optionLabel?: string
}

interface IEmits {
  remove: [index?: number]
}

defineProps<IProps>()
const emits = defineEmits<IEmits>()
</script>

<style lang="postcss" scoped>
:deep(.p-chip) {
  @apply rounded-[3px] px-2 py-[3px];
}

:deep(.p-chip-remove-icon) {
  @apply -translate-y-0.5;
}
</style>
