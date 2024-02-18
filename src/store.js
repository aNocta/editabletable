import { defineStore } from "pinia";
import axios from "axios";
import { jsonManager } from "./jsonManager";


export const useTableStore = defineStore("tableStore", {
    state: () => ({
        cells: [],
        selectedCells: [],
        selectedRows: [],
        selectedCols: [],
        tableConfig: {},
        appConfig: {}
    }),
    getters: {
        selectedCount: state => {
            if(!state.cells.length) return 0;
            const selectedColsCount = state.selectedCols.length;
            const selectedRowsCount = state.selectedRows.length;
            let count =  selectedColsCount*selectedRowsCount;
            if(selectedColsCount == 0) return selectedRowsCount*state.cells[0].length;
            if(selectedRowsCount == 0) return selectedColsCount*state.cells.length;
            return count;
        }
    },
    actions: {
        async getConfig(){
            this.tableConfig = await jsonManager();
        },
        async fetchCells(){
            this.appConfig = this.$appData;
            const appConfig =  this.appConfig;
            this.tableConfig = await jsonManager();
            const tableConfig =  this.tableConfig;
            const cellData = await axios.get(`${tableConfig.backendDomain}${tableConfig.get.endpoint}?${tableConfig.get.tableIdField}=${appConfig.tableEndpointId}`);
            console.log(`${tableConfig.backendDomain}${tableConfig.get.endpoint}?${tableConfig.get.tableIdField}=${appConfig.tableEndpointId}`);
            const fetched = cellData.data;
            const toLoad = [];
            fetched.forEach(item => {
            if(!toLoad[item[tableConfig.get.rowField]]) toLoad[item[tableConfig.get.rowField]] = [];
                 toLoad[item[tableConfig.get.rowField]][item[tableConfig.get.colField]]  = item.value;
            });
            this.cells = toLoad;
            console.log(await jsonManager());
        },
        change(row, col, newValue){
            const tableConfig = this.tableConfig;
            const appConfig = this.appConfig;
            const cellsToChange = this.cells;
            cellsToChange[row][col] = newValue;
            this.cells = cellsToChange;
            this.selectedCells = this.selectedCells.filter(cell =>{
                if(cell.row == row && cell.col == col) return false;
                return true;
            });
            axios.post(`${tableConfig.backendDomain}${tableConfig.set.endpoint}`, {
                [this.tableConfig.set.tableIdField]: appConfig.tableEndpointId,
                [this.tableConfig.set.rowField]: row,
                [this.tableConfig.set.colField]: col,
                [this.tableConfig.set.valField]: newValue,
            }, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(res => console.log(res));
        },
        massChange(newValue){
            const tableConfig = this.tableConfig;
            const appConfig = this.appConfig;
            const cellsToUpload = [];
            const cellsToChange = this.cells;
            if(this.selectedCols.length == 0){
                for(let i = 0; i < this.cells[0].length; i++)
                    this.selectedRows.forEach(row => {
                        cellsToChange[row][i] = newValue;
                        cellsToUpload.push({
                            [this.tableConfig.multiSet.tableIdField]: appConfig.tableEndpointId,
                            [this.tableConfig.multiSet.colField]: i,
                            [this.tableConfig.multiSet.rowField]: row,
                            [this.tableConfig.multiSet.valField]: newValue,
                        });
                    });
            }
            if(this.selectedRows.length == 0){
                for(let i = 0; i < this.cells.length; i++)
                     this.selectedCols.forEach(col => {
                        cellsToChange[i][col] = newValue;
                        cellsToUpload.push({
                            [this.tableConfig.multiSet.tableIdField]: appConfig.tableEndpointId,
                            [this.tableConfig.multiSet.colField]: col,
                            [this.tableConfig.multiSet.rowField]: i,
                            [this.tableConfig.multiSet.valField]: newValue,
                        });
                    });
            }
            this.selectedRows.forEach(row => {
                this.selectedCols.forEach(col => {
                    cellsToChange[row][col] = newValue;
                    cellsToUpload.push({
                        [this.tableConfig.multiSet.tableIdField]: appConfig.tableEndpointId,
                        [this.tableConfig.multiSet.colField]: col,
                        [this.tableConfig.multiSet.rowField]: row,
                        [this.tableConfig.multiSet.valField]: newValue,
                    });
                });
            });
            axios.post(`${tableConfig.backendDomain}${tableConfig.multiSet.endpoint}`, {
                mass: cellsToUpload
            }, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(res => console.log(res));
            this.cells = cellsToChange;
            this.selectedCells = [];
        },
        select(row, col){
            this.selectedCells = [...this.selectedCells, {row, col}];
        },
        selectRow(row){
            this.selectedRows = [...this.selectedRows, row];
        },
        unselectRow(row){
            this.selectedRows = this.selectedRows.filter(x => x != row);
        },
        selectCol(col){
            this.selectedCols = [...this.selectedCols, col];
        },
        unselectCol(col){
            this.selectedCols = this.selectedCols.filter(x => x != col);
        },
    }
});
