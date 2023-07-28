import "./TaskItem.css";
import Checkbox from "./Checkbox";
import { useState } from "react";

interface TaskItemProps {
	title: string;
	done: boolean;
	onCheck: () => void;
	onDelete: () => void;
	onUpdate: (value: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
	title,
	done,
	onCheck,
	onDelete,
	onUpdate,
}: TaskItemProps) => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			<div className={`task ${done ? "completed" : ""}`}>
				<Checkbox done={done} onChange={onCheck} />
				{editMode ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setEditMode(false);
						}}
						className="editForm"
					>
						<input
							className="editInput"
							type="text"
							name=""
							id=""
							value={title}
							onBlur={() => setEditMode(false)}
							onChange={(e) => {
								e.preventDefault();
								onUpdate(e.target.value);
							}}
							autoComplete="off"
						/>
					</form>
				) : (
					<h3 onClick={() => setEditMode(!editMode)}>{title}</h3>
				)}

				<button className="delete" onClick={onDelete}>
					<i className="fa-solid fa-trash"></i>
				</button>
			</div>
		</>
	);
};

export default TaskItem;
