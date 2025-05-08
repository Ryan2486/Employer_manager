"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import position from "@/data/position.json";
import type { Employee } from "@/lib/types";
import { withErrorHandling } from "@/lib/with-error-handling";
import { addEmployee, updateEmployee } from "@/server/employee";
import { useEffect, useState } from "react";

interface EmployeeModalProps {
	isOpen: boolean;
	onClose: () => void;
	employee: Employee | null;
	refreshData: () => void;
}

position.sort();

export default function EmployeeModal({
	isOpen,
	onClose,
	employee,
	refreshData,
}: EmployeeModalProps) {
	const [SelectedID, setSelectedID] = useState("");
	const [formType, setFormType] = useState<"add" | "edit">("add");
	const [formData, setFormData] = useState<Employee>({
		employee_id: "",
		firstName: "",
		lastName: "",
		position: "",
	});
	const [CanSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		if (employee) {
			setSelectedID(employee.employee_id);
			setFormData(employee);
			setFormType("edit");
		} else {
			setFormData({
				employee_id: "",
				firstName: "",
				lastName: "",
				position: "",
			});
			setFormType("add");
		}
	}, [employee]);

	useEffect(() => {
		setCanSubmit(
			formData.employee_id.trim() !== "" &&
				formData.firstName.trim() !== "" &&
				formData.lastName.trim() !== "" &&
				formData.position.trim() !== ""
		);
	}, [formData]);

	const handleSubmit = withErrorHandling(async (e: React.FormEvent) => {
		e.preventDefault();
		if (formType === "add") {
			await addEmployee(formData);
		} else {
			await updateEmployee(SelectedID, formData);
		}
		setFormData({
			employee_id: "",
			firstName: "",
			lastName: "",
			position: "",
		});
		refreshData();
		onClose();
	});

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{employee ? "Edit Employee" : "Add Employee"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="id" className="text-right">
								ID
							</Label>
							<Input
								disabled={formType === "edit"}
								id="id"
								value={formData.employee_id}
								onChange={(e) =>
									setFormData({ ...formData, employee_id: e.target.value })
								}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="firstName" className="text-right">
								First Name
							</Label>
							<Input
								id="firstName"
								value={formData.firstName}
								onChange={(e) =>
									setFormData({ ...formData, firstName: e.target.value })
								}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="lastName" className="text-right">
								Last Name
							</Label>
							<Input
								id="lastName"
								value={formData.lastName}
								onChange={(e) =>
									setFormData({ ...formData, lastName: e.target.value })
								}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="position" className="text-right">
								Position
							</Label>
							<Select
								value={formData.position}
								onValueChange={(value) =>
									setFormData({ ...formData, position: value })
								}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select a position" />
								</SelectTrigger>
								<SelectContent>
									{position.map((position) => (
										<SelectItem key={position} value={position}>
											{position}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={!CanSubmit}>
							{formType === "add" ? "Add" : "Save Changes"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
