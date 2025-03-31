import React from 'react';

function Sidebar({ notes, selectNote, addNewNote }) {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px', height: '100vh' }}>
      <h3>All Notes</h3>
      <input
        type="text"
        placeholder="Search all notes"
        style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
      />
      <button
        onClick={addNewNote}
        style={{
          width: '100%',
          padding: '5px',
          marginBottom: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add New Note
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note, index) => (
          <li
            key={index}
            onClick={() => selectNote(index)}
            style={{
              padding: '5px 0',
              cursor: 'pointer',
              backgroundColor: index === notes.length - 1 ? '#e9ecef' : 'transparent',
            }}
          >
            Note {index + 1}: {note.substring(0, 20)} {note.length > 20 ? '...' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;