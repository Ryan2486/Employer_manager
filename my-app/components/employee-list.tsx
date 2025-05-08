"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Employee } from "@/lib/types";
import { withErrorHandling } from "@/lib/with-error-handling";
import { deleteEmployee, getEmployees } from "@/server/employee";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import EmployeeModal from "./employee-modal";

export default function EmployeeList() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
		null
	);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = withErrorHandling(async () => {
		const data = await getEmployees();
		setEmployees(data);
	});

	const filteredEmployees = employees.filter(
		(employee) =>
			employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleEdit = (employee: Employee) => {
		setSelectedEmployee(employee);
		setModalOpen(true);
	};

	const handleDelete = withErrorHandling(async (employee: Employee) => {
		await deleteEmployee(employee.employee_id);
		fetchData();
		console.log("Delete", employee);
	});

	return (
		<div>
			<div className="flex justify-between mb-4">
				<div className="relative w-64">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search by ID, Name or Position"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-8"
					/>
				</div>
				<Button onClick={() => setModalOpen(true)}>
					<Plus className="mr-2 h-4 w-4" /> Add Employee
				</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredEmployees.map((employee) => (
					<Card key={employee.employee_id}>
						<CardHeader>
							<CardTitle>{`${employee.firstName} ${employee.lastName}`}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>ID:</strong> {employee.employee_id}
							</p>
							<p>
								<strong>Position:</strong> {employee.position}
							</p>
						</CardContent>
						<CardFooter className="flex justify-end">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuItem onClick={() => handleEdit(employee)}>
										<Edit className="mr-2 h-4 w-4" /> Edit
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleDelete(employee)}>
										<Trash className="mr-2 h-4 w-4" /> Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</CardFooter>
					</Card>
				))}
			</div>
			<EmployeeModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setSelectedEmployee(null);
				}}
				employee={selectedEmployee}
				refreshData={fetchData}
			/>
		</div>
	);
}
