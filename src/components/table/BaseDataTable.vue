<template>
  <div class="w-full space-y-4">
    <TableNavigation
      v-if="!hideNavigation"
      v-model="pagination"
      :class="navigationClass"
      @change="emits('change')" />

    <PrimeCard
      class="w-full overflow-hidden rounded-lg"
      unstyled>
      <template #content>
        <PrimeDataTable
          :sort-field="null"
          :sort-order="null"
          :value="items"
          class="w-full"
          removable-sort
          @sort="onSortChange($event)">
          <template
            v-for="col of columns"
            :key="col.header">
            <PrimeColumn
              v-if="col.header === 'select'"
              column-key="select"
              header="">
              <template #header>
                <PrimeCheckbox
                  :indeterminate="!!select.length && select.length !== items.length"
                  :model-value="select.length === items.length"
                  binary
                  readonly
                  @click="onSelectAll(col)" />
              </template>
              <template #body="{data, index}">
                <slot
                  :data="data"
                  :index="index"
                  name="select">
                  <TableSelect
                    v-model="select"
                    :col="col"
                    :data="data" />
                </slot>
              </template>
            </PrimeColumn>
            <PrimeColumn
              v-else-if="col.header === 'action'"
              align-frozen="right"
              class="w-20"
              column-key="action"
              header=""
              frozen>
              <template #body="{data, index}">
                <div class="action-button">
                  <slot
                    :data="data"
                    :index="index"
                    name="action">
                    <TableActionMenu
                      :data="data"
                      :index="index"
                      :menu-items="menuItems" />
                  </slot>
                </div>
              </template>
            </PrimeColumn>
            <PrimeColumn
              v-else
              v-bind="col">
              <template #sorticon="{sorted, sortOrder}">
                <TableSortIcon
                  :sort-order="sortOrder"
                  :sorted="sorted" />
              </template>
              <template #body="{data}">
                <slot
                  :data="data"
                  :name="`item.${col?.field}`"
                  :value="
                    col.value
                      ? col.value(data)
                      : data?.[col.field!]">
                  <p>
                    {{ col.value
                      ? col.value(data)
                      : data?.[col.field!] || '-' }}
                  </p>
                </slot>
              </template>
            </PrimeColumn>
          </template>
        </PrimeDataTable>
      </template>
    </PrimeCard>

    <TablePagination
      v-if="!hidePagination"
      v-model="pagination"
      :class="paginationClass"
      @change="emits('change')" />
  </div>
</template>

<script setup lang="ts">
import type { IMenuItems } from '@/models/Global.model'
import type { DataTableSortEvent } from 'primevue'
import type { IPagination, ITableHeader, ITableSort } from '@/models/Table.model'

interface IProps {
  columns?: ITableHeader[]
  items?: any[]
  hidePagination?: boolean
  hideNavigation?: boolean
  menuItems?: IMenuItems[]
  navigationClass?: string
  paginationClass?: string
}

interface IEmits {
  change: []
}

const emits = defineEmits<IEmits>()
const select = defineModel<any[]>('select', { default: [] })
const sort = defineModel<ITableSort>('sort', { default: {
  sortField: null,
  sortOrder: null
} })
const pagination = defineModel<IPagination>({ default: {
  page: 1,
  totalPage: 1,
  count: 0,
  perPage: 25
} })

const props = withDefaults(defineProps<IProps>(), {
  columns: (): ITableHeader[] => [],
  items: (): any[] => [],
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
  ],
  navigationClass: '',
  paginationClass: ''
})

function onSortChange (sortEvent: DataTableSortEvent): void {
  sort.value.sortField = sortEvent.sortField as string
  sort.value.sortOrder = sortEvent.sortOrder
  emits('change')
}

function onSelectAll (col: any): void {
  if (select.value.length === props.items.length) {
    select.value = []
  } else {
    const key = col?.field
    select.value = props.items.map((item: any): any => key
      ? item?.[key]
      : item)
  }
}
</script>

<style lang="postcss" scoped>
:deep(tr) {
  th:first-child,
  td:first-child {
    @apply !pl-[20px];
  }
  th:last-child,
  td:last-child {
    @apply !pr-[20px];
  }
}

:deep(tr) {
  @apply relative;
}

:deep(thead tr th) {
  @apply py-[18px]
}

:deep(tbody tr td) {
  @apply min-h-16 py-4 px-5
}

:deep(tbody tr td),
:deep(thead tr th) {
  border-bottom-color: #EFEFEF;
}

:deep(tbody tr td),
:deep(thead tr th),
:deep(tbody tr td > a) {
  @apply whitespace-nowrap text-ellipsis overflow-hidden;
}

:deep(tbody tr td > a) {
  @apply block max-w-60 font-medium text-primary;
}

:deep(.action-button) {
  @apply flex justify-end w-full;
}

:deep(th.p-datatable-frozen-column),
:deep(td:has(> .action-button)) {
  @apply sticky right-0 bg-white p-0;
}

:deep(.p-datatable-empty-message) {
  @apply hidden;
}

:deep(.p-datatable-column-header-content) {
  @apply justify-between
}

:deep(.p-datatable-table-container) {
  min-height: 440px;
  position: relative;
  background: white;
}

:deep(.p-datatable-thead) {
  top: 0;
  z-index: 10;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #EFEFEF;
}
</style>
