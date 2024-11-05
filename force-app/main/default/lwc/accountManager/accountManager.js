import { LightningElement, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' }
];

export default class AccountManager extends LightningElement {
    @track accounts = [];
    @track isLoading = true;
    columns = columns;

    @wire(getListUi, {
        objectApiName: 'Account',
        listViewApiName: 'All',
        pageSize: 100
    })
    wiredAccounts({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.accounts = data.records.records.map(record => ({
                Id: record.fields.Id.value,
                Name: record.fields.Name.value,
                Phone: record.fields.Phone.value
            }));
        } else if (error) {
            console.error('Error fetching accounts: ', error);
        }
    }

    handleSuccess(event) {
        // Handle successful creation of a new Account
        // Refresh the account list by re-fetching the data
        this.refreshAccountList();
    }

    handleError(event) {
        console.error('Error occurred: ', event.detail);
    }

    refreshAccountList() {
        // Triggering refresh of wired accounts
        // Note: The wired method automatically fetches the latest data
    }
}
