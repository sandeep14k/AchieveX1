import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { storage, db } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import './TestAnalysis.css';

function TestAnalysis() {
  const { currentUser, userProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [testAnalyses, setTestAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Fetch user's test analyses
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'tests'),
      where('student_id', '==', currentUser.uid),
      orderBy('uploaded_at', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const analyses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestAnalyses(analyses);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      alert('Please select a PDF or image file');
      return;
    }
    
    uploadTest(file);
  };

  const uploadTest = async (file) => {
    if (!currentUser || !userProfile?.enrolled) {
      alert('Please enroll in a plan to upload tests');
      return;
    }

    setUploading(true);
    try {
      // Upload to Firebase Storage
      const fileRef = ref(storage, `tests/${currentUser.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(snapshot.ref);

      // Create test document in Firestore
      const testData = {
        student_id: currentUser.uid,
        uploaded_at: new Date(),
        file_url: fileUrl,
        file_name: file.name,
        file_type: file.type.includes('pdf') ? 'pdf' : 'image',
        status: 'pending',
        scheduled_session_id: '',
        score: null,
        remarks: ''
      };

      await addDoc(collection(db, 'tests'), testData);

      // TODO: Trigger Cloud Function to auto-schedule analysis session
      // This would create a session document and notify the mentor
      
      alert('Test uploaded successfully! Your mentor will be notified for analysis.');
    } catch (error) {
      console.error('Error uploading test:', error);
      alert('Failed to upload test. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const formatDate = (timestamp) => {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'Unknown date';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'status-pending' },
      scheduled: { label: 'Scheduled', className: 'status-scheduled' },
      reviewed: { label: 'Completed', className: 'status-completed' }
    };
    return statusConfig[status] || statusConfig.pending;
  };

  if (!userProfile?.enrolled) {
    return (
      <div className="test-analysis-container">
        <div className="enrollment-required">
          <h2>Test Analysis</h2>
          <div className="enrollment-prompt">
            <div className="enrollment-icon">🔒</div>
            <h3>Enrollment Required</h3>
            <p>Test analysis is available only for enrolled students. Get personalized feedback from IIT mentors on your performance.</p>
            <button className="enroll-btn" onClick={() => window.location.href = '/enroll'}>
              View Plans & Enroll
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-analysis-container">
      <div className="test-analysis-header">
        <h2>Test Analysis</h2>
        <p>Upload your test papers for detailed analysis by your mentor</p>
      </div>
      
      <div 
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">📋</div>
        <h3>Upload Test Paper</h3>
        <p>Drag and drop your test paper here or click to browse</p>
        <p className="file-types">Supports PDF and image files</p>
        <button 
          className={`upload-btn ${uploading ? 'uploading' : ''}`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
        />
      </div>
      
      <div className="test-analyses-section">
        <h3>Test Analysis History</h3>
        {loading ? (
          <div className="loading-state">Loading your test analyses...</div>
        ) : testAnalyses.length > 0 ? (
          <div className="test-analyses-list">
            {testAnalyses.map((test) => (
              <div key={test.id} className="test-analysis-card">
                <div className="test-info">
                  <div className="test-header">
                    <h4>{test.file_name}</h4>
                    <span className={`status-badge ${getStatusBadge(test.status).className}`}>
                      {getStatusBadge(test.status).label}
                    </span>
                  </div>
                  <div className="test-meta">
                    <span>Uploaded: {formatDate(test.uploaded_at)}</span>
                    <span>Type: {test.file_type.toUpperCase()}</span>
                    {test.score && <span>Score: {test.score}</span>}
                  </div>
                  {test.remarks && (
                    <div className="test-remarks">
                      <strong>Mentor's Feedback:</strong>
                      <p>{test.remarks}</p>
                    </div>
                  )}
                </div>
                <div className="test-actions">
                  <a 
                    href={test.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View
                  </a>
                  {test.status === 'pending' && (
                    <span className="pending-note">Analysis will be scheduled soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No test analyses yet. Upload your first test to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestAnalysis;