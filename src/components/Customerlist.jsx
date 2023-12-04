import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { Snackbar, IconButton } from "@mui/material";
import { Delete, FileDownload } from "@mui/icons-material";
import { CSVLink } from 'react-csv';
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'


function Customerlist() {

    //state variables
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false); //will be used for snackbar's visibility
    const [msg, setMsg] = useState(''); //will be used to show snackbar's message

    //columns for customer table (ag-grid)
    const columns = [
        {
            headerName: 'Customer', valueGetter: params =>
                `${params.data.firstname} ${params.data.lastname}`, sortable: true, filter: true
        }, //valueGetter is used to combine firstname and lastname
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data} />, width: 50
        },
        { cellRenderer: params => <Delete color="error" onClick={() => deleteCustomer(params)} />, width: 50 }
    ]

    //data for csv export
    const csvData = [
        ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'], //headers
        ...customers.map(customer =>
            [customer.firstname, customer.lastname, customer.streetaddress, customer.postcode, customer.city, customer.email, customer.phone]) //data  
    ]

    // call getCustomers() when rendering the component first time
    useEffect(() => getCustomers(), []);
    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    //function to fetch customers from REST API
    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData " + responseData.content),
                    setCustomers(responseData.content)
            })
            .catch(error => console.error(error));
    }

    //function to add customer
    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setOpen(true);
                    setMsg('Customer added successfully!');
                } else
                    alert('Something went wrong!')

            })
            .catch(error => console.error(error))
    }

    //function to update customer
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setOpen(true);
                    setMsg('Customer updated successfully!');
                } else
                    alert('Something went wrong!')
            })
            .catch(error => console.error(error))
    }

    //function to delete customer
    const deleteCustomer = (params) => {
        if (window.confirm(`Are you sure you want to delete customer ${params.data.firstname} ${params.data.lastname}?`)) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(_ => {
                    getCustomers();
                    setOpen(true);
                    setMsg('Customer deleted successfully!');
                })
                .catch(error => console.error(error))
        }

    }


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '80vh', margin: 0, padding: 0 }}>
                <div className="ag-theme-material"
                    style={{ height: 600, width: 1500 }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                        <AddCustomer addCustomer={addCustomer} />
                        <IconButton style={{ display: "flex", justifyContent: "flex-end" }}>
                            <CSVLink data={csvData} filename='customerdata.csv'>
                                <FileDownload />
                            </CSVLink>
                        </IconButton>
                    </div>
                    <AgGridReact
                        rowData={customers}
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
            </div >
        </>
    )
}
export default Customerlist;