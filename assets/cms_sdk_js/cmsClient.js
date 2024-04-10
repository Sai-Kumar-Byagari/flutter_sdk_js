import axios from 'axios';
import { BaseURL, Endpoints } from './api';

export default class CmsClient {
    constructor() {
        this.axiosInstance = null;
    }

    //Initialize the class by creating a config and axios instance with error handling which would be common for all the API calls
    initialize() {
        const config = {
            baseURL: BaseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        this.axiosInstance = axios.create(config);

        const token = localStorage.getItem('authToken');
        if (token) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    if (error.response.status === 401) {
                        console.error('Unauthorized Request. Redirecting to login...');
                    } else if (error.response.status === 404) {
                        console.error('Resource Not Found');
                    } else if (error.response.status >= 400 && error.response.status < 500) {
                        console.error('Client Error:', error.response.status);
                    } else if (error.response.status >= 500 && error.response.status < 600) {
                        console.error('Server Error:', error.response.status);
                    } else {
                        console.error('Response error:', error.message);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Request error:', error.message);
                }
                return Promise.reject(error);
            });
    }

    //Used to authenticate user with the input details(Eg: Using PhoneNo) so as to fetch back a token for all other calls
    async authenticate(data) {
        try {
            const authenticationResponse = await this.axiosInstance.post(Endpoints.Authentication, data);
            const token = authenticationResponse.data.data?.token;
            if (token) {
                this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                localStorage.setItem('authToken', token);
                console.log(`Authentication successful with token generation !!`)
                return authenticationResponse.data.data;
            }
            return false;
        } catch (error) {
            console.error('Authentication of User failed due to the reason:', error.message);
            throw error;
        }
    }

    //GET call functionality common for all API calls
    async doGetCall(endpoint) {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error making GET request:', error.message);
            throw error;
        }
    }

    //POST call functionality common for all API calls
    async doPostCall(endpoint, body) {
        try {
            const response = await this.axiosInstance.post(endpoint, body);
            return response.data;
        } catch (error) {
            console.error('Error making POST request:', error.message);
            throw error;
        }
    }

    //This endpoint is responsible for fetching balance following a secure authentication flow with token validation added.
    async getBalance() {
        console.log(`Fetching the Balance -`);
        return await this.doGetCall(Endpoints.GetBalance)
    }

    //This endpoint is responsible for fetching all card details (with respective status) data following a secure authentication flow with token validation added.
    async getCardList() {
        console.log(`Fetching the Card List Data -`);
        return await this.doGetCall(Endpoints.GetCardList);
    }

    //This endpoint is responsible for fetching active card details data following a secure authentication flow with token validation added.
    async getCardDetails() {
        console.log(`Fetching the Transaction Data -`);
        return await this.doGetCall(Endpoints.GetCardDetails);
    }

    //This endpoint is responsible for fetching Card Preference data following a secure authentication flow with token validation added.
    async getPreference() {
        console.log(`Fetching the Card Preference Data -`);
        return await this.doGetCall(Endpoints.GetPreference);
    }

    //This endpoint is responsible for setting a Limit on Card usage following a secure authentication flow with token validation added.
    async setCardLimit(body) {
        console.log(`Trying to override the limit set on the card with the details: ${body.amount}`);
        return await this.doPostCall(Endpoints.SetLimit, body);
    }

    //This endpoint is responsible for fetching the Limit on Card usage following a secure authentication flow with token validation added.
    async getCardLimit() {
        console.log(`Fetching the limit set on the card -`);
        return await this.doGetCall(Endpoints.GetLimit);
    }

    //This endpoint is responsible to fetch the CVV of the registered card and is applicable mainly for virtual cards with a secure authentication flow with token validation added.
    async getCvv(body) {
        console.log(`Fetching the Cvv set on the card -`);
        return await this.doPostCall(Endpoints.GetCvv, body);
    }

    //This endpoint is responsible to fetch Statement Summary for a customer/card for a month in Json format.
    async getStatement(body) {
        console.log(`Update the card billing date cycle - ${JSON.stringify(body)}`);
        return await this.doPostCall(Endpoints.UpdateStatement);
    }

    async getTransactions(body) {
        console.log(`Fetching the Transactions of the Card -`);
        return await this.doPostCall(Endpoints.GetTransactions, body);
    }

    //This endpoint is responsible for requesting physical card approval for the user to make use of the card with a secure authentication added.
    async requestPhysicalCard(body) {
        console.log(`Requesting physical card approval for the user with the details - ${JSON.stringify(body)}`);
        return await this.doPostCall(Endpoints.RequestPhysicalCard, body);
    }

    //This endpoint is responsible for fetching due amount details
    async getDue() {
        console.log(`Fetching the Due -`);
        return await this.doGetCall(Endpoints.GetDue);
    }

    //This endpoint responsible for updating the statement date while changing the billing cycle of the user card when there's no due amount to be paid
    async updateStatement(body) {
        console.log(`Update the card billing date cycle - ${JSON.stringify(body)}`);
        return await this.doPostCall(Endpoints.UpdateStatement);
    }

    //This endpoint is responsible for setting a new pin on Card
    async setCardPin(body) {
        console.log(`Setting the new POS/ATM Pin for User - ${JSON.stringify(body)}`);
        return await this.doPostCall(Endpoints.SetPin, body);
    }

    //This endpoint is responsible for fetching billing dates
    async getBillingDates() {
        console.log(`Fetching the Billing Date -`);
        return await this.doGetCall(Endpoints.GetBillingDates);
    }

    //This endpoint is responsible for locking the Card
    async lockCard(body) {
        console.log(`Locking the card - ${JSON.stringify(body)}`);
        return await this.doPostCall(Endpoints.LockCard, body);
    }

    //This endpoint is responsible for unlocking the Card
    async unlockCard(body) {
        console.log(`Unlocking the card - ${JSON.stringify(body)}`);
        return await this.doPostCall(Endpoints.UnlockCard, body);
    }
}