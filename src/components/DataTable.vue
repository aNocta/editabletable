<script setup>
import DataTableHeader from  "./DataTableHeader.vue";
import DataTableFooter from "./DataTableFooter.vue";
import EditableTable from "./editable-table/EditableTable.vue";
import MassEdit from "./mass-edit/MassEdit.vue";
import { ref, getCurrentInstance, onMounted } from "vue";
import { useTableStore } from "@/store";

const tableConfig = getCurrentInstance().appContext.config.globalProperties.$tableConfig;
const headerCells = ref(tableConfig.columns);
const footerCells = ref(tableConfig.columns);

const tableStore = useTableStore();

onMounted(() => {
    tableStore.fetchCells();
});
</script>

<template>
    <div class="data-table">
        <DataTableHeader>{{ $tableConfig.tableName }}</DataTableHeader>
        <EditableTable :header="headerCells" :footer="footerCells"/>
        <DataTableFooter>Footer</DataTableFooter>
    </div>
    <MassEdit/>
</template>