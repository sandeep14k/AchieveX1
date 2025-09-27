import FirestoreService from './firestoreService';

// This helper function creates and submits a hidden form to redirect to PayU
const postToPayu = (data) => {
  const form = document.createElement('form');
  form.method = 'POST';
  // Use the correct PayU endpoint (test or production)
  form.action = 'https://test.payu.in/_payment'; // For testing
  // form.action = 'https://secure.payu.in/_payment'; // For production

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = data[key];
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
};

export const initiatePayuPayment = async (paymentData) => {
  // 1. Get the Cloud Function URL
  const functionURL = 'http://127.0.0.1:5001/achievex-3f959/us-central1/generatePayuHash'; // Local Emulator
  // const functionURL = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/generatePayuHash'; // Deployed

  // 2. Prepare data for the hash generation
  const hashRequestData = {
    amount: paymentData.amount,
    productinfo: 'AchieveX Trial Session',
    firstname: paymentData.fullName,
    email: paymentData.email,
  };

  // 3. Call your backend to get the secure hash and transaction ID
  const hashResponse = await fetch(functionURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hashRequestData),
  });

  const { success, hash, txnid, error } = await hashResponse.json();
  if (!success) {
    throw new Error(error || 'Failed to generate payment hash.');
  }

  // 4. Create a PENDING booking record in Firestore before redirecting
  const bookingResult = await FirestoreService.createTrialBooking({
    ...paymentData,
    orderId: txnid, // Use txnid as the unique order identifier
    paymentStatus: 'pending',
  });

  if (!bookingResult.success) {
    throw new Error('Failed to create booking record in database.');
  }
  
  // 5. Prepare all parameters for the PayU form
  const payuData = {
    key: process.env.REACT_APP_PAYU_KEY, // Your public PayU Key from .env
    txnid: txnid,
    amount: paymentData.amount,
    productinfo: 'AchieveX Trial Session',
    firstname: paymentData.fullName,
    email: paymentData.email,
    phone: paymentData.phone,
    hash: hash,
    // IMPORTANT: Set your actual website URLs
    surl: 'http://localhost:3000/booking-details', // Success URL
    furl: 'http://localhost:3000/trial-booking?payment=failed', // Failure URL
  };

  // 6. Post the data to PayU, which will handle the redirect
  postToPayu(payuData);
};