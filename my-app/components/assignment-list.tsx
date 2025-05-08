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
import type { Assignment } from "@/lib/types";
import { withErrorHandling } from "@/lib/with-error-handling";
import { deleteAssignment, getAssignments } from "@/server/assignment";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AssignmentModal from "./assignment-modal";

export default function AssignmentList() {
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedAssignment, setSelectedAssignment] =
		useState<Assignment | null>(null);

	useEffect(() => {
		fetchAssignments();
	}, []);

	const filteredAssignments = assignments.filter(
		(assignment) =>
			assignment.employee.firstName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			assignment.employee.lastName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			assignment.location.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			assignment.date.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const fetchAssignments = withErrorHandling(async () => {
		const data = await getAssignments();
		setAssignments(data);
	});

	const handleEdit = (assignment: Assignment) => {
		setSelectedAssignment(assignment);
		setModalOpen(true);
	};

	const handleDelete = withErrorHandling(async (assignment: Assignment) => {
		if (assignment.id) {
			await deleteAssignment(assignment.id.toString());
			await fetchAssignments();
		}
	});

	return (
		<div>
			<div className="flex justify-between mb-4">
				<div className="relative w-80">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search by Employee, Location or Date"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-8"
					/>
				</div>
				<Button onClick={() => setModalOpen(true)}>
					<Plus className="mr-2 h-4 w-4" /> Add Assignment
				</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredAssignments.map((assignment) => (
					<Card key={assignment.id}>
						<CardHeader>
							<CardTitle>{`${assignment.employee.firstName} ${assignment.employee.lastName}`}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>Location:</strong> {assignment.location.name}
							</p>
							<p>
								<strong>Date:</strong> {assignment.date}
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" onClick={() => handleEdit(assignment)}>
								Edit
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuItem onClick={() => handleEdit(assignment)}>
										<Edit className="mr-2 h-4 w-4" /> Edit
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleDelete(assignment)}>
										<Trash className="mr-2 h-4 w-4" /> Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</CardFooter>
					</Card>
				))}
			</div>
			<AssignmentModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setSelectedAssignment(null);
				}}
				assignment={selectedAssignment}
				refreshAssignments={fetchAssignments}
			/>
		</div>
	);
}
