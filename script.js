const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");
let editClicked;
let noteIndex;
let notes = "";
init();

function init() {
  let out = "";
  let noteArray = JSON.parse(localStorage.getItem("noteData"));
  editClicked = false;

  if (noteArray != null && noteArray != "") {
    noteArray = JSON.parse(localStorage.getItem("noteData"));

    // Goes through each saved note
    // and creates an ouputs that contain option tags including title
    for (let i = 0; i < noteArray.length; i++) {
      out += "<option value=" + i + ">";
      out += noteArray[i].title;
      out += "</option>";

      document.getElementById("noteMaster").innerHTML = out;
    }

    //passes `e` event into `function`
    document
      .getElementById("writeButton")
      .addEventListener("click", function(e) {
        writeNote();
      });

    document
      .getElementById("noteMaster")
      .addEventListener("click", function(e) {
        displayNote(e.target.value);
        noteIndex = e.target.value;
      });

    readNotes();
  } else {
    writeNote();
  }
}

function writeNote() {
  document.getElementById("read").style.display = "none";
  document.getElementById("write").style.display = "block";
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteBody").value = "";
}

function readNotes() {
  document.getElementById("read").style.display = "block";
  document.getElementById("write").style.display = "none";
}

function displayNote(note) {
  let noteArray = JSON.parse(localStorage.getItem("noteData"));
  let out = "<h2>" + noteArray[note].title + "</h2>";
  out += "<h4>Date: " + new Date(noteArray[note].date).toDateString() + "</h4>";
  out += "<p>" + noteArray[note].body + "</p>";

  out += "<button id ='deleteButton'>Delete</button>";
  out += "<button id = 'editButton'>Edit</button>";

  document.getElementById("noteDisplay").innerHTML = out;

  document.getElementById("deleteButton").onclick = function() {
    noteArray.splice(note, 1);
    localStorage.setItem("noteData", JSON.stringify(noteArray));
    document.getElementById("noteDisplay").innerHTML = "";
    init();
  };
  document.getElementById("editButton").onclick = function() {
    document.getElementById("read").style.display = "none";
    document.getElementById("write").style.display = "block";
    document.getElementById("noteTitle").value = noteArray[note].title;
    document.getElementById("noteBody").value = noteArray[note].body;
    editClicked = true;
  };
}

saveButton.onclick = function() {
  const noteDate = new Date();
  const noteTitle = document.getElementById("noteTitle").value;
  const noteBody = document.getElementById("noteBody").value;
  const theNote = new Note(noteDate, noteTitle, noteBody);
  saveNotes(theNote);
};

cancelButton.onclick = function() {
  let noteArray = JSON.parse(localStorage.getItem("noteData"));
  if (noteArray != null && noteArray != "") {
    readNotes();
  }
};

function saveNotes(note) {
  let noteArray = JSON.parse(localStorage.getItem("noteData"));

  if (editClicked) {
    //console.log("edit button clicked");
    noteArray[noteIndex] = note;
  } else {
    if (noteArray == null) {
      noteArray = new Array();
      noteArray.push(note);
    } else {
      noteArray.push(note);
    }
  }

  localStorage.setItem("noteData", JSON.stringify(noteArray));
  readNotes();
  init();
}

function Note(date, title, body) {
  this.date = date;
  this.title = title;
  this.body = body;
}
