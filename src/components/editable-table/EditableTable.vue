<script setup>
  import {defineProps} from "vue";
  import EditableTableRow from "./EditableTableRow.vue";
  import { useTableStore } from "@/store";
  import EditableTableColHeader from "./EditableTableColHeader.vue";

  const tableStore = useTableStore();
   const props =  defineProps({
        header: Array,
        footer: Array,
    });
</script>

<template>
    <table class="editable-table">
        <thead>
            <tr :style="{gridTemplateColumns: `repeat(${props.header.length}, 1fr)`}">
                <EditableTableColHeader v-for="(hc, k) in props.header"  :col="k" :key="k">{{ hc }}</EditableTableColHeader>
            </tr>
        </thead>
        <tbody>
            <EditableTableRow v-for="row,k in tableStore.cells" :key="k" :cells="row" :rowIndex="k" :isEditable="tableStore.selectedRows.indexOf(k) >= 0"/>
        </tbody>
        <tfoot>
            <tr :style="{gridTemplateColumns: `repeat(${props.header.length}, 1fr)`}">
                <EditableTableColHeader v-for="(hc, k) in props.header"  :col="k" :key="k">{{ hc }}</EditableTableColHeader>
            </tr>
        </tfoot>
    </table>
</template>