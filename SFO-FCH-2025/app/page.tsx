"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Users, ClipboardList, CheckCircle2, FileText, AlertTriangle, ArrowRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

const stepsRow1 = [
	{
		title: "Initial Application Review",
		icon: <FileText className="w-6 h-6" />,
	},
	{
		title: "Conditional Offer",
		icon: <ClipboardList className="w-6 h-6" />,
	},
	{
		title: "Background Check",
		icon: <Scale className="w-6 h-6" />,
	},
];
const stepsRow2 = [
	{
		title: "Individualized Assessment",
		icon: <AlertTriangle className="w-6 h-6" />,
	},
	{
		title: "Adverse Action Notice",
		icon: <Users className="w-6 h-6" />,
	},
	{
		title: "Final Decision",
		icon: <CheckCircle2 className="w-6 h-6" />,
	},
];

export default function Home() {
	const router = useRouter();
	const [showRestorativeRecordModal, setShowRestorativeRecordModal] = useState(false);

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
					<span className="text-cinnabar">Iowa</span>
				</h1>
				<div className="flex gap-8">
					{/* Legal Overview Panel */}
					<Card className="bg-background text-foreground border border-border shadow-sm rounded-lg w-2/5 min-w-[320px] max-w-[480px] flex-shrink-0">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-foreground">
								<Scale className="h-6 w-6 text-cinnabar" />
								Iowa Fair Chance Hiring Law
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray35">
								Ordinance 5522 and Iowa Code Section 364.3(12)(a)
							</p>
							<div className="space-y-2">
								<h3 className="font-semibold text-gray35">Permissible Reasons for Adverse Hiring Decisions</h3>
								<p className="text-sm text-foreground font-poppins">
									An employer may make an adverse hiring decision based on an applicant's criminal record in the following situations:
								</p>
								<ol className="text-sm text-foreground font-poppins list-decimal pl-4 space-y-2">
									<li>When the criminal conduct has a direct and substantial bearing on the fitness or ability to perform the job duties, considering:
										<ul className="list-disc pl-4 mt-1">
											<li>Nature of the employment</li>
											<li>Place and manner of employment</li>
											<li>Nature and seriousness of the offense</li>
											<li>Opportunity for similar offense</li>
											<li>Time elapsed since conviction/arrest</li>
											<li>Number and types of convictions</li>
											<li>Evidence of rehabilitation</li>
										</ul>
									</li>
									<li>When employment would involve unreasonable risk to property, safety, or business reputation</li>
									<li>For positions working with vulnerable populations where the applicant has relevant convictions</li>
									<li>When required by federal or state law regarding background checks</li>
								</ol>
							</div>
							<Button
								variant="outline"
								className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
								onClick={() => router.push("/ordinance")}
							>
								View Full Iowa Law Details
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
					      Start a structured workflow to evaluate conviction history in alignment with the Iowa Fair Chance Hiring Law. This process will guide you through the required steps for making fair and compliant hiring decisions.
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
					    <div className="mt-6 space-y-4">
					      <div className="bg-muted p-4 rounded-lg">
					        <h3 className="font-semibold mb-2">Key Requirements</h3>
					        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
					          <li>No criminal record inquiries on initial applications</li>
					          <li>Must wait until after conditional offer to conduct background checks</li>
					          <li>Must provide notice before taking adverse action</li>
					          <li>Must conduct individualized assessment for any adverse decisions</li>
					        </ul>
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
							className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
							variant="outline"
							onClick={() => setShowRestorativeRecordModal(true)}
						>
							Demo The Restorative Record
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Restorative Record Modal */}
			<Dialog open={showRestorativeRecordModal} onOpenChange={setShowRestorativeRecordModal}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-cinnabar mb-4">
							The Restorative Record - Candidate Portal Demo
						</DialogTitle>
					</DialogHeader>
					<div className="w-full h-[70vh] overflow-hidden rounded-lg border">
						<iframe
							src="/Jacobi%20Iverson%20-%20Restorative%20record%20.pdf"
							className="w-full h-full"
							title="The Restorative Record - Candidate Portal Demo"
						/>
					</div>
					<div className="flex justify-end gap-3 mt-4">
						<Button
							className="bg-cinnabar text-white hover:bg-cinnabar-600"
							onClick={() => setShowRestorativeRecordModal(false)}
						>
							Close
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}