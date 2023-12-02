import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';


function Customerlist () {

    //state variables
    const [customers, setCustomers] = useState([]);

    //columns for customer table (ag-grid)
    const columns = [
        { headerName: 'Customer', valueGetter: params => 
        `${params.data.firstname} ${params.data.lastname}`, sortable: true, filter: true }, //valueGetter is used to combine firstname and lastname
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
    ]

    // call getCustomers() when rendering the component first time
    useEffect(() => getCustomers(), []);
    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    //function to fetch customers from REST API
    const getCustomers = () => {
        fetch(REST_URL)
        .then(response => response.json()) // parse the response as JSON
        .then(responseData => {
            console.log("responseData " + responseData.content),
            setCustomers(responseData.content) // save the data in state
        })
        .catch(error => console.error(error));
    }

    
    return (
        <div className="ag-theme-material"
            style={{ height: 600, width: 1500, margin: 'auto' }}>
                <h1>Customers</h1>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    floatingFilter={true}
                    suppressCellSelection={true}>
                    </AgGridReact>            
        </div>
    )
}
export default Customerlist;