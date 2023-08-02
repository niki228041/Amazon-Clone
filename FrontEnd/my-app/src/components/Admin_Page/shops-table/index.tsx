
import { Link, useNavigate } from "react-router-dom";
import "../admin.css";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { TableRow } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },

    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'phonnumber', headerName: 'Phone Number', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 6, lastName: 'Melisandre', firstName: null, phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', phonnumber: '+380978168778', email: 'someone@gmail.com' },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', phonnumber: '+380978168778', email: 'someone@gmail.com' },
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