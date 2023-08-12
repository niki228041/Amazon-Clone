
import { Link, useNavigate } from "react-router-dom";
import "../admin.css";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { TableRow } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name of Product', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },

    
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'countrymade', headerName: 'Maded Country', width: 230 },
];

const rows = [
    { id: 1, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 2, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 3, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 4, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 5, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 6, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 7, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 8, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 9, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
    { id: 10, Name: 'Snow', category:"some",price:"10000",countrymade:"china"},
];
export default function DataTable() {
    return (
        <div style={{ marginLeft: "300px", height: 650, width: "1200px" }}>
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