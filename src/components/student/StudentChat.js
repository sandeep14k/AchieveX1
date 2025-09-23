import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDoc,
  where,
  limit
} from 'firebase/firestore';
import './StudentChat.css';

function StudentChat() {
  const { currentUser, userProfile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const chatId = userProfile?.mentor_id ? `${currentUser?.uid}_${userProfile.mentor_id}` : null;

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch mentor details
  useEffect(() => {
    if (!userProfile?.mentor_id) {
      setLoading(false);
      return;
    }

    const fetchMentor = async () => {
      try {
        const mentorDoc = await getDoc(doc(db, 'users', userProfile.mentor_id));
        if (mentorDoc.exists()) {
          setMentor({ id: mentorDoc.id, ...mentorDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching mentor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [userProfile?.mentor_id]);

  // Listen for messages
  useEffect(() => {
    if (!chatId || !currentUser) return;

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const messagesQuery = query(messagesRef, orderBy('created_at', 'asc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !chatId) return;

    setSending(true);
    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: newMessage.trim(),
        sender_id: currentUser.uid,
        sender_name: userProfile.name,
        sender_role: 'student',
        created_at: serverTimestamp(),
        read_by: [currentUser.uid]
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp?.toDate) return '';
    
    const date = timestamp.toDate();
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleScheduleSession = () => {
    // Navigate to session scheduling
    window.location.href = '/dashboard?tab=calendar';
  };

  // Show enrollment prompt if not enrolled
  if (!userProfile?.enrolled) {
    return (
      <div className="chat-container">
        <div className="enrollment-required">
          <h2>Chat with Mentor</h2>
          <div className="enrollment-prompt">
            <div className="enrollment-icon">💬</div>
            <h3>Enrollment Required</h3>
            <p>Chat with your personal IIT mentor is available for enrolled students. Get instant help and guidance on your JEE preparation.</p>
            <button className="enroll-btn" onClick={() => window.location.href = '/enroll'}>
              View Plans & Enroll
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show mentor assignment in progress
  if (loading) {
    return (
      <div className="chat-container">
        <div className="loading-state">Loading chat...</div>
      </div>
    );
  }

  if (!userProfile?.mentor_id || !mentor) {
    return (
      <div className="chat-container">
        <div className="mentor-assignment">
          <h2>Chat with Mentor</h2>
          <div className="assignment-prompt">
            <div className="assignment-icon">👨‍🏫</div>
            <h3>Mentor Assignment in Progress</h3>
            <p>We're assigning you the best IIT mentor based on your profile and preferences. You'll be able to chat once your mentor is assigned (usually within 24 hours).</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with Mentor</h2>
        <button className="schedule-btn" onClick={handleScheduleSession}>
          📅 Schedule Session
        </button>
      </div>
      
      <div className="chat-box">
        <div className="mentor-info">
          <div className="mentor-avatar">
            {mentor.profilePhotoUrl ? (
              <img src={mentor.profilePhotoUrl} alt={mentor.name} />
            ) : (
              <div className="avatar-placeholder">
                {mentor.name?.charAt(0) || 'M'}
              </div>
            )}
          </div>
          <div className="mentor-details">
            <h3>{mentor.name}</h3>
            <p>IIT Kanpur • Online • Usually responds within 2 hours</p>
          </div>
        </div>
        
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">👋</div>
              <h3>Welcome to your mentorship chat!</h3>
              <p>Start by introducing yourself or asking any questions about JEE preparation.</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`message ${message.sender_id === currentUser.uid ? 'own-message' : 'other-message'}`}
                >
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {formatMessageTime(message.created_at)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <form className="message-input" onSubmit={handleSendMessage}>
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={sending}
          />
          <button 
            type="submit" 
            disabled={sending || !newMessage.trim()}
            className={sending ? 'sending' : ''}
          >
            {sending ? '⏳' : '➤'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentChat;