<script setup>
    import { useTableStore } from '@/store';
    import { defineProps } from 'vue';

    const props = defineProps(["cellValue", "rowIndex", "colIndex", "selected"]);
    const tableStore = useTableStore();

    const editModeComplete = e => {
        tableStore.change(props.rowIndex, props.colIndex, e.target.elements[`cell${props.rowIndex}${props.colIndex}`].value);
    }
</script>

<template>
    <th>
        <form v-if="props.selected" @submit.prevent="editModeComplete"  action="#">
            <input type="text" placeholder="Введите значение" :value="props.cellValue" :id="`cell${props.rowIndex}${props.colIndex}`">
            <button>ok</button>
        </form>
        <div v-if="!props.selected" @click="tableStore.select(props.rowIndex, props.colIndex)" class="editable-table__cell">
            <span>
                {{ props.cellValue }}
            </span>
            <button class="editable-table__btn" aria-label="Редактировать" title="Редактировать">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
            </button>
        </div>
    </th>
</template>