<template>
    <div class="table-mass-trigger">
        <input type="checkbox" title="Выбрать" @change="$emit('edit')">
    </div>
</template>

<style scoped>
    .table-mass-trigger{
        position: absolute;
        right: -.9rem;
        top: calc(50% - 10px);
    }
</style>