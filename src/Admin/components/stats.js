import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { TextField } from "@mui/material";

const ShowTables= ({
    token,
    setShowLoader,
    setError,
    setShowError,
    setSuccess,
    setShowSuccess
}) => {
    
    // state variable to store the data
    const [data, setData] = useState([
        { id: 1, name: 'John Doe', age: 35 },
        { id: 2, name: 'Jane Doe', age: 32 },
        { id: 3, name: 'John Smith', age: 45 },
        { id: 4, name: 'Jane Smith', age: 42 },
    ]);
    useEffect(() => {
        setShowLoader(false);
    }, [setShowLoader]);
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    ]);
    // state variable to store the loading status
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    // state variable to store the error status
    return (
        <>
        <TextField id="outlined-basic" label="Search" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <DataGrid rows={data} columns={columns} pageSize={5} pagination />
        </>
        )
}

export default ShowTables;