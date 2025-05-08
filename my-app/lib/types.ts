export interface Employee {
	employee_id: string;
	firstName: string;
	lastName: string;
	position: string;
}

export interface Location {
	location_id: string;
	name: string;
	province: string;
}

export interface Assignment {
	id: number | undefined;
	employee: Employee;
	location: Location;
	date: string;
}
