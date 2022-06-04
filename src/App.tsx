import "./App.css";
import { useEffect, useState } from "react";
import dummyNotes from "./DUMMY_Notes";
import Note from "./interface/components/note/Note";
import INote from "./interface/note.interface";

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);

  useEffect(() => {
    const listFromStorageString = localStorage.getItem("my-notes")
    if(listFromStorageString){
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else {}
     setNotesList(dummyNotes)
    
  }, []);
 
  useEffect(() => {
    console.log('saved to local storage');
    const notesListString = JSON.stringify(notesList); //converts array to string
    localStorage.setItem('my-notes', notesListString);
  },[notesList]);

  // get notes method
  // const getNotes = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:8000/notes'
  //     );
  //     setNotesList(response.data.notes);
  //     console.log(notesList);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  console.log("rerendering");
  console.log(notesList);

  const updateNoteItem = (updatedNote: INote) => {
    console.log("value updated in the app component");
    console.log(updatedNote);
  
    const updatedList = notesList.map((noteItem: INote) => { //to update list
      if(noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    setNotesList(updatedList); //updating the state of notes list
  };

  return (
    <div className="App">
      <div className="notes-list">
        {notesList.map((noteItem, index) => {
          return (
          <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
