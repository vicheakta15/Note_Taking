import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Load the user's notes from localStorage when the component mounts
  useEffect(() => {
    if (loggedInUser) {
      const userNotes = JSON.parse(localStorage.getItem(`notes_${loggedInUser.email}`)) || [];
      setNotes(userNotes);
      // Do not automatically select a note on first load
    }
  }, [loggedInUser]);

  // Save the notes to localStorage whenever they change
  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    if (loggedInUser) {
      localStorage.setItem(`notes_${loggedInUser.email}`, JSON.stringify(updatedNotes));
    }
  };

  // Handle changes to the current note
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setCurrentNote(newNote);
    if (currentNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = newNote;
      saveNotes(updatedNotes);
    }
  };

  // Add a new note
  const addNewNote = () => {
    const newNote = 'New note...';
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    setCurrentNote(newNote);
    setCurrentNoteIndex(updatedNotes.length - 1);
  };

  // Select a note to edit
  const selectNote = (index) => {
    setCurrentNote(notes[index]);
    setCurrentNoteIndex(index);
  };

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loggedInUser) {
      window.location.href = '/login';
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return null; // Render nothing while redirecting
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar notes={notes} selectNote={selectNote} addNewNote={addNewNote} />
        <div className="main-content">
          <h2>{currentNoteIndex !== null ? `Note ${currentNoteIndex + 1}` : 'Select a Note'}</h2>
          {currentNoteIndex !== null ? (
            <textarea
              placeholder="Start typing your note..."
              value={currentNote}
              onChange={handleNoteChange}
              style={{ width: '100%', height: '80vh' }}
            />
          ) : (
            <p>Please select a note or add a new one.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;