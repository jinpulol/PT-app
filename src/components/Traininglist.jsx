import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import AddTraining from './AddTraining'
import { Snackbar } from "@mui/material";

function Traininglist() {

    //state variables
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false); //will be used for snackbar's visibility
    const [msg, setMsg] = useState(''); //will be used to show snackbar's message

    //columns for training table (ag-grid)
    const columns = [
        {
            field: 'date', sortable: true, filter: true,
            valueGetter: params => dayjs(params.data.date).format('DD.MM.YYYY HH:mm')
            //valueGetter is used to format date
        },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Customer', valueGetter: (params) => params.data.customer
            ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
            : 'N/D',
            sortable: true, filter: true},
        { cellRenderer: params => <Delete color="error" onClick={() => deleteTraining(params)} />, width: 50}
    ]

    // call getTrainings() when rendering the component first time
    useEffect(() => getTrainings(), []);
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';
    const REST_URL_ADD = 'https://traineeapp.azurewebsites.net/api/trainings';

    //function to fetch trainings from REST API
    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json()) // parse the response as JSON
            .then(responseData => {
                console.log("responseData " + responseData),
                    setTrainings(responseData) // save the data in state
            })
    }

    //function to add training
    const addTraining = (training) => {
        fetch(REST_URL_ADD, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    getTrainings();
                    setOpen(true);
                    setMsg('Training added successfully!');
                }
                else {
                    alert('Something went wrong!');
                }
            })
            .catch(error => console.error(error))
    }

    //function to delete training
    const deleteTraining = (params) => {
        if (window.confirm(`Are you sure you want to delete ${params.data.customer.firstname}'s ${params.data.activity}?`)) {
            fetch(`${REST_URL_ADD}/${params.data.id}`, { method: 'DELETE' })
                .then(_ => {
                    getTrainings();
                    setOpen(true);
                    setMsg('Training deleted successfully!');
                })
                .catch(error => console.error(error))                   
                }
        }

    //todo: delete function doesnt work when customer is null
    

    return (
        <>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', margin: 0, padding: 0 }}>
    <div className="ag-theme-material"
        style={{ height: 600, width: 1500 }}>
                <div style={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
        <AddTraining addTraining={addTraining} />
        </div>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    floatingFilter={true}
                    suppressCellSelection={true}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
            </div>
        </>
    );
}
export default Traininglist;

