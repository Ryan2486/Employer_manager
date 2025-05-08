import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function extractErrorMessage(response: Response): Promise<string> {
	const status = response.status;
	var statusText = undefined;
	var errorMessage =
		(await response.json().then((data) => data.error)) ?? undefined;
	if (status === 401) {
		statusText = "Unauthorized";
	}
	if (status === 403) {
		statusText = "Forbidden";
	}
	if (status === 404) {
		statusText = "Not Found";
	}
	if (status === 500) {
		statusText = "Internal Server Error";
	}
	if (statusText === undefined) {
		statusText = response.statusText;
	}

	return `${statusText} (${status}): ${errorMessage}`;
}
