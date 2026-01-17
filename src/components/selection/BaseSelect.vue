<template>
  <BaseAutoComplete
    v-if="autoComplete"
    v-model="model"
    :multiple="multiple"
    :option-label="optionLabel"
    v-bind="attrs"
    @focus="onFocus($event)"
    @remove="onRemove($event)"
    @search="emits('search', $event)">
    <template
      v-if="slots.default"
      #default="{option}">
      <slot v-bind="{option}" />
    </template>
  </BaseAutoComplete>
  <PrimeMultiSelect
    v-else-if="multiple"
    v-model="model"
    :option-label="optionLabel"
    :show-toggle-all="false"
    v-bind="attrs"
    class="font-normal"
    @focus.once="onFocus($event)">
    <template #value="{value}">
      <SelectionChip
        :option-label="optionLabel"
        :placeholder="attrs?.placeholder"
        :value="value"
        @remove="onRemove($event)" />
    </template>
  </PrimeMultiSelect>
  <PrimeSelect
    v-else
    v-model="model"
    :option-label="optionLabel"
    v-bind="attrs"
    class="font-normal"
    @focus.once="onFocus($event)">
    <template
      v-if="slots.default"
      #option>
      <slot />
    </template>
  </PrimeSelect>
</template>

<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'

interface IProps {
  multiple?: boolean
  autoComplete?: boolean
  optionLabel?: string | any
}

interface IEmits {
  search: [string]
  focus: [FocusEvent]
}

defineProps<IProps>()
const model = defineModel<any>()
const emits = defineEmits<IEmits>()
const attrs: any = useAttrs()
const slots: any = useSlots()

function onRemove (index: number): void {
  model.value?.splice(index, 1)
}
function onFocus (event: FocusEvent): void {
  emits('focus', event)
}
</script>

<style lang="postcss" scoped>
</style>
