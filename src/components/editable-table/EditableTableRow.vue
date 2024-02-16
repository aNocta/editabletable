<script setup>
    import { useTableStore } from '@/store';
    import EditableTableCell from './EditableTableCell.vue';
    import { computed } from 'vue';

    const tableStore = useTableStore();
    const isSelected = (row, col) => {
        let result = false;
        tableStore.selectedCells.forEach(cell => {
            if(cell.row == row && cell.col == col) result = true;
        });
        return result;
    };
    const {cells, rowIndex} = defineProps({
            cells: Array,
            rowIndex: Number
        })
</script>

<template>
    <tr>
        <EditableTableCell v-for="cell,k in cells" :key="k" :cellValue="cell" :rowIndex="rowIndex" :colIndex="k" :selected="isSelected(rowIndex, k)"></EditableTableCell>
    </tr>
</template>