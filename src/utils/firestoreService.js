// Firestore Service for Trial Bookings
// This file handles all Firestore operations for trial session bookings

import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

class FirestoreService {
  constructor() {
    this.bookingsCollection = 'trial_bookings';
  }

  // Create a new trial booking record
  async createTrialBooking(bookingData) {
    try {
      const booking = {
        // Student Information
        studentName: bookingData.fullName,
        studentEmail: bookingData.email,
        studentPhone: bookingData.phone,
        grade: bookingData.grade,
        goals: bookingData.goals || '',
        
        // Session Information
        sessionDate: bookingData.selectedDate,
        timeSlot: bookingData.timeSlot || null,
        sessionStatus: 'pending', // pending, confirmed, completed, cancelled
        
        // Payment Information
        orderId: bookingData.orderId,
        paymentId: bookingData.paymentId || null,
        transactionId: bookingData.transactionId || null,
        amount: bookingData.amount,
        paymentStatus: bookingData.paymentStatus, // pending, success, failed, refunded
        paymentMethod: bookingData.paymentMethod || null,
        
        // Metadata
        bookingSource: 'web_trial_booking',
        userAgent: navigator.userAgent,
        ipAddress: null, // Can be added later from backend
        
        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        
        // Additional fields for session management
        mentorAssigned: null,
        googleMeetLink: null,
        sessionNotes: null,
        followUpRequired: true,
        remindersSent: [],
        
        // Tags for analytics and filtering
        tags: {
          isTrialBooking: true,
          grade: bookingData.grade,
          source: 'trial_booking_page'
        }
      };

      const docRef = await addDoc(collection(db, this.bookingsCollection), booking);
      
      console.log('Trial booking created with ID:', docRef.id);
      
      return {
        success: true,
        bookingId: docRef.id,
        booking: { ...booking, id: docRef.id }
      };
      
    } catch (error) {
      console.error('Error creating trial booking:', error);
      throw new Error(`Failed to create trial booking: ${error.message}`);
    }
  }

