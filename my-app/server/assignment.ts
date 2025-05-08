"use server";

import { Assignment } from "@/lib/types";
import { extractErrorMessage } from "@/lib/utils";

const url = process.env.BACKEND_URL;

export async function getAssignments(): Promise<Assignment[]> {
	try {
		const response = await fetch(`${url}/api/assignments`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
		return await response.json();
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to fetch assignments: ${errorMessage}`);
	}
}

export async function addAssignment(assignment: Assignment): Promise<void> {
	try {
		const response = await fetch(`${url}/api/assignments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(assignment),
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to add assignment: ${errorMessage}`);
	}
}

export async function updateAssignment(assignment: Assignment): Promise<void> {
	try {
		const response = await fetch(`${url}/api/assignments/${assignment.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(assignment),
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to update assignment: ${errorMessage}`);
	}
}

export async function deleteAssignment(id: string): Promise<void> {
	try {
		const response = await fetch(`${url}/api/assignments/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to delete assignment: ${errorMessage}`);
	}
}
