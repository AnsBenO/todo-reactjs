import React from "react";

interface CheckboxProps {
	done: boolean;
	onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
	done,
	onChange,
}: CheckboxProps) => {
	return (
		<label className="checkbox-container">
			<input type="checkbox" checked={done} onChange={onChange} />
			<span className="checkmark"></span>
		</label>
	);
};

export default Checkbox;
