import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";
function Notes() {
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [savedNotes, setSavedNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setSavedNotes(localNotes);
  }, []);
  const handleSaveNote = () => {
    if (notes.trim() && date.trim()) {
      const newNote = {
        text: notes.trim(),
        date: date,
      };
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      setNotes("");
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };
  const handleDeleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  const filteredNotes = savedNotes.filter((note) => note.date === selectedDate);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Notes</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Filter by Date"
          type="date"
          variant="outlined"
          value={selectedDate}
          style={{
            width: "15rem",
          }}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Write your note here..."
          variant="outlined"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSaveNote}>
          Save
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotes.map((note, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    maxWidth: "50ch",
                    overflowWrap: "break-word",
                  }}
                >
                  {note.text}
                </TableCell>
                <TableCell>{note.date}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteNote(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Notes;
