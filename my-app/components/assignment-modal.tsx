"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Assignment, Employee, Location } from "@/lib/types";
import { cn } from "@/lib/utils";
import { withErrorHandling } from "@/lib/with-error-handling";
import { addAssignment, updateAssignment } from "@/server/assignment";
import { getEmployees } from "@/server/employee";
import { getLocations } from "@/server/location";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface AssignmentModalProps {
	isOpen: boolean;
	onClose: () => void;
	assignment: Assignment | null;
	refreshAssignments: () => void;
}

export default function AssignmentModal({
	isOpen,
	onClose,
	assignment,
	refreshAssignments,
}: AssignmentModalProps) {
	const [formData, setFormData] = useState<Assignment>({
		id: undefined,
		employee: { employee_id: "", firstName: "", lastName: "", position: "" },
		location: { location_id: "", name: "", province: "" },
		date: "",
	});
	const [formType, setFormType] = useState<"add" | "edit">("add");
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [locations, setLocations] = useState<Location[]>([]);

	useEffect(() => {
		if (isOpen) {
			fetchData();
		}
	}, [isOpen]);
	// Fetch employees and locations
	const fetchData = async () => {
		const employeesResponse = await getEmployees();
		const locationsResponse = await getLocations();
		setEmployees(employeesResponse);
		setLocations(locationsResponse);
	};

	useEffect(() => {
		setFormData({
			id: undefined,
			employee: { employee_id: "", firstName: "", lastName: "", position: "" },
			location: { location_id: "", name: "", province: "" },
			date: "",
		});
		if (assignment) {
			setFormData(assignment);
			setFormType("edit");
		} else {
			setFormType("add");
		}
	}, [assignment]);

	const handleSubmit = withErrorHandling(async (e: React.FormEvent) => {
		e.preventDefault();
		if (formType === "add") {
			formData.id = undefined;
			await addAssignment(formData);
		} else {
			console.log(assignment);
			await updateAssignment(formData);
		}
		setFormData({
			id: undefined,
			employee: { employee_id: "", firstName: "", lastName: "", position: "" },
			location: { location_id: "", name: "", province: "" },
			date: "",
		});
		refreshAssignments();
		onClose();
	});

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{assignment ? "Edit Assignment" : "Add Assignment"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="employee" className="text-right">
								Employee
							</label>
							<Select
								value={formData.employee.employee_id}
								onValueChange={(value) => {
									const selectedEmployee = employees.find(
										(emp) => emp.employee_id === value
									);
									setFormData({
										...formData,
										employee: selectedEmployee || {
											employee_id: "",
											firstName: "",
											lastName: "",
											position: "",
										},
									});
								}}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select an employee" />
								</SelectTrigger>
								<SelectContent>
									{employees.map((emp) => (
										<SelectItem
											key={emp.employee_id}
											value={
												emp.employee_id
											}>{`${emp.firstName} ${emp.lastName}`}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="location" className="text-right">
								Location
							</label>
							<Select
								value={formData.location.location_id}
								onValueChange={(value) => {
									const selectedLocation = locations.find(
										(loc) => loc.location_id === value
									);
									setFormData({
										...formData,
										location: selectedLocation || {
											location_id: "",
											name: "",
											province: "",
										},
									});
								}}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select a location" />
								</SelectTrigger>
								<SelectContent>
									{locations.map((loc) => (
										<SelectItem key={loc.location_id} value={loc.location_id}>
											{loc.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="date" className="text-right">
								Date
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"col-span-3 justify-start text-left font-normal",
											!formData.date && "text-muted-foreground"
										)}>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{formData.date ? (
											format(new Date(formData.date), "PPP")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={
											formData.date ? new Date(formData.date) : undefined
										}
										onSelect={(date) =>
											setFormData({
												...formData,
												date: date ? format(date, "yyyy-MM-dd") : "",
											})
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">
							{formType === "add" ? "Add" : "Save Changes"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
