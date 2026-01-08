import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    skills: ''
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { 'x-auth-token': token }
      });
      
      if (response.data.success) {
        setProfile(response.data.user);
        setFormData({
          name: response.data.user.name || '',
          bio: response.data.user.profile?.bio || '',
          location: response.data.user.profile?.location || '',
          website: response.data.user.profile?.website || '',
          skills: response.data.user.profile?.skills?.join(', ') || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const profileData = {
        name: formData.name,
        profile: {
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        }
      };

      const response = await axios.put('http://localhost:5000/api/auth/profile', profileData, {
        headers: { 'x-auth-token': token }
      });

      if (response.data.success) {
        setProfile(response.data.user);
        setEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="user-profile-container">
        <div className="login-prompt">
          <h3>Please login to view your profile</h3>
          <p>You need to be logged in to access your profile and settings.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="loading-spinner">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="avatar-info">
            <h2>{profile?.name || user?.name}</h2>
            <p className="user-email">{profile?.email || user?.email}</p>
            <p className="member-since">
              Member since: {new Date(profile?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className="edit-btn"
            onClick={() => setEditing(!editing)}
          >
            {editing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          <button 
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        {editing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="JavaScript, React, Algorithms, Data Structures"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-section">
              <h3>Profile Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{profile?.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{profile?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Bio</span>
                  <span className="info-value">{profile?.profile?.bio || 'No bio added'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{profile?.profile?.location || 'Not specified'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Website</span>
                  <span className="info-value">
                    {profile?.profile?.website ? (
                      <a href={profile.profile.website} target="_blank" rel="noopener noreferrer">
                        {profile.profile.website}
                      </a>
                    ) : 'Not specified'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Skills</span>
                  <span className="info-value">
                    {profile?.profile?.skills?.length > 0 ? (
                      <div className="skills-list">
                        {profile.profile.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    ) : 'No skills added'}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Learning Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <div className="stat-value">{profile?.stats?.algorithmsViewed || 0}</div>
                    <div className="stat-label">Algorithms Viewed</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💻</div>
                  <div className="stat-info">
                    <div className="stat-value">{profile?.stats?.algorithmsPracticed || 0}</div>
                    <div className="stat-label">Algorithms Practiced</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-info">
                    <div className="stat-value">{profile?.stats?.totalTimeSpent || 0}</div>
                    <div className="stat-label">Minutes Spent</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <div className="stat-value">{profile?.stats?.favoriteAlgorithms?.length || 0}</div>
                    <div className="stat-label">Favorites</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Preferences</h3>
              <div className="preferences">
                <div className="preference-item">
                  <span className="preference-label">Theme:</span>
                  <span className="preference-value">
                    {profile?.preferences?.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                <div className="preference-item">
                  <span className="preference-label">Last Login:</span>
                  <span className="preference-value">
                    {new Date(profile?.lastLogin).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
