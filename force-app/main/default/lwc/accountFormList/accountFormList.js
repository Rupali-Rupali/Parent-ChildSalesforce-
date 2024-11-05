import { LightningElement, track } from 'lwc';

export default class AccountFormList extends LightningElement {
    @track accountName = '';
    @track accountPhone = '';
    @track accounts = []; // Array to hold the list of accounts

    // Handle name input change
    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    // Handle phone input change
    handlePhoneChange(event) {
        this.accountPhone = event.target.value;
    }

    // Handle save button click
    handleSave() {
        if (this.accountName && this.accountPhone) {
            // Create a new account record
            const newAccount = {
                Id: this.accounts.length + 1, // Temporary ID for display purposes
                Name: this.accountName,
                Phone: this.accountPhone,
            };

            // Add the new account to the accounts array
            this.accounts = [...this.accounts, newAccount];

            // Clear input fields
            this.accountName = '';
            this.accountPhone = '';
        } else {
            // Show an error if required fields are missing
            alert('Please fill out both the Account Name and Phone fields.');
        }
    }
}
