import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import dayjs from "dayjs";

function Traininglist() {

    //state variables
    const [trainings, setTrainings] = useState([]);

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
            headerName: 'Customer', valueGetter: params =>
                `${params.data.customer.firstname} ${params.data.customer.lastname}`, sortable: true, filter: true
        }, //valueGetter is used to combine firstname and lastname
    ]

    // call getTrainings() when rendering the component first time
    useEffect(() => getTrainings(), []);
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    //function to fetch trainings from REST API
    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json()) // parse the response as JSON
            .then(responseData => {
                console.log("responseData " + responseData),
                    setTrainings(responseData) // save the data in state
            })
    }

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: 600, width: 1500, margin: 'auto' }}>
                <h1>Trainings</h1>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    floatingFilter={true}
                    suppressCellSelection={true}>
                </AgGridReact>
            </div>
        </>
    );
}
export default Traininglist;

