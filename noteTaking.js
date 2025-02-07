// retrieves notes from the browser's local storage,
// and then adds each note to a list displayed on the webpage

document.addEventListener("DOMContentLoaded", function () {
  const noteList = document.getElementById("note-list");
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  // iterates over each note in the notes array using the forEach method.
  //  For each note, it calls a function named addNoteToList and passes
  //  the note as an argument

  notes.forEach((note) => {
    addNoteToList(note);
  });
});

// Function to add a note to the list
function addNoteToList(noteText) {
  const noteList = document.getElementById("note-list");
  const li = document.createElement("li");
  li.textContent = noteText;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", function () {
    deleteNoteFromList(li, noteText);

    // logic to delete the note
  });
  li.appendChild(deleteButton);
  noteList.appendChild(li);
}

// Save a new note to local storage
document.getElementById("save-button").addEventListener("click", function () {
  const noteInput = document.getElementById("note-input");
  const noteText = noteInput.value.trim();

  if (noteText !== "") {
    addNoteToList(noteText);

    // Save to local storage even when it's reloads
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = ""; // Clear input field
  }
});

// Delete a note from the list and update local storage
// getting my local storage for the delete button
function deleteNoteFromList(noteElement, noteText) {
  if (confirm("Are you sure you want to delete this note?")) {
    const noteList = document.getElementById("note-list");
    noteList.removeChild(noteElement);

    // Update local storage to reflect changes
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteIndex = notes.indexOf(noteText);
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }
}
