import React, { FormEvent, useState } from "react";
import "./TaskInputForm.css";

interface TaskInputFormProps {
	onAdd: (value: string) => void;
}

const TaskInputForm: React.FC<TaskInputFormProps> = ({ onAdd }) => {
	const [taskName, setTaskName] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (taskName.trim() !== "") {
			onAdd(taskName);
			setTaskName("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="taskInputForm">
			<button type="submit" className="addBtn">
				+
			</button>
			<input
				className="taskInput"
				type="text"
				name="taskInput"
				id="taskInput"
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
				placeholder="Enter task name"
				autoComplete="off"
			/>
		</form>
	);
};

export default TaskInputForm;
