import { useEffect, useState } from "react";
import "./App.css";
import TaskInputForm from "./components/TaskInputForm";
import TaskItem from "./components/TaskItem";

interface Task {
	name: string;
	done: boolean;
}

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);
	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			const parsedTasks: Task[] = JSON.parse(storedTasks) as Task[];
			setTasks(parsedTasks);
		}
	}, []);

	useEffect(() => {
		const handleUnload = () => {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		};

		window.addEventListener("beforeunload", handleUnload);

		return () => {
			window.removeEventListener("beforeunload", handleUnload);
		};
	}, [tasks]);

	const addTask = (taskName: string) => {
		setTasks((prevValues) => [...prevValues, { name: taskName, done: false }]);
	};

	const handleTaskItemClick = (index: number) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].done = !updatedTasks[index].done;
		setTasks(updatedTasks);
	};
	const handleDelete = (index: number) => {
		setTasks((prevTasks) => prevTasks.filter((_task, i) => i !== index));
	};

	const updateTask = (index: number, newName: string) => {
		const newTasks = [...tasks];
		newTasks[index].name = newName;
		setTasks(newTasks);
	};

	return (
		<>
			<h1 className="couter">{`${tasks.filter((task) => task.done).length}/${
				tasks.length
			} Completed Tasks`}</h1>
			<TaskInputForm onAdd={addTask} />
			<ul>
				{tasks.map((task, index) => (
					<TaskItem
						key={index}
						title={task.name}
						done={task.done}
						onCheck={() => handleTaskItemClick(index)}
						onDelete={() => handleDelete(index)}
						onUpdate={(newName) => updateTask(index, newName)}
					/>
				))}
			</ul>
		</>
	);
}

export default App;
