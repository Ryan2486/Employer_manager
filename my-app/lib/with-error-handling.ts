import { toast } from "sonner";

/**
 * Higher-order function that wraps a function with error handling.
 * If the wrapped function throws an error, it displays a toast with the error message.
 *
 * @param fn The function to wrap with error handling
 * @returns A new function that handles errors
 */
export function withErrorHandling<T extends any[], R>(
	fn: (...args: T) => Promise<R> | R
): (...args: T) => Promise<R | undefined> {
	return async (...args: T) => {
		try {
			return await fn(...args);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			toast.error("Error : " + errorMessage);
			return undefined;
		}
	};
}
