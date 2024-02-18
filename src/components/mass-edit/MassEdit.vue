<script setup>
    import {ref} from "vue";
    import {storeToRefs} from "pinia";
    import {useTableStore} from "@/store";

    const newValue = ref("");
    const tableStore = useTableStore();
    const {selectedCount} = storeToRefs(tableStore);

    const changeValues = e => {
        tableStore.massChange(newValue.value);
        newValue.value = "";    
    }
</script>

<template>
    <div v-if="selectedCount > 0"  class="table-mass-edit">
        <span>Выбрано элементов: {{ selectedCount }}</span>
        <form action="#" @submit.prevent="changeValues">
            <input type="text" placeholder="Заменить на:" v-model="newValue">
            <button>Ok</button>
        </form>
    </div>
</template>