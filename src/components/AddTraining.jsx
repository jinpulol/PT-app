import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AddTraining (props) {

    //state variables
    const [training, setTraining] = useState({ date: '', duration: '', activity: '', customer: '' });
    const [open, setOpen] = useState(false); //will be used for dialog's visibility
    const [customers, setCustomers] = useState([]); //will be used to show customers in select field


    useEffect(() => getCustomers(), []);
    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json()) // parse the response as JSON
            .then(responseData => {
                console.log("responseData " + responseData.content),
                    setCustomers(responseData.content) // save the data in state
            })
            .catch(error => console.error(error));
    }
    //functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
        setOpen(false);
    }

    const handleInputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
        setTraining({ date: '', duration: '', activity: '', customer: '' });
    }

    const changeDate = (props) => {
        setTraining({ ...training, date: props });
    }

    //return statement that has button to open dialog
    //and the dialog itself has input fields for training data
    return (
        <>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Training</Button>
        <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="alert-dialog-title" 
        aria-describedby="alert-dialog-description">
            <DialogTitle 
            id="alert-dialog-title">{"Add Training"}</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker 
                label="Date"
                value={training.date ? new Date(training.date) : null}
                onChange={changeDate}
                />
                </LocalizationProvider>
                <br />
                <TextField
                fullWidth
                label="Duration"
                name="duration"
                value={training.duration}
                onChange={handleInputChanged} />
                <br />
                <TextField
                fullWidth
                label="Activity"
                name="activity"
                value={training.activity}
                onChange={handleInputChanged} />
                <br />
                <TextField
                fullWidth
                select
                label="Customer"
                name="customer"
                value={training.customer}
                onChange={handleInputChanged}>
                    {customers.map((customer) => (
                        <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                            {customer.firstname} {customer.lastname}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </>
    )
}
export default AddTraining;