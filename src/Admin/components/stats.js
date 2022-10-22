import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
    useEffect(() => {
        setShowLoader(false);
    }, [setShowLoader]);
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'S.No', width: 70 },
        { field: 'roll_number', headerName: 'Roll number', type:'number', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'cpi', headerName: 'CPI', type: 'number', width: 90 },
        { field: 'first_selection', headerName: 'First Selection', width: 150 },
        { field: "first_tier", headerName: "First Tier", width: 100, type:'number'},
        { field: "first_ctc", headerName: "First CTC", width: 100 },
        { field: "second_selection", headerName: "Second Selection", width: 150 },
        { field: "second_tier", headerName: "Second Tier", width: 100, type:'number'},
        { field: "second_ctc", headerName: "Second CTC", width: 100 },
        { field: "final_accepted", headerName: "Final Accepted", width: 1500 },
        { field: "registration_status", headerName: "Registration Status",width: 150 }
        
    ]);
    const [data, setData] = useState([
        { id: 1, roll_number: 1, email: "abc@gmail.com", name: "abc", cpi: 8.5, first_selection: "abc", first_tier: 1, first_ctc: 100000, second_selection: "abc2", second_tier: 2, second_ctc: 100000, final_accepted: "abc", registration_status: "registered" },
        { id: 2, roll_number: 2, email: "200@gmail.com", name:  'john', cpi: 8.5, first_selection: "abc", first_tier: 1, first_ctc: 100000, second_selection: "abc2", second_tier: 2, second_ctc: 100000, final_accepted: "abc", registration_status: "registered" },
    ]);
    return (
        <div style={{ height: '100%', width: '100%', display:"flex", flexDirection:"column" }}>
            {/* heading */}
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"10%", width:"100%", backgroundColor:"#31778", color:"black", fontSize:"2rem", fontWeight:"bold"}}>
                <h1>Student Placement Data</h1>
            </div>
        <div style={{flexGrow:1}}>
            <DataGrid  rows={data} columns={columns} pageSize={50} components={{ Toolbar: GridToolbar }} pagination autoHeight />
        </div>
        </div>
        )
}

export default ShowTables;