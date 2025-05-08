"use server";

import { Location } from "@/lib/types";
import { extractErrorMessage } from "@/lib/utils";

const url = process.env.BACKEND_URL;

export async function getLocations(): Promise<Location[]> {
	try {
		const response = await fetch(`${url}/api/locations`, {
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
		throw new Error(`Failed to fetch locations: ${errorMessage}`);
	}
}

export async function addLocation(location: Location): Promise<Location> {
	try {
		const response = await fetch(`${url}/api/locations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(location),
		});

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
		return await response.json();
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to add location: ${errorMessage}`);
	}
}

export async function updateLocation(location: Location): Promise<Location> {
	try {
		const response = await fetch(
			`${url}/api/locations/${location.location_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(location),
			}
		);

		if (!response.ok) {
			const errorMessage: string = await extractErrorMessage(response);
			throw new Error(errorMessage);
		}
		return await response.json();
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		throw new Error(`Failed to update location: ${errorMessage}`);
	}
}

export async function deleteLocation(locationId: string): Promise<void> {
	try {
		const response = await fetch(`${url}/api/locations/${locationId}`, {
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
		throw new Error(`Failed to delete location: ${errorMessage}`);
	}
}