  // Update booking after successful payment
  async updateBookingAfterPayment(bookingId, paymentData) {
    try {
      const bookingRef = doc(db, this.bookingsCollection, bookingId);
      
      const updateData = {
        paymentId: paymentData.paymentId,
        transactionId: paymentData.transactionId,
        paymentStatus: 'success',
        paymentMethod: paymentData.paymentMethod,
        sessionStatus: 'confirmed',
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookingRef, updateData);
      
      console.log('Booking updated after successful payment:', bookingId);
      
      return {
        success: true,
        bookingId,
        updatedFields: updateData
      };
      
    } catch (error) {
      console.error('Error updating booking after payment:', error);
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  }

  // Update booking after failed payment
  async updateBookingAfterPaymentFailure(bookingId, failureReason) {
    try {
      const bookingRef = doc(db, this.bookingsCollection, bookingId);
      
      const updateData = {
        paymentStatus: 'failed',
        sessionStatus: 'payment_failed',
        paymentFailureReason: failureReason,
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookingRef, updateData);
      
      console.log('Booking updated after payment failure:', bookingId);
      
      return {
        success: true,
        bookingId,
        updatedFields: updateData
      };
      
    } catch (error) {
      console.error('Error updating booking after payment failure:', error);
      throw new Error(`Failed to update booking failure: ${error.message}`);
    }
  }

  // --- NEW FUNCTION TO ADD ---
  // This function is specifically for the PaymentSuccess page
  async updateBookingOnSuccess(orderId, paymentDetails) {
    try {
      // We use getBookingByOrderId to find the document's actual ID
      const bookingDoc = await this.getBookingByOrderId(orderId);
      if (!bookingDoc.success) {
        throw new Error("Booking not found for the given order ID.");
      }

      const bookingRef = doc(db, this.bookingsCollection, bookingDoc.booking.id);
      
      const updateData = {
        paymentId: paymentDetails.paymentId,
        paymentStatus: 'success',
        sessionStatus: 'confirmed',
        paymentMethod: paymentDetails.paymentMethod || 'PayU',
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookingRef, updateData);
      
      console.log('Booking updated to success:', bookingDoc.booking.id);
      
      // Return the full booking data for the success page to display
      return await this.getBookingById(bookingDoc.booking.id);

    } catch (error) {
      console.error('Error updating booking on success:', error);
      throw new Error(`Failed to update booking on success: ${error.message}`);
    }
  }
  // --- END OF NEW FUNCTION ---

  // Get booking by order ID
  async getBookingByOrderId(orderId) {
    try {
      const q = query(
        collection(db, this.bookingsCollection), 
        where('orderId', '==', orderId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Return a clear failure state instead of throwing an error
        return { success: false, booking: null };
      }
      
      const doc = querySnapshot.docs[0];
      return {
        success: true,
        booking: {
          id: doc.id,
          ...doc.data()
        }
      };
      
    } catch (error) {
      console.error('Error getting booking by order ID:', error);
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  }

  // Get booking by ID
  async getBookingById(bookingId) {
    try {
      const bookingRef = doc(db, this.bookingsCollection, bookingId);
      const docSnap = await getDoc(bookingRef);
      
      if (!docSnap.exists()) {
        throw new Error('Booking not found');
      }
      
      return {
        success: true,
        booking: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
      
    } catch (error) {
      console.error('Error getting booking by ID:', error);
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  }

  // Get bookings by student email
  async getBookingsByEmail(email) {
    try {
      const q = query(
        collection(db, this.bookingsCollection),
        where('studentEmail', '==', email),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const bookings = [];
      
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return {
        success: true,
        bookings
      };
      
    } catch (error) {
      console.error('Error getting bookings by email:', error);
      throw new Error(`Failed to get bookings: ${error.message}`);
    }
  }

  // Assign mentor to booking
  async assignMentorToBooking(bookingId, mentorInfo) {
    try {
      const bookingRef = doc(db, this.bookingsCollection, bookingId);
      
      const updateData = {
        mentorAssigned: mentorInfo,
        sessionStatus: 'mentor_assigned',
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookingRef, updateData);
      
      return {
        success: true,
        bookingId,
        mentor: mentorInfo
      };
      
    } catch (error) {
      console.error('Error assigning mentor:', error);
      throw new Error(`Failed to assign mentor: ${error.message}`);
    }
  }

  // Add Google Meet link to booking
  async addMeetLinkToBooking(bookingId, meetLink) {
    try {
      const bookingRef = doc(db, this.bookingsCollection, bookingId);
      
      const updateData = {
        googleMeetLink: meetLink,
        sessionStatus: 'meeting_scheduled',
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookingRef, updateData);
      
      return {
        success: true,
        bookingId,
        meetLink
      };
      
    } catch (error) {
      console.error('Error adding meet link:', error);
      throw new Error(`Failed to add meet link: ${error.message}`);
    }
  }

  // Record reminder sent
  async recordReminderSent(bookingId, reminderType) {
    try {
      const booking = await this.getBookingById(bookingId);
      const existingReminders = booking.booking.remindersSent || [];
      
      const bookingRef = doc(db, this.bookingsCollection, bookingId);
      
      const updateData = {
        remindersSent: [
          ...existingReminders,
          {
            type: reminderType,
            sentAt: serverTimestamp()
          }
        ],
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookingRef, updateData);
      
      return {
        success: true,
        bookingId,
        reminderType
      };
      
    } catch (error) {
      console.error('Error recording reminder:', error);
      throw new Error(`Failed to record reminder: ${error.message}`);
    }
  }

  // Get analytics data
  async getBookingAnalytics(dateRange = null) {
    try {
      let q = collection(db, this.bookingsCollection);
      
      if (dateRange) {
        q = query(
          q,
          where('createdAt', '>=', dateRange.start),
          where('createdAt', '<=', dateRange.end),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      const bookings = [];
      
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Calculate analytics
      const analytics = {
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter(b => b.sessionStatus === 'confirmed').length,
        pendingBookings: bookings.filter(b => b.sessionStatus === 'pending').length,
        completedBookings: bookings.filter(b => b.sessionStatus === 'completed').length,
        failedPayments: bookings.filter(b => b.paymentStatus === 'failed').length,
        totalRevenue: bookings
          .filter(b => b.paymentStatus === 'success')
          .reduce((sum, b) => sum + (b.amount || 0), 0),
        gradeDistribution: bookings.reduce((acc, b) => {
          acc[b.grade] = (acc[b.grade] || 0) + 1;
          return acc;
        }, {}),
        paymentMethods: bookings.reduce((acc, b) => {
          if (b.paymentMethod) {
            acc[b.paymentMethod] = (acc[b.paymentMethod] || 0) + 1;
          }
          return acc;
        }, {})
      };
      
      return {
        success: true,
        analytics,
        bookings
      };
      
    } catch (error) {
      console.error('Error getting booking analytics:', error);
      throw new Error(`Failed to get analytics: ${error.message}`);
    }
  }
}

// Export singleton instance
const firestoreService = new FirestoreService();
export default firestoreService;