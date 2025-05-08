"use server";

import { Employee } from "@/lib/types";
import { extractErrorMessage } from "@/lib/utils";

const url = process.env.BACKEND_URL;

export async function getEmployees(): Promise<Employee[]> {
	try {
		const response = await fetch(`${url}/api/employees`, {
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
		throw new Error(`Failed to fetch employees: ${errorMessage}`);
	}
}

export async function addEmployee(employee: Employee): Promise<Employee> {
	try {
		const response = await fetch(`${url}/api/employees`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
		return await response.json();
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to add employee: ${errorMessage}`);
	}
}

export async function updateEmployee(
	id: string,
	employee: Employee
): Promise<Employee> {
	try {
		const response = await fetch(`${url}/api/employees/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
		return await response.json();
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to update employee: ${errorMessage}`);
	}
}

export async function deleteEmployee(id: string): Promise<void> {
	try {
		const response = await fetch(`${url}/api/employees/${id}`, {
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
		throw new Error(`Failed to delete employee: ${errorMessage}`);
	}
}
