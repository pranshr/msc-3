import { useState, useEffect, useRef } from "react";
import Button from "../UI/Button";
import DropdownMenu from "../UI/DropdownMenu";

const dummyNotes = [
  { id: 1, title: "Grocery List", content: "Milk, Eggs, Bread", category: "Personal" },
  { id: 2, title: "Project Plan", content: "Design, Develop, Test", category: "Work" },
  { id: 3, title: "Ideas", content: "New app concept", category: "Ideas" },
];

const categories = [
  { value: "Personal", label: "Personal" },
  { value: "Work", label: "Work" },
  { value: "Ideas", label: "Ideas" },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(dummyNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  const titleRef = useRef(null);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title || "Untitled Note");
    setContent(note.content);
    setCategory({ value: note.category, label: note.category });
    if (titleRef.current) titleRef.current.textContent = note.title || "Untitled Note";
  };

  const handleSaveNote = () => {
    const newNote = {
      id: Date.now(),
      title: title || "Untitled Note",
      content,
      category: category?.value || "Uncategorized",
    };
    setNotes([newNote, ...notes]);
    clearForm();
  };

  const handleUpdateNote = () => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id
          ? { ...note, title: title || "Untitled Note", content, category: category?.value }
          : note
      )
    );
    clearForm();
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedNote?.id === id) clearForm();
  };

  const clearForm = () => {
    setSelectedNote(null);
    setTitle("Untitled Note");
    setContent("");
    setCategory(null);
    if (titleRef.current) titleRef.current.textContent = "Untitled Note";
  };

  // --- AUTOSAVE ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedNote) {
        const currentTitle = titleRef.current?.textContent || title || "Untitled Note";
        setNotes((prev) =>
          prev.map((note) =>
            note.id === selectedNote.id
              ? { ...note, title: currentTitle, content, category: category?.value }
              : note
          )
        );
        setLastSaved(Date.now()); // update autosave indicator
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedNote, content, category, title]);

  return (
    <div className="h-full flex bg-gray-100">
      {/* LEFT SIDE - Notes List */}
      <div className="w-3/10 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">My Notes</h1>
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div
                className="flex-1 cursor-pointer w-full"
                onClick={() => handleSelectNote(note)}
              >
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <p className="text-gray-500 truncate max-w-40 overflow-hidden">{note.content}</p>
                <span className="text-sm text-blue-600">{note.category}</span>
              </div>
              <Button
                onClick={() => handleDeleteNote(note.id)}
                variant="secondary"
                style="box"
                stretch={false}
                size="medium"
                textSize="sm"
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Note Editor */}
      <div className="w-7/10 flex flex-col justify-start bg-white">
        <div className="w-full max-w-4xl mx-auto">
          {/* Title, Category, Save/Update on same line */}
          <div className="flex items-center space-x-4 p-5 pb-4 bg-neutral-200 relative">
            {/* Editable title */}
            <div>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              className="text-xl font-semibold focus:outline-none px-2 py-1 min-w-[200px] flex-1 hover:cursor-text text-left"
              onBlur={() => setTitle(titleRef.current?.textContent || "Untitled Note")}
            >
              {title}
            </div>

            {/* Category */}
            <DropdownMenu
              options={categories}
              label="Select Category"
              onChange={(val) => setCategory(categories.find((c) => c.value === val))}
            />

            {/* Save / Update button */}
            {!selectedNote ? (
              <Button
                onClick={handleSaveNote}
                variant="primary"
                stretch={false}
                size="medium"
                textSize="sm"
                style="box"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={handleUpdateNote}
                variant="primary"
                stretch={false}
                size="medium"
                textSize="sm"
                style="box"
              >
                Update
              </Button>
            )}

            {/* Autosave indicator */}
            {lastSaved && (
              <span
                className="absolute right-4 bottom-2 text-sm text-green-600 opacity-90 transition-opacity duration-1000"
              >
                Autosaved
              </span>
            )}
          </div>

          {/* Content area */}
          <div className="p-5">
            <textarea
              className="w-full h-[calc(100vh-200px)] p-4 border rounded-md focus:outline-none focus:ring-2 border-emerald-300 focus:ring-indigo-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
