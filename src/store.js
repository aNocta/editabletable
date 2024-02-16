import { defineStore } from "pinia";

export const useTableStore = defineStore("tableStore", {
    state: () => ({
        cells: [
            ["A", "B", "C"],
            ["A", "B", "C"],
            ["A", "B", "C"],
        ],
        selectedCells: []
    }),
    getters: {
        selectedCount: state => state.selectedCells.length
    },
    actions: {
        change(row, col, newValue){
            const cellsToChange = this.cells;
            cellsToChange[row][col] = newValue;
            this.cells = cellsToChange;
            this.selectedCells = this.selectedCells.filter(cell =>{
                if(cell.row == row && cell.col == col) return false;
                return true;
            });
        },
        massChange(newValue){
            const cellsToChange = this.cells;
            this.selectedCells.forEach(cell => {
                cellsToChange[cell.row][cell.col] = newValue;
            });
            this.cell = cellsToChange;
            this.selectedCells = [];
        },
        select(row, col){
            this.selectedCells = [...this.selectedCells, {row, col}];
        }
    }
});