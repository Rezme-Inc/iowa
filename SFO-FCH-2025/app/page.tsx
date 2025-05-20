"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users, ClipboardList, CheckCircle2, FileText, AlertTriangle, ArrowRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

const stepsRow1 = [
	{
		title: "Ad and App Compliance Statement",
		icon: <FileText className="w-6 h-6" />,
	},
	{
		title: "Conditional Job Offer Letter",
		icon: <ClipboardList className="w-6 h-6" />,
	},
	{
		title: "Individualized Assessment",
		icon: <Scale className="w-6 h-6" />,
	},
];
const stepsRow2 = [
	{
		title: "Preliminary Notice to Revoke Job Offer",
		icon: <AlertTriangle className="w-6 h-6" />,
	},
	{
		title: "Individualized Reassessment Form",
		icon: <Users className="w-6 h-6" />,
	},
	{
		title: "Final Notice to Revoke Job Offer",
		icon: <CheckCircle2 className="w-6 h-6" />,
	},
];

export default function Home() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-background font-poppins p-0">
			{/* Logo Bar */}
			<div className="flex items-center px-8 py-6">
				<Image
					src="/rezme-logo.png"
					alt="rézme logo"
					width={160}
					height={48}
					priority
				/>
			</div>
			<div className="mx-auto max-w-7xl space-y-8 px-8 pb-8">
				<h1 className="text-4xl font-bold text-foreground">
					Fair Chance Hiring Compliance Platform Demo:{" "}
					<span className="text-cinnabar">California</span>
				</h1>
				<div className="flex gap-8">
					{/* Legal Overview Panel */}
					<Card className="bg-background text-foreground border border-border shadow-sm rounded-lg w-2/5 min-w-[320px] max-w-[480px] flex-shrink-0">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-foreground">
                <Scale className="h-6 w-6 text-cinnabar" />
								Fair Chance Act: Guidance for California Employers and Job Applicants
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray35">
								The Fair Chance Act, which went into effect on January 1, 2018, is a California law that aims to reduce undue barriers to employment for individuals with criminal histories. This law generally prohibits employers with five or more employees from asking a job candidate about conviction history before making a job offer, among other requirements. This type of law is also known as a "Ban the Box" law.
							</p>
							<div className="space-y-2">
								<h3 className="font-semibold text-gray35">Key Requirements:</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-foreground font-poppins">
									<li>Applies to employers with 5+ employees</li>
									<li>No conviction history questions before job offer</li>
									<li>Individualized assessment required</li>
									<li>Must consider rehabilitation evidence</li>
								</ul>
							</div>
							<Button
								variant="outline"
								className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
								onClick={() => router.push("/ordinance")}
							>
								View Full California Fair Chance Act
							</Button>
						</CardContent>
					</Card>

					{/* Assessment Launch Panel */}
					<Card className="bg-background text-foreground border border-border shadow-sm rounded-lg w-full max-w-none flex-shrink min-w-[600px]">
					  <CardHeader>
					    <CardTitle className="flex items-center gap-2 text-foreground text-xl font-semibold">
					      <ClipboardList className="h-5 w-5 text-cinnabar" />
					      Launch Assessment Demo
					    </CardTitle>
					  </CardHeader>
					  <CardContent className="space-y-4">
					    <p className="text-gray35">
					      Start a structured workflow to evaluate conviction history in
					      compliance with Fair Chance requirements. This process will guide
					      you through:
					    </p>
					    {/* Steps Row (Icons + Arrows) */}
					    <div className="relative w-full mt-6 space-y-6">
					      {/* First row */}
					      <div className="flex justify-between w-full">
					        {stepsRow1.map((step, idx) => (
					          <div key={step.title} className="flex flex-col items-center min-w-0 flex-1">
					            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cinnabar text-white">
					              {step.icon}
					            </div>
					            <span className="text-lg font-bold text-foreground text-center break-words leading-tight mt-2 max-w-[200px]">
					              {step.title}
					            </span>
					          </div>
					        ))}
					      </div>
					      {/* Second row */}
					      <div className="flex justify-between w-full">
					        {stepsRow2.map((step, idx) => (
					          <div key={step.title} className="flex flex-col items-center min-w-0 flex-1">
					            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cinnabar text-white">
					              {step.icon}
					            </div>
					            <span className="text-lg font-bold text-foreground text-center break-words leading-tight mt-2 max-w-[200px]">
					              {step.title}
					            </span>
					          </div>
					        ))}
					      </div>
					    </div>
					    <Button
					      className="w-full bg-cinnabar text-white hover:bg-cinnabar-600 transition font-poppins"
					      onClick={() => router.push("/assessment")}
					    >
					      Begin New Assessment Demo
					    </Button>
					  </CardContent>
					</Card>
				</div>
				{/* Candidate Portal Card */}
				<Card className="mt-8 bg-background text-foreground border border-border shadow-sm rounded-lg">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-foreground">
							<Users className="h-5 w-5 text-cinnabar" />
							Candidate Portal Demo: "The Restorative Record"
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-gray35">
							A dedicated portal for candidates to view, update, and share their
							restorative justice and rehabilitation records as part of the Fair
							Chance hiring process.
						</p>
						<Button
							asChild
							className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
							variant="outline"
						>
							<a
								href="https://cornell.restorativerecord.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Demo The Restorative Record
							</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}