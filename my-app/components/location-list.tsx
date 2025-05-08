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
import type { Location } from "@/lib/types";
import { withErrorHandling } from "@/lib/with-error-handling";
import { deleteLocation, getLocations } from "@/server/location";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import LocationModal from "./location-modal";

export default function LocationList() {
	const [locations, setLocations] = useState<Location[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	);

	useEffect(() => {
		fetchLocations();
	}, []);

	const filteredLocations = locations.filter(
		(location) =>
			location.location_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			location.province.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const fetchLocations = withErrorHandling(async () => {
		const data = await getLocations();
		setLocations(data);
	});

	const handleEdit = (location: Location) => {
		setSelectedLocation(location);
		setModalOpen(true);
	};

	const handleDelete = withErrorHandling(async (location: Location) => {
		await deleteLocation(location.location_id);
		fetchLocations();
	});

	return (
		<div>
			<div className="flex justify-between mb-4">
				<div className="relative w-64">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search by ID, Name or Province"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-8"
					/>
				</div>
				<Button onClick={() => setModalOpen(true)}>
					<Plus className="mr-2 h-4 w-4" /> Add Location
				</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredLocations.map((location) => (
					<Card key={location.location_id}>
						<CardHeader>
							<CardTitle>{location.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>ID:</strong> {location.location_id}
							</p>
							<p>
								<strong>Province:</strong> {location.province}
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" onClick={() => handleEdit(location)}>
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
									<DropdownMenuItem onClick={() => handleEdit(location)}>
										<Edit className="mr-2 h-4 w-4" /> Edit
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleDelete(location)}>
										<Trash className="mr-2 h-4 w-4" /> Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</CardFooter>
					</Card>
				))}
			</div>
			<LocationModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setSelectedLocation(null);
				}}
				location={selectedLocation}
				refreshLocations={fetchLocations}
			/>
		</div>
	);
}
