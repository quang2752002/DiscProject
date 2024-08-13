type StringArr = string[];
type TableData<TableDataType> = {
    tableName: string,
    columns: StringArr,
    rows: TableDataType[]
}