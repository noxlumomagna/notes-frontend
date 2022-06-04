import { FC, FocusEvent } from 'react';
import INote from '../../note.interface';
import './Note.css';

//what components this will recieve
type Props = {
    note: INote;
    onNoteUpdate: (note:INote) => void;
};

const Note: FC<Props> = ({note, onNoteUpdate}) => {
      const noteTextUpdated = (event : FocusEvent<HTMLDivElement>) => {
        const newTextValue = event.currentTarget.textContent;
        if(newTextValue === note.text) {
          return;
        }
        console.log("note changed");
        const updatedNoteObject : INote = {
            ...note,//keeps everything in previous state of the note
            text: newTextValue || '',   //overides previous value
        };
        onNoteUpdate(updatedNoteObject); 
    };

  return (
    <div className="note">
      <div 
        onBlur={noteTextUpdated}
        contentEditable={true} 
        suppressContentEditableWarning={true} 
        className="note_text">{note.text}
      </div>
    <div className="note_link"><a href={note.link}>link</a></div>
    </div>
  );
}

export default Note;
