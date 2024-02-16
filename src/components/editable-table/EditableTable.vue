<script setup>
  import {defineProps} from "vue";
  import EditableTableRow from "./EditableTableRow.vue";
import { useTableStore } from "@/store";

  const tableStore = useTableStore();
   const props =  defineProps({
        header: Array,
        footer: Array,
    });
</script>

<template>
    <table class="editable-table">
        <thead>
            <tr>
                <th v-for="(hc, k) in props.header" :key="k">{{ hc }}</th>
            </tr>
        </thead>
        <tbody>
            <EditableTableRow v-for="row,k in tableStore.cells" :key="k" :cells="row" :rowIndex="k"/>
        </tbody>
        <tfoot>
            <tr>
                <th v-for="(hc, k) in props.footer" :key="k">{{ hc }}</th>
            </tr>
        </tfoot>
    </table>
</template>