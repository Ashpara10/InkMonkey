import { createContext, useState } from "react";
import { Note } from "./types";

const NoteContext = createContext<{
  note: Note[] | null;
  setNote: React.Dispatch<React.SetStateAction<Note[] | null>>;
}>({ note: null, setNote: () => null });

export const NoteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notes, setNotes] = useState<Note[] | null>(null);
  return (
    <NoteContext.Provider value={{ note: notes, setNote: setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
export default NoteContext;
