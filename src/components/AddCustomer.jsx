import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

function AddCustomer (props) {

    //state variables
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false); //will be used for dialog's visibility

    //functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
        setOpen(false);
    }

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

//return statement that has button to open dialog
//and the dialog itself has input fields for customer data
    return (
        <>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Customer</Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle 
            id="alert-dialog-title">{"Add Customer"}</DialogTitle>
            <DialogContent>
                <TextField 
                label="Firstname" 
                name="firstname" 
                value={customer.firstname} 
                onChange={handleInputChanged} />
                <br />
                <TextField
                label="Lastname"
                name="lastname"
                value={customer.lastname}
                onChange={handleInputChanged} />
                <br />
                <TextField
                label="Streetaddress"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={handleInputChanged} />
                <br />
                <TextField
                label="Postcode"
                name="postcode"
                value={customer.postcode}
                onChange={handleInputChanged} />
                <br />
                <TextField
                label="City"
                name="city"
                value={customer.city}
                onChange={handleInputChanged} />
                <br />
                <TextField
                label="Email"
                name="email"
                value={customer.email}
                onChange={handleInputChanged} />
                <br />
                <TextField
                label="Phone"
                name="phone"
                value={customer.phone}
                onChange={handleInputChanged} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCustomer;