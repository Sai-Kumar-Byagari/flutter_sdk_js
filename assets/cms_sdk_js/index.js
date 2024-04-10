import cmsClient from './cmsClient';
import { balanceDetails, cardDetails, transactionDetails, cvvDetails, limitDetails, setNewPinResponse, dueDetails, updateStatementResponse, billingDates, cardList } from '../mockData';

const cmsClientInstance = new cmsClient();
cmsClientInstance.initialize();

export async function cmsUserAuthenticate(mpin) {
    const response = await cmsClientInstance.authenticate({
        "mobileNumber": "+919700000001",
        "pin": mpin
    });
    if (response.status === true) {
        //return true
        return response
    }
    return false;
}

export async function fetchCardBalance() {
    let resultData = await cmsClientInstance.getBalance();
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data[0];
    } else {
        resultData = balanceDetails?.data[0];
    }
    return resultData;
}

export async function fetchTransactions(body) {
    let resultData = await cmsClientInstance.getTransactions(body);
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data;
    } else {
        resultData = transactionDetails?.data;
    }
    return resultData;
}

export async function fetchCardList() {
    let resultData = await cmsClientInstance.getCardList();
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data;
    } else {
        resultData = cardList?.data;
    }
    return resultData;
}

export async function fetchCardDetails() {
    let resultData = await cmsClientInstance.getCardDetails();
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data;
    } else {
        resultData = cardDetails?.data;
    }
    return resultData;
}

export async function fetchLimitDetails(body) {
    let resultData = await cmsClientInstance.getCardLimit(body);
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data
    } else {
        resultData = limitDetails?.data
    }
    return resultData;
}

export async function fetchCvvDetails(body) {
    let resultData = await cmsClientInstance.getCvv(body);
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data
    } else {
        resultData = cvvDetails?.data
    }
    return resultData;
}

export async function fetchDueDetails() {
    let resultData = await cmsClientInstance.getDue();
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data;
    } else {
        resultData = dueDetails?.data;
    }
    return resultData;
}

export async function fetchUpdateStatement(body) {
    let resultData = await cmsClientInstance.updateStatement(body);
    if (resultData?.status === 'success' && resultData?.data) {
        resultData = resultData?.data;
    }
    else {
        resultData = updateStatementResponse?.data;
    }
    return resultData;
}

export async function updateNewPin(body) {
    let resultData = await cmsClientInstance.setCardPin(body);
    if (resultData?.status === 'success') {
        resultData = resultData?.data;
    }
    else {
        resultData = setNewPinResponse?.data;
    }
    return resultData;
}

export async function fetchBillingDates() {
    let resultData = await cmsClientInstance.getBillingDates();
    if (resultData.status === 'success' && resultData?.data) {
        resultData = resultData?.data;
    } else {
        resultData = billingDates?.data;
    }
    return resultData;
}

export async function cardLock(body) {
    let resultData = await cmsClientInstance.lockCard(body);
    if (resultData?.status === 'success') {
        resultData = resultData?.data;
    }
    return resultData;
}

export async function cardUnlock(body) {
    let resultData = await cmsClientInstance.unlockCard(body);
    if (resultData?.status === 'success') {
        resultData = resultData?.data;
    }
    return resultData;
}
