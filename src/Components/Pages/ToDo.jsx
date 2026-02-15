import { useState, useEffect } from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import DropdownMenu from "../UI/DropdownMenu";

const ToDo = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [showAddCard, setShowAddCard] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);

    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
        date: "",
        urgent: false,
    });

    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Finish React Project",
            date: "2026-02-01",
            description: "Complete the basic todo app.",
            urgent: false,
        },
        {
            id: 2,
            title: "Workout",
            date: "2026-02-10",
            description: "45-minute strength training.",
            urgent: true,
        },
    ]);

    const today = new Date().toISOString().split("T")[0];

    // auto-mark overdue as urgent
    useEffect(() => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.date < today && !todo.urgent
                    ? { ...todo, urgent: true }
                    : todo
            )
        );
    }, [today]);

    const filteredTodos = todos.filter((todo) => {
        const matchesSearch =
            todo.title.toLowerCase().includes(search.toLowerCase()) ||
            todo.description.toLowerCase().includes(search.toLowerCase());

        if (!matchesSearch) return false;

        const isOverdue = todo.date < today;

        switch (filter) {
            case "today":
                return todo.date === today;
            case "upcoming":
                return todo.date > today;
            case "urgent":
                return todo.urgent;
            case "overdue":
                return isOverdue;
            case "urgent-overdue":
                return todo.urgent && isOverdue;
            default:
                return true;
        }
    });

    const handleSaveTodo = () => {
        if (!newTodo.title || !newTodo.description || !newTodo.date) return;

        if (editingTodoId) {
            setTodos(
                todos.map((todo) =>
                    todo.id === editingTodoId
                        ? { ...todo, ...newTodo }
                        : todo
                )
            );
        } else {
            setTodos([{ ...newTodo, id: Date.now() }, ...todos]);
        }

        setNewTodo({ title: "", description: "", date: "", urgent: false });
        setEditingTodoId(null);
        setShowAddCard(false);
    };

    const handleEditTodo = (todo) => {
        setNewTodo(todo);
        setEditingTodoId(todo.id);
        setShowAddCard(true);
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="min-h-full bg-slate-50 flex py-10 justify-center relative">
            <div
                className={`w-full max-w-lg flex flex-col gap-4 transition-all duration-300 ${showAddCard ? "mr-[50%]" : ""
                    }`}
            >
                <div>
                    <InputField
                        type="search"
                        placeholder="Search todos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        required={false}
                    />

                    <div className="flex py-1 h-12 gap-2 items-center">
                        <Button
                            style="box"
                            stretch={false}
                            onClick={() => {
                                setEditingTodoId(null);
                                setNewTodo({
                                    title: "",
                                    description: "",
                                    date: "",
                                    urgent: false,
                                });
                                setShowAddCard(true);
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </Button>

                        <DropdownMenu
                            label="Filter"
                            onChange={setFilter}
                            options={[
                                { label: "All", value: "all" },
                                { label: "Today", value: "today" },
                                { label: "Upcoming", value: "upcoming" },
                                { label: "Urgent", value: "urgent" },
                                { label: "Overdue", value: "overdue" },
                                {
                                    label: "Urgent & Overdue",
                                    value: "urgent-overdue",
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {filteredTodos.map((todo) => {
                        const isOverdue = todo.date < today;

                        return (
                            <div
                                key={todo.id}
                                className={`bg-white rounded-lg shadow p-4 ${todo.urgent
                                    ? "border-l-4 border-red-500"
                                    : ""
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-black">
                                        {todo.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {todo.date}
                                    </span>
                                </div>

                                <div className="flex gap-2 mb-1">
                                    {todo.urgent && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-red-200 text-red-800">
                                            Urgent
                                        </span>
                                    )}
                                    {isOverdue && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-red-300 text-red-900">
                                            Overdue
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {todo.description}
                                </p>

                                <div className="mt-2 flex justify-end gap-2">
                                    <Button
                                        stretch={false}
                                        onClick={() =>
                                            handleEditTodo(todo)
                                        }
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                    <Button
                                        stretch={false}
                                        onClick={() =>
                                            handleDeleteTodo(todo.id)
                                        }
                                        variant="secondary"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showAddCard && (
                <div className="fixed top-10 right-18 bottom-20 bg-slate-100 shadow-lg rounded-xl p-6 w-[40%] z-50 flex flex-col justify-between items-center border-2 border-neutral-400">
                    <div className="w-90">
                        <h2 className="font-bold text-emerald-900 dark:text-emerald-400 text-3xl mb-6 mt-3">
                            {editingTodoId ? "Edit Todo" : "Add Todo"}
                        </h2>

                        <InputField
                            label="Title"
                            type="text"
                            value={newTodo.title}
                            onChange={(e) =>
                                setNewTodo({
                                    ...newTodo,
                                    title: e.target.value,
                                })
                            }
                        />

                        <InputField
                            label="Description"
                            type="text"
                            value={newTodo.description}
                            onChange={(e) =>
                                setNewTodo({
                                    ...newTodo,
                                    description: e.target.value,
                                })
                            }
                        />

                        <InputField
                            label="Date"
                            type="date"
                            value={newTodo.date}
                            onChange={(e) =>
                                setNewTodo({
                                    ...newTodo,
                                    date: e.target.value,
                                })
                            }
                        />

                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={newTodo.urgent}
                                onChange={(e) =>
                                    setNewTodo({
                                        ...newTodo,
                                        urgent: e.target.checked,
                                    })
                                }
                                className="mr-2"
                            />
                            <label className="text-black">
                                Urgent
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-2 w-90 mb-3">
                        <Button stretch={true} onClick={handleSaveTodo}>
                            {editingTodoId ? "Update" : "Add"}
                        </Button>
                        <Button
                            stretch={true}
                            onClick={() => {
                                setShowAddCard(false);
                                setEditingTodoId(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToDo;
