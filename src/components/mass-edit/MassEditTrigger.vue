<template>
    <div class="table-mass-trigger">
        <input type="checkbox" title="Выбрать" @change="$emit('edit')">
    </div>
</template>

<style scoped>
    .table-mass-trigger{
        display: grid;
        place-items: center;
        height: 100%;
    }
</style>