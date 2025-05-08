"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import provinces from "@/data/province.json";
import type { Location } from "@/lib/types";
import { withErrorHandling } from "@/lib/with-error-handling";
import { addLocation, updateLocation } from "@/server/location";
import { useEffect, useState } from "react";

interface LocationModalProps {
	isOpen: boolean;
	onClose: () => void;
	location: Location | null;
	refreshLocations: () => void;
}

provinces.sort();

export default function LocationModal({
	isOpen,
	onClose,
	location,
	refreshLocations,
}: LocationModalProps) {
	const [formType, setFormType] = useState<"add" | "edit">("add");
	const [IsCanSubmit, setIsCanSubmit] = useState(false);
	const [formData, setFormData] = useState<Location>({
		location_id: "",
		name: "",
		province: "",
	});

	useEffect(() => {
		setFormData({
			location_id: "",
			name: "",
			province: "",
		});
		if (location) {
			setFormData(location);
			setFormType("edit");
		} else {
			setFormType("add");
		}
	}, [location]);

	useEffect(() => {
		setIsCanSubmit(
			formData.location_id.trim() !== "" &&
				formData.name.trim() !== "" &&
				formData.province.trim() !== ""
		);
	}, [formData]);

	const handleSubmit = withErrorHandling(async (e: React.FormEvent) => {
		e.preventDefault();
		if (formType === "add") {
			await addLocation(formData);
		} else {
			await updateLocation(formData);
		}
		setFormData({
			location_id: "",
			name: "",
			province: "",
		});
		refreshLocations();
		onClose();
	});

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{location ? "Edit Location" : "Add Location"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="id" className="text-right">
								ID
							</Label>
							<Input
								id="id"
								value={formData.location_id}
								disabled={formType === "edit"}
								onChange={(e) =>
									setFormData({ ...formData, location_id: e.target.value })
								}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="province" className="text-right">
								Province
							</Label>
							<Select
								value={formData.province}
								onValueChange={(value) =>
									setFormData({ ...formData, province: value })
								}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select a province" />
								</SelectTrigger>
								<SelectContent>
									{provinces.map((province: string) => (
										<SelectItem key={province} value={province}>
											{province}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={!IsCanSubmit}>
							{formType === "add" ? "Add" : "Save Changes"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
