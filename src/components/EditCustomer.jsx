import { useState } from 'react';
import { ModeEdit } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditCustomer(props) {

    //state variables
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false); //will be used for dialog's visibility

    //functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
        setOpen(false);
        }
}

    //get customer data
    const handleOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
        setOpen(true);
    }

    //update customer
    const handleSave = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        setOpen(false);
    }

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    
    return (

        <>
        <ModeEdit color="primary" onClick={handleOpen} />
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle >Edit Customer</DialogTitle>
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
                <br />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} autoFocus>Save</Button>
            </DialogActions>
            </Dialog>
        </>
    )}

export default EditCustomer;