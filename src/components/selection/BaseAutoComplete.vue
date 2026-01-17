<template>
  <PrimeAutoComplete
    v-if="multiple"
    ref="autocompleteRef"
    v-model="innerModel"
    v-bind="{
      ...autoCompleteOptions,
      ...attrs
    }"
    class="font-normal"
    multiple
    @complete="onComplete($event)"
    @focus.once="onFocus($event)"
    @update:model-value="onUpdateModel()">
    <template #chip="{value, index, removeCallback}">
      <SelectionChip
        :option-label="optionLabel"
        :placeholder="attrs?.placeholder"
        :value="value"
        @remove="
          removeCallback(),
          emits('remove', $event || index)
        " />
    </template>
    <template
      v-if="slots.default"
      #option="{option}">
      <slot v-bind="{option}" />
    </template>
  </PrimeAutoComplete>
  <PrimeAutoComplete
    v-else
    ref="autocompleteRef"
    v-model="innerModel"
    v-bind="{
      ...autoCompleteOptions,
      ...attrs
    }"
    class="font-normal"
    @complete="onComplete($event)"
    @focus.once="onFocus($event)"
    @update:model-value="onUpdateModel()">
    <template
      v-if="slots.default"
      #option="{option}">
      <slot v-bind="{option}" />
    </template>
  </PrimeAutoComplete>
</template>

<script setup lang="ts">
import type { AutoCompleteCompleteEvent, AutoCompleteProps } from 'primevue'
import { computed, onMounted, ref, useAttrs, useSlots, watch } from 'vue'

interface IProps {
  options?: any[]
  optionLabel?: string | any
  optionValue?: string
  multiple?: boolean
  apiSearch?: boolean
  returnObject?: boolean
  dataKey?: string
}

interface IEmits {
  search: [string]
  remove: [any]
  focus: [FocusEvent]
}

const props = withDefaults(defineProps<IProps>(), {
  options: (): any[] => [],
  optionLabel: undefined,
  optionValue: undefined,
  multiple: false,
  apiSearch: false,
  returnObject: false,
  dataKey: 'id'
})
const model = defineModel<any>({ default: null })
const emits = defineEmits<IEmits>()
const attrs: any = useAttrs()
const slots: any = useSlots()

const autocompleteRef = ref<any>()

const innerModel = ref<any>()

const suggestions = ref<any[]>([])
const autoCompleteOptions = computed((): AutoCompleteProps => ({
  dataKey: 'id',
  fluid: true,
  dropdown: true,
  dropdownMode: 'blank',
  optionLabel: props.optionLabel,
  suggestions: suggestions.value
}))

function onComplete (event: AutoCompleteCompleteEvent): void {
  const query = event.query?.toLowerCase() || ''
  if (props.apiSearch) {
    emits('search', query)
  } else {
    suggestions.value = props?.options?.filter((item: any): boolean => {
      const itemValue = props.optionLabel
        ? item?.[props.optionLabel] || ''
        : item || ''
      return itemValue.toLowerCase().includes(query)
    })
  }
}

function onUpdateModel (): void {
  if (props.multiple && props.returnObject) {
    model.value = [...innerModel.value]
  } else if (props.multiple) {
    model.value = innerModel.value?.map((item: any): any => {
      return props.optionValue
        ? item?.[props.optionValue]
        : item
    })
  } else if (props.returnObject) {
    model.value = innerModel.value
  } else {
    model.value = props.optionValue
      ? innerModel.value?.[props.optionValue] || innerModel.value
      : innerModel.value
  }
}

function setValue (): void {
  if (props.multiple) {
    innerModel.value = props.options.filter((option: any): any => {
      if (props.returnObject) {
        return model.value.some((item: any): boolean => {
          return item[props.dataKey] === option[props.dataKey]
        })
      }
      return props.optionValue
        ? model.value.includes(option?.[props.optionValue] || option)
        : model.value.includes(option)
    })
  } else {
    innerModel.value = props.options.find((option: any): any => {
      if (props.returnObject) {
        return model.value?.[props.dataKey] === option?.[props.dataKey]
      }
      return props.optionValue
        ? model.value === (option?.[props.optionValue] || option)
        || model.value?.[props.optionValue] === (option?.[props.optionValue] || option)
        : model.value === option
    }) || model.value || null
  }
}

watch(
  (): any[] => props?.options, (options: any[]): void => {
    suggestions.value = options
    setValue()
  }
)
watch(
  (): any[] => model?.value, (): void => {
    setValue()
  }
)

function onFocus (event: FocusEvent): void {
  emits('focus', event)
}

function setClickActions (): void {
  const inputElement = autocompleteRef.value.$el
  const [inputEl, buttonEl] = [
    inputElement.querySelector('ul li input'),
    inputElement.querySelector('button')
  ]
  inputEl?.addEventListener('click', (): void => {
    buttonEl?.click()
  })
}

onMounted((): void => {
  setValue()
  setClickActions()
})
</script>

<style lang="postcss" scoped>
:deep(.p-autocomplete-input),
:deep(.p-autocomplete-input-multiple) {
  @apply border-r-0
}

:deep(.p-autocomplete-dropdown) {
  --tw-border-opacity: 1;
  border-color: color-mix(in srgb, var(--p-surface-300) calc(100%* var(--tw-border-opacity, 1)), transparent);
  --tw-bg-opacity: 1;
  background-color: color-mix(in srgb, var(--p-surface-0) calc(100%* var(--tw-bg-opacity, 1)), transparent);

  @apply bg-white border border-l-0
}
</style>
