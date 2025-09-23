import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function StudentProfile() {
  const { userProfile, updateProfile, currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    class: userProfile?.class || '12',
    board: userProfile?.board || 'CBSE',
    target_rank: userProfile?.target_rank || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(currentUser.uid, {
        ...formData,
        target_rank: parseInt(formData.target_rank) || null
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>My Profile</h2>
      
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        margin: '2rem 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#667eea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {userProfile?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{userProfile?.name}</h3>
            <p style={{ margin: 0, color: '#64748b' }}>{userProfile?.email}</p>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginTop: '0.5rem',
              background: userProfile?.enrolled ? '#dcfce7' : '#fef3c7',
              color: userProfile?.enrolled ? '#166534' : '#92400e'
            }}>
              {userProfile?.enrolled ? 'Enrolled' : 'Not Enrolled'}
            </div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Class
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                    <option value="dropper">Dropper</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Board
                  </label>
                  <select
                    value={formData.board}
                    onChange={(e) => setFormData({...formData, board: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Target JEE Main Rank
                </label>
                <input
                  type="number"
                  value={formData.target_rank}
                  onChange={(e) => setFormData({...formData, target_rank: e.target.value})}
                  placeholder="e.g., 1000"
                  min="1"
                  max="1000000"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'transparent',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Phone:</span>
                <span>{userProfile?.phone || 'Not provided'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Class:</span>
                <span>{userProfile?.class}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Board:</span>
                <span>{userProfile?.board}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Target Rank:</span>
                <span>{userProfile?.target_rank || 'Not set'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Member Since:</span>
                <span>
                  {userProfile?.created_at 
                    ? new Date(userProfile.created_at.toDate()).toLocaleDateString()
                    : 'Recently joined'
                  }
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;