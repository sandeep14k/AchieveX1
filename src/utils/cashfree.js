// Cashfree Payment Integration Utility
// This file handles all Cashfree payment related operations

import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FirestoreService from './firestoreService';

class CashfreePayments {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.baseURL = this.isProduction 
      ? 'https://api.cashfree.com' 
      : 'https://sandbox.cashfree.com';
    
    // These should be stored in environment variables
    this.clientId = process.env.REACT_APP_CASHFREE_CLIENT_ID;
    // The clientSecret is now only used in your secure backend (Firebase Function).
  }

  // Generate unique order ID
  generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORDER_${timestamp}_${random}`;
  }

  // Create payment order (This should be done from backend)
  async createPaymentOrder(orderData) {
    console.log('Requesting payment order from Firebase Cloud Function...');
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("User not authenticated. Cannot create payment order.");
      }
      
      const orderPayload = {
        amount: orderData.amount,
        customerDetails: {
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone,
        },
        orderNote: orderData.note,
        userId: currentUser.uid,
      };

      // Use the function's URL directly with fetch
      const isDevelopment = process.env.NODE_ENV === 'development';
      const functionURL = isDevelopment
        ? 'http://localhost:5001/achievex-3f959/us-central1/createCashfreeOrder' // Local emulator URL
        : 'https://us-central1-achievex-3f959.cloudfunctions.net/createCashfreeOrder'; // Deployed URL
      console.log(`Connecting to function at: ${functionURL}`);

      const response = await fetch(functionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: orderPayload }),
      });

      const result = await response.json();
      const responseData = result.data;

      if (!responseData.success) {
        console.error('Cloud Function Error Response:', responseData);
        throw new Error(responseData.message || 'Failed to create payment order via cloud function.');
      }

      console.log('Cloud Function Success Response:', responseData);

      if (!responseData.payment_session_id) {
        console.error('payment_session_id is missing from Cashfree response');
        throw new Error('Failed to get payment session ID');
      }

      return {
        success: true,
        orderId: responseData.order_id,
        paymentSessionId: responseData.payment_session_id,
        order: responseData,
      };
    } catch (error) {
      console.error('Error calling createCashfreeOrder cloud function:', error);
      throw new Error(`Failed to create payment order. Please ensure the Firebase emulator is running. Error: ${error.message}`);
    }
  }

  // Initialize Cashfree payment
  async initializePayment(paymentData) {
    try {
      console.log('Step 1: Initializing payment with data:', paymentData);
      // Create order first
      const orderResponse = await this.createPaymentOrder(paymentData);
      
      if (!orderResponse.success) {
        throw new Error('Failed to create payment order');
      }
      
      console.log('Step 2: Cashfree order created successfully:', orderResponse);
      // Create initial booking record in Firestore with 'pending' status
      const bookingData = {
        fullName: paymentData.customerName,
        email: paymentData.customerEmail,
        phone: paymentData.customerPhone,
        grade: paymentData.sessionData?.grade,
        selectedDate: paymentData.sessionData?.date,
        timeSlot: paymentData.sessionData?.timeSlot,
        goals: paymentData.sessionData?.goals,
        orderId: orderResponse.orderId,
        amount: paymentData.amount,
        paymentStatus: 'pending'
      };
      
      const firestoreResult = await FirestoreService.createTrialBooking(bookingData);
      
      if (!firestoreResult.success) {
        throw new Error('Failed to create booking record');
      }
      
      console.log('Step 3: Firestore booking record created with ID:', firestoreResult.bookingId);
      // Store booking ID for later use
      this.currentBookingId = firestoreResult.bookingId;
      
      // In a real implementation, you would load the Cashfree SDK
      // and initialize the payment like this:
      
      // Load Cashfree SDK
      if (!window.Cashfree) {
        console.log('Step 4: Loading Cashfree SDK...');
        await this.loadCashfreeSDK();
      }
      
      const cashfree = new window.Cashfree({
        mode: this.isProduction ? "production" : "sandbox",
      });
      
      const checkoutOptions = {
        paymentSessionId: orderResponse.paymentSessionId,
        redirectTarget: "_modal", // or "_self" for redirect
      };
      
      console.log('Step 5: Launching Cashfree checkout with options:', checkoutOptions);
      const paymentResult = await cashfree.checkout(checkoutOptions);
      
      console.log('Step 6: Cashfree checkout completed. Result:', paymentResult);
      if (paymentResult.error) {
        await FirestoreService.updateBookingAfterPaymentFailure( 
          this.currentBookingId,
          paymentResult.error.message || 'Payment failed or was cancelled by user.'
        );
        return {
          success: false,
          ...paymentResult,
          bookingId: this.currentBookingId
        };
      }
      
      if (paymentResult.payment && paymentResult.payment.status === 'SUCCESS') {
        const successData = paymentResult.payment;
        console.log('Step 7: Payment successful. Updating Firestore...');
        await FirestoreService.updateBookingAfterPayment(this.currentBookingId, successData);
      } else {
        // Handle other statuses if needed, for now we treat as failure
        await FirestoreService.updateBookingAfterPaymentFailure(
          this.currentBookingId, 
          paymentResult.error
        );
      }
      
      return {
        success: true,
        ...paymentResult.payment,
        bookingId: this.currentBookingId
      };
      
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert(`An error occurred during payment initialization: ${error.message}`);
      
      // If we have a booking ID, update it with the error
      if (this.currentBookingId) {
        try {
          await FirestoreService.updateBookingAfterPaymentFailure(
            this.currentBookingId, 
            error.message
          );
        } catch (updateError) {
          console.error('Error updating booking with failure:', updateError);
        }
      }
      
      throw error;
    }
  }

  // Load Cashfree SDK dynamically
  loadCashfreeSDK() {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = this.isProduction 
        ? 'https://sdk.cashfree.com/js/v3/cashfree.js'
        : 'https://sdk.cashfree.com/js/v3/cashfree.sandbox.js';
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
      
      document.head.appendChild(script);
    });
  }

  // Simulate payment process (for demo purposes)
  async simulatePayment(orderResponse) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
          resolve({
            success: true,
            orderId: orderResponse.orderId,
            paymentId: `PAY_${Date.now()}`,
            transactionId: `TXN_${Date.now()}`,
            amount: orderResponse.order.orderAmount,
            status: 'SUCCESS',
            paymentMethod: 'UPI',
            timestamp: new Date().toISOString()
          });
        } else {
          resolve({
            success: false,
            orderId: orderResponse.orderId,
            status: 'FAILED',
            error: 'Payment failed due to insufficient funds',
            timestamp: new Date().toISOString()
          });
        }
      }, 2000); // Simulate 2 second processing time
    });
  }

  // Verify payment status (should be done from backend)
  async verifyPayment(orderId) {
    try {
      // In production, make this API call from your backend
      console.log('Verifying payment for order:', orderId);
      
      // Simulate verification
      return {
        success: true,
        orderId: orderId,
        status: 'SUCCESS',
        amount: 19,
        verifiedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Failed to verify payment');
    }
  }

  // Handle payment success
  async handlePaymentSuccess(paymentResult) {
    console.log('Payment successful:', paymentResult);
    
    try {
      // Get the booking from Firestore using order ID
      const bookingResult = await FirestoreService.getBookingByOrderId(paymentResult.orderId);
      
      if (bookingResult.success) {
        const booking = bookingResult.booking;
        
        // Store booking details in localStorage as well for quick access
        const bookingData = {
          bookingId: booking.id,
          orderId: paymentResult.orderId,
          paymentId: paymentResult.paymentId,
          amount: paymentResult.amount,
          status: 'confirmed',
          bookedAt: paymentResult.timestamp,
          sessionDetails: paymentResult.sessionDetails,
          studentName: booking.studentName,
          studentEmail: booking.studentEmail,
          sessionDate: booking.sessionDate
        };

        localStorage.setItem('lastBooking', JSON.stringify(bookingData));
        
        return bookingData;
      } else {
        throw new Error('Booking not found in database');
      }
    } catch (error) {
      console.error('Error in handlePaymentSuccess:', error);
      
      // Fallback to basic data if Firestore query fails
      const bookingData = {
        orderId: paymentResult.orderId,
        paymentId: paymentResult.paymentId,
        amount: paymentResult.amount,
        status: 'confirmed',
        bookedAt: paymentResult.timestamp,
        sessionDetails: paymentResult.sessionDetails
      };

      localStorage.setItem('lastBooking', JSON.stringify(bookingData));
      
      return bookingData;
    }
  }

  // Handle payment failure
  handlePaymentFailure(paymentResult) {
    console.error('Payment failed:', paymentResult);
    
    const failureData = {
      orderId: paymentResult.orderId,
      error: paymentResult.error,
      status: 'failed',
      failedAt: paymentResult.timestamp
    };

    return failureData;
  }

  // Get supported payment methods
  getSupportedPaymentMethods() {
    return [
      { id: 'upi', name: 'UPI', icon: '📱' },
      { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
      { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
      { id: 'wallet', name: 'Wallets', icon: '👝' }
    ];
  }
}

// Export singleton instance
const cashfreePayments = new CashfreePayments();
export default cashfreePayments;