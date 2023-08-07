
import { Link, useNavigate } from "react-router-dom";
import "../admin.css";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { TableRow } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name of Product', width: 130 },
    { field: 'personname', headerName: 'Shiped for', width: 230 },
    { field: 'country', headerName: 'Shiping country', width: 130 },
    { field: 'zipcode', headerName: 'Zip Code', width: 70 },
    { field: 'shipingaddress', headerName: 'Shiping Address', width: 230 },
    { field: 'phonnumber', headerName: 'Phone Number', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'date', headerName: 'Date', width: 230 },
    
   

    
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
   
   
];

const rows = [
    { id: 1, Name: 'Snow' ,personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 2, Name: 'Snow' ,personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 3, Name: 'Snow', personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 4, Name: 'Snow' ,personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 5, Name: 'Snow', personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 6, Name: 'Snow' ,personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 7, Name: 'Snow', personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 8, Name: 'Snow' ,personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 9, Name: 'Snow', personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
    { id: 10, Name: 'Snow', personname:"John Doe",country:"ukraine",zipcode:"678549", shipingaddress:"street home 76", phonnumber: '+380978168778', email: 'someone@gmail.com',date:"2023.07.02" },
];
export default function DataTable() {
    return (
        <div style={{ marginLeft: "300px", height: 650, width: "1500px" }}>
            <DataGrid style={{ color: "black" }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                
            />
           
        </div>
    );
}