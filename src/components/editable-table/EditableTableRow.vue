<script setup>
    import {ref} from "vue";
    import { useTableStore } from '@/store';
    import EditableTableCell from './EditableTableCell.vue';
    import MassEditTrigger from '../mass-edit/MassEditTrigger.vue';

    const {cells, rowIndex, isEditable} = defineProps({
            cells: Array,
            rowIndex: Number,
            isEditable: Boolean
        })
    const tableStore = useTableStore();

    const isSelectedRow = ref(false);
    const selectRow = () => {
        tableStore.selectedRows.indexOf(rowIndex) >= 0 ? tableStore.unselectRow(rowIndex) : tableStore.selectRow(rowIndex);
    }

    const isSelected = (row, col) => {
        if(!tableStore.selectedRows.length) return tableStore.selectedCols.indexOf(col) >= 0;
        if(!tableStore.selectedCols.length) return tableStore.selectedRows.indexOf(row) >= 0;
        return tableStore.selectedRows.indexOf(row) >= 0 && tableStore.selectedCols.indexOf(col) >= 0;
    };
</script>

<template>
    <tr :class="{active: isEditable}" :style="{gridTemplateColumns: `repeat(${cells.length}, 1fr) 50px`}">
        <EditableTableCell v-for="cell,k in cells" :key="k" :cellValue="cell" :rowIndex="rowIndex" :colIndex="k" :selected="isSelected(rowIndex, k)"></EditableTableCell>
        <th>
            <MassEditTrigger @edit="selectRow"/>
        </th>
    </tr>
</template>

<style>
</style>