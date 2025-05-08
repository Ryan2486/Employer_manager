"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode";
import { ThemeProvider } from "@/components/theme-provider";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const segments = pathname.split("/").filter((segment) => segment !== "");
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SidebarProvider>
						<AppSidebar />
						<SidebarInset>
							<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
								<div className="flex items-center gap-2 px-4">
									<SidebarTrigger className="-ml-1" />
									<Separator orientation="vertical" className="mr-2 h-4" />
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem className="hidden md:block">
												<BreadcrumbLink href="#">EAM</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator className="hidden md:block" />

											{segments.length > 0 ? (
												segments.map((segment, index) => {
													const href = `/${segments
														.slice(0, index + 1)
														.join("/")}`;
													const isLast = index === segments.length - 1;

													return (
														<BreadcrumbItem key={href}>
															{isLast ? (
																<BreadcrumbPage>
																	{formateName(segment)}
																</BreadcrumbPage>
															) : (
																<>
																	<BreadcrumbLink href={href}>
																		{formateName(segment)}
																	</BreadcrumbLink>
																	<BreadcrumbSeparator className="hidden md:block" />
																</>
															)}
														</BreadcrumbItem>
													);
												})
											) : (
												<BreadcrumbItem>
													<BreadcrumbPage>Empployee</BreadcrumbPage>
												</BreadcrumbItem>
											)}
										</BreadcrumbList>
									</Breadcrumb>

									<div className="absolute top-5 right-5">
										<ModeToggle />
									</div>
								</div>
							</header>
							<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
								<div className="flex h-screen">
									<main className="flex-1 overflow-y-auto p-8">{children}</main>
									<Toaster richColors closeButton position="bottom-center" />
								</div>
							</div>
						</SidebarInset>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

const formateName = (name: string) => {
	console.log(name);
	switch (name) {
		case "locations":
			return "Location";
		case "assignments":
			return "Assignment";
		default:
			return name;
	}
};
