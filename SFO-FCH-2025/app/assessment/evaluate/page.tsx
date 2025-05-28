"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check, FileText, Info, Send, Edit, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image"; // Add this import for the logo

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

interface RequiredDocument {
  type: "jobDescription" | "backgroundCheck" | "restorativeRecord";
  file: File | null;
  notes: string;
}

export default function AssessmentEvaluate() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showBlockingDialog, setShowBlockingDialog] = useState(false);
  const [showCompletionWarning, setShowCompletionWarning] = useState(false);
  const [showComplianceConfirmation, setShowComplianceConfirmation] = useState(false);
  const [showTimeframeDialog, setShowTimeframeDialog] = useState(false);
  const [showFinalDialog, setShowFinalDialog] = useState(false);
  const [complianceAcknowledged, setComplianceAcknowledged] = useState(false);
  const [responseTimeframe, setResponseTimeframe] = useState("");
  const [giveAnotherChance, setGiveAnotherChance] = useState<boolean | null>(null);
  const [showOfferLetterDialog, setShowOfferLetterDialog] = useState(false);
  const [offerLetterData, setOfferLetterData] = useState({
    applicantName: "",
    position: "",
    employer: "",
    date: new Date().toISOString().split('T')[0],
    businessRisk: "",
    safetyRisk: "",
    additionalChecks: [""],
    employerContact: "",
    employerAddress: "",
    contactPhone: "",
    contactEmail: ""
  });
  const [isEditingLetter, setIsEditingLetter] = useState(false);
  const [showWOTCModal, setShowWOTCModal] = useState(false);
  const [showWOTCSigningScreen, setShowWOTCSigningScreen] = useState(false);
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: "Confirm Conditional Offer", completed: false },
    { id: 2, title: "Background Check", completed: false },
    { id: 3, title: "Business Necessity Analysis", completed: false },
    { id: 4, title: "Time Analysis", completed: false },
    { id: 5, title: "Evidence of Rehabilitation", completed: false },
    { id: 6, title: "Assessment Summary", completed: false },
    { id: 7, title: "Final Decision", completed: false }
  ]);

  const [hasConditionalOffer, setHasConditionalOffer] = useState<string | null>(null);

  const [documentValidation, setDocumentValidation] = useState({
    isOld: false,
    isJuvenile: false,
    isDecriminalized: false,
    isArrest: false,
    isConviction: false,
    isChallenged: false,
  });

  const [jobRelation, setJobRelation] = useState({
    isRelated: null as boolean | null,
    duties: [] as string[],
    explanation: "",
  });

  const [timeElapsed, setTimeElapsed] = useState<string>("");

  const [rehabilitation, setRehabilitation] = useState({
    hasEvidence: null as boolean | null,
    notes: "",
  });

  const [certificationChecked, setCertificationChecked] = useState(false);

  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  const [noticeData, setNoticeData] = useState({
    date: new Date().toISOString().split('T')[0],
    applicantName: "",
    position: "",
    preliminaryDecision: "",
    convictions: ["", "", ""],
    additionalDocuments: "",
    employerName: "",
    employerAddress: "",
    employerEmail: "",
    employerPhone: "",
    employerContact: "",
    contactInfo: {
      name: "",
      mailingAddress: "",
      emailAddress: ""
    },
    individualizedAssessment: {
      generalExplanation: "Individualized assessment generally means that an employer informs the individual that he may be excluded because of past criminal conduct; provides an opportunity to the individual to demonstrate that the exclusion does not properly apply to him; and considers whether the individual's additional information shows that the policy as applied is not job related and consistent with business necessity.",
      additionalInfo: [
        "The facts or circumstances surrounding the offense or conduct",
        "The number of offenses for which the individual was convicted",
        "Older age at the time of conviction, or release from prison",
        "Evidence that the individual performed the same type of work, post conviction, with the same or a different employer, with no known incidents of criminal conduct",
        "The length and consistency of employment history before and after the offense or conduct",
        "Rehabilitation efforts, e.g., education/training",
        "Employment or character references and any other information regarding fitness for the particular position",
        "Whether the individual is bonded under a federal, state, or local bonding program"
      ],
      noResponseNote: "If the individual does not respond to the employer's attempt to gather additional information about his background, the employer may make its employment decision without the information."
    }
  });
  const [isEditingNotice, setIsEditingNotice] = useState(false);

  const [showFinalNoticeDialog, setShowFinalNoticeDialog] = useState(false);
  const [finalNoticeData, setFinalNoticeData] = useState({
    date: new Date().toISOString().split('T')[0],
    applicantName: "",
    employerContact: "",
    employerCompany: "",
    employerAddress: "",
    employerPhone: "",
    initialNoticeDate: "",
    responseReceived: "none", // 'none', 'noResponse', 'infoSubmitted'
    responseDetails: "",
    convictionError: "none", // 'none', 'was', 'wasNot'
    convictions: ["", "", ""],
    assessmentNotes: "",
    timeSinceOffense: "",
    timeSinceSentence: "",
    position: "",
    jobDuties: "",
    fitnessImpact: "",
    reconsideration: "none", // 'none', 'notAllowed', 'allowed'
    reconsiderationProcess: "",
    preliminaryDecision: "", // Add this line
    employerTitle: "" // Add this line
  });
  const [isEditingFinalNotice, setIsEditingFinalNotice] = useState(false);

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [showWOTCCongratsModal, setShowWOTCCongratsModal] = useState(false);

  const [documents, setDocuments] = useState<Record<string, RequiredDocument>>({
    jobDescription: { type: "jobDescription", file: null, notes: "" },
    backgroundCheck: { type: "backgroundCheck", file: null, notes: "" },
    restorativeRecord: { type: "restorativeRecord", file: null, notes: "" },
  });

  const [showReassessmentReminder, setShowReassessmentReminder] = useState(false);

  const [reassessmentData, setReassessmentData] = useState({
    hasError: "",
    errorDescription: "",
    evidence: ["", "", "", ""],
    rescindReason: ""
  });

  const [showEEOCGuidanceModal, setShowEEOCGuidanceModal] = useState(false);

  const [showGreenFactorsModal, setShowGreenFactorsModal] = useState(false);
  const [showPDFViewerModal, setShowPDFViewerModal] = useState(false);
  const [greenFactorsAnalysis, setGreenFactorsAnalysis] = useState({
    natureAndGravity: "",
    timeElapsed: "",
    jobNature: "",
    jobDuties: "",
    essentialFunctions: "",
    workEnvironment: "",
    supervisionLevel: "",
    riskAssessment: ""
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFinalConfirmationModal, setShowFinalConfirmationModal] = useState(false);
  const [showGuidanceModal, setShowGuidanceModal] = useState(false);
  // Add state for showing the hire modal
  const [showHireModal, setShowHireModal] = useState(false);
  // Add state for showing the end-of-demo modal
  const [showEndOfDemoModal, setShowEndOfDemoModal] = useState(false);

  useEffect(() => {
    setDocuments({
      jobDescription: {
        type: "jobDescription",
        file: typeof window !== "undefined" ? new File([
          "Sample content for Entry Level Sales Associate Job Description"
        ], "Entry_Level_Sales_Associate_Job_Description.pdf", { type: "application/pdf" }) : null,
        notes: "",
      },
      backgroundCheck: {
        type: "backgroundCheck",
        file: typeof window !== "undefined" ? new File([
          "Sample content for Background Check Summary Jacobi Iverson"
        ], "Background_Check_Summary_Jacobi_Iverson.pdf", { type: "application/pdf" }) : null,
        notes: "",
      },
      restorativeRecord: {
        type: "restorativeRecord",
        file: typeof window !== "undefined" ? new File([
          "Sample content for Jacobi Iverson Restorative Record"
        ], "Jacobi Iverson Restorative Record (0) (1).pdf", { type: "application/pdf" }) : null,
        notes: "",
      },
    });
  }, []);

  const handleStepClick = (stepId: number) => {
    const previousStepsCompleted = steps
      .filter(step => step.id < stepId)
      .every(step => step.completed);

    if (!previousStepsCompleted) {
      toast({
        title: "Cannot Skip Steps",
        description: "Please complete the previous steps before proceeding.",
      });
      return;
    }

    if (stepId > 1 && hasConditionalOffer === "no") {
      setShowBlockingDialog(true);
      return;
    }

    setCurrentStep(stepId);
  };

  const handleNext = () => {
    if (currentStep === 1 && hasConditionalOffer === "no") {
      setShowEEOCGuidanceModal(true);
      return;
    }

    if (currentStep === 7) {
      setShowEndOfDemoModal(true);
      return;
    }

    setSteps(prev => prev.map(step => 
      step.id === currentStep ? { ...step, completed: true } : step
    ));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    setShowCompletionWarning(true);
  };

  const handleComplianceAcknowledge = () => {
    setShowCompletionWarning(false);
    setShowComplianceConfirmation(true);
  };

  const handleComplianceConfirm = () => {
    setShowComplianceConfirmation(false);
    setShowTimeframeDialog(true);
  };

  const handleTimeframeSubmit = () => {
    setShowTimeframeDialog(false);
    setShowFinalDialog(true);
  };

  const handleReturnToDashboard = () => {
    router.push("/");
  };

  const handleSendOfferLetter = () => {
    toast({
      title: "Conditional Offer Letter Sent",
      description: "The letter has been sent to the candidate. Please wait for their acknowledgment before proceeding with the background check.",
    });
    setShowOfferLetterDialog(false);
    setHasConditionalOffer("yes");
  };

  const handleProceedWithHire = () => {
    setShowWOTCModal(true);
  };

  const handleContinueToSigning = () => {
    setShowWOTCModal(false);
    setShowWOTCSigningScreen(true);
  };

  const handleSignAndSend = () => {
    toast({
      title: "Forms Signed and Sent",
      description: "The WOTC forms have been signed and sent for review.",
    });
    setShowWOTCCongratsModal(true);
  };

  const getLegalGuidance = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Iowa Code section 364.3(12)</h3>
            <p className="text-sm text-muted-foreground">
            To make any inquiry regarding, or to require any person to disclose or reveal, any convictions, arrests, or pending criminal charges during the application process, including but not limited to any interview. The application process shall begin when the applicant inquires about the employment being sought and shall end when an employer has extended a conditional offer of employment to the applicant. If the applicant voluntarily discloses any information regarding his or her criminal record at the interview, the employer may discuss the criminal record disclosed by the applicant.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Iowa Code section 364.3(12)</h3>
            <p className="text-sm text-muted-foreground mb-2">
               
            </p>
            
            <p className="text-sm text-muted-foreground">
              Handling Of Criminal Records: Employers shall comply with any obligations arising under federal or state law relating to authorization for background checks, notifying applicants about adverse hiring decisions based on an applicant's criminal record, and any other matters involving the use of criminal record information.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Employers can consider the following factors:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground">
              <li>the nature of the employment</li>
              <li>the place and manner in which the employment will be performed</li>
              <li>the nature and seriousness of the offense or conduct</li>
              <li>whether the employment presents an opportunity for the commission of a similar offense or conduct</li>
              <li>the length of time between the conviction or arrest and the application for employment (not including time on probation or parole or the time during which fines or other financial penalties or remedies may be outstanding)</li>
              <li>the number and types of convictions or pending charges</li>
              <li>any verifiable information provided by the applicant that is related to the applicant's rehabilitation or good conduct.</li>
            </ul>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">5-3-15 DEFINITIONS</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Rehabilitation Evidence</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Satisfactory compliance with parole/probation terms</li>
                  <li>• Post-conviction employer recommendations</li>
                  <li>• Educational achievements or vocational training</li>
                  <li>• Completion of/participation in rehabilitative treatment</li>
                  <li>• Letters of recommendation from qualified observers</li>
                  <li>• Age at time of conviction</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Voluntary Mitigating Factors</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Verifiable information provided by the applicant that is related to the applicant's rehabilitation or good conduct.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">5-3-15 (d)</h3>
            <p className="text-sm text-muted-foreground">
              
              Enforcement: Any complaint alleging a violation of this section shall be filed within the time provided in 5-3-10. Upon certification by the commission of an affirmative finding of probable cause that an employer has committed a violation of this section, the commission shall refer the complaint and probable cause finding to the city attorney for review, together with a recommendation as to the amount of a fine to be assessed. Upon determination that the complaint meets the requisite standard of proof, the city attorney shall issue a municipal infraction citation against the employer. A first offense shall be subject to a fine of up to seven hundred fifty dollars ($750.00), and a repeat offense within a period of three (3) years shall be subject to a fine of up to one thousand dollars ($1,000.00). Fines shall be payable to the complainant. For purposes of enforcing this section, the provisions of sections 5-3-10.D, 5-3-10.E, 5-3-10.F, 5-3-11, 5-3-12 and 5-3-13 shall not apply.
            </p>
          </div>
        );
    
      default:
        return (
          <div className="text-sm text-muted-foreground">
            No legal intelligence has been detected in our last scan for this step.
          </div>
        );
    }
  };

  const getCompanyPolicy = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Internal policy requires documented confirmation of conditional offer before accessing any conviction history information.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Company guidelines for evaluating conviction history emphasize consideration of only legally permissible information that directly relates to job duties.
            </p>
          </div>
        );
        case 5:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Invite and log mitigating materials during the ≥ 7‑business‑day pre‑adverse window: certificates, sobriety proof, references, completion of supervision, education, NA/AA letters. Weight evidence in line with Iowa Code section 364.3(12)(a) factors (training, job history, character refs).
            </p>
          </div>
        );
        case 6:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
            Pursuant to Ordinance No. 5522, we consider for employment qualified applicants with arrest and conviction records.
            </p>
          </div>
        );
        case 7:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
            Before taking adverse action such as failing/refusing to hire, discharging, or not promoting an individual based on a conviction history or unresolved arrest, we give the candidate an opportunity to present evidence that the information is inaccurate, that they have been rehabilitated, or other mitigating factors.
            </p>
          </div>
        );
        case 8:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
            We are committed to fair hiring practices that fully adheres to the The Iowa Supreme Court Case No. 20-0575
            </p>
          </div>
        );
        case 4:
          return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Record date of conviction and completion of sentence; calculate years elapsed. Highlight whether ≥ 7 yrs have passed (FCO safe‑harbor unless role supervises minors/dependent adults).
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If a candidate's background check reveals a criminal history, we use guidance from the Equal Employment Opportunity Commission (EEOC) recommendations based on the Green Factors, also called the "nature-time-nature" test, which considers:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>The nature and gravity of the offense</li>
              <li>The time elapsed since the offense</li>
              <li>The nature of the job being sought</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              The outcome of the nature-time-nature test is to determine if the offense and surrounding circumstances are so correlated as to negatively impact the candidate's ability to perform the specific role. If the candidate's past criminal history has no strong correlation to the role or our organization, then we may consider moving forward in the hiring process.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Upload docs in your compliance protocol compiler to view relevant company policies.
          </div>
        );
    }
  };

  const getCandidateContext = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Candidate received conditional offer on May 5, 2025.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Nature & Circumstances of the Offense</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Offense: Possession with Intent to Sell a Controlled Substance (Class B felony)</li>
              <li>• Jurisdiction & Disposition: Waterloo, IA; convicted 12 May 2018; indeterminate 1–9 year sentence</li>
              <li>• Custody Period: Served 4 years in state prison (Jun 2019 – Jun 2023)</li>
              <li>• Supervision: Paroled Jun 2023; completed all parole obligations May 2025</li>
              <li>• Conduct on Supervision: One curfew violation (Sep 2023) resulted in a formal warning; no sanctions or subsequent incidents</li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Job Duties & Responsibilities</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Prospect and qualify leads through cold calls, email outreach, and inbound inquiries</li>
              <li>• Conduct virtual or in-person product demonstrations and communicate clear value propositions</li>
              <li>• Log all interactions and sales activities in the company's CRM platform, ensuring accurate and up-to-date pipeline data</li>
              <li>• Collaborate cross-functionally with marketing and customer success to support a cohesive customer journey</li>
            </ul>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Time Elapsed Since Offense & Completion of Sentence</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Conviction Date to Present: ~ 7 years (86 months)</li>
              <li>• Release to Present: ~ 23 months</li>
              <li>• Completion of Supervision to Present: &lt; 1 month (fully resolved)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              The substantial passage of time and successful completion of supervision signal reduced recidivism risk under established criminogenic‑need models.
            </p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Evidence of Rehabilitation & Good Conduct</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Recovery & Support</h4>
                <p className="text-sm text-muted-foreground">
                  • 18‑month verified sobriety; Narcotics Anonymous sponsor support
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Education</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• GED with honors</li>
                  <li>• A.A.S., Business Administration – Borough of Manhattan CC (CUNY)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Industry Credentials</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• OSHA 10‑Hour General Industry (Mar 2020)</li>
                  <li>• IA Dept. of Public Health – Food Handler Certificate (valid through Apr 2023)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Professional Development</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Self‑taught data analysis (Excel, SQL basics)</li>
                  <li>• Project management coursework</li>
                  <li>• Bilingual (English/Spanish)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Community Service</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reentry Coordinator, Osborne Association – founded 20‑student mentorship program for children of incarcerated parents</li>
                  <li>• Facilitator of restorative‑justice circles inside custody</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="text-sm text-muted-foreground">
            The candidate holds a Certificate of Rehabilitation—a court-issued order affirming that an individual convicted of a felony and previously incarcerated in state or local prison has demonstrated rehabilitation under the law.
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Confirm Conditional Offer</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="offer-yes"
                  name="conditional-offer"
                  checked={hasConditionalOffer === "yes"}
                  onChange={() => setHasConditionalOffer("yes")}
                  className="h-5 w-5 appearance-none rounded-full border-2 border-gray-400 bg-white checked:bg-cinnabar checked:border-cinnabar checked:ring-0 checked:ring-offset-0 focus:ring-0 focus:ring-offset-0 transition
                    before:content-[''] before:block before:w-3 before:h-3 before:rounded-full before:mx-auto before:my-auto before:bg-cinnabar before:opacity-0 checked:before:opacity-100"
                  style={{
                    boxShadow: "none",
                    outline: "none",
                    position: "relative",
                  }}
                />
                <label htmlFor="offer-yes" className="text-base font-poppins font-normal">Yes, a conditional offer has been extended</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="offer-no"
                  name="conditional-offer"
                  checked={hasConditionalOffer === "no"}
                  onChange={() => setHasConditionalOffer("no")}
                  className="h-5 w-5 appearance-none rounded-full border-2 border-gray-400 bg-white checked:bg-cinnabar checked:border-cinnabar checked:ring-0 checked:ring-offset-0 focus:ring-0 focus:ring-offset-0 transition
                    before:content-[''] before:block before:w-3 before:h-3 before:rounded-full before:mx-auto before:my-auto before:bg-cinnabar before:opacity-0 checked:before:opacity-100"
                  style={{
                    boxShadow: "none",
                    outline: "none",
                    position: "relative",
                  }}
                />
                <label htmlFor="offer-no" className="text-base font-poppins font-normal">No, a conditional offer has not been extended</label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Background Check</h2>
            <p className="text-muted-foreground">
              Indicate the type of background check result that applies to this candidate:
            </p>
            <div className="space-y-6">
              {/* ARREST */}
              <div className="flex items-start gap-4">
                <Checkbox
                  id="arrest"
                  checked={documentValidation.isArrest}
                  onCheckedChange={(checked) =>
                    setDocumentValidation(prev => ({ ...prev, isArrest: checked as boolean }))
                  }
                  className="h-6 w-6 border-2 border-gray-300 bg-white data-[state=checked]:bg-white data-[state=checked]:text-green-500 focus:ring-0 focus:ring-offset-0 transition"
                  style={{ borderColor: "#d1d5db" }}
                />
                <div>
                  <div className="text-base font-bold font-poppins leading-tight">
                    ARREST
                  </div>
                  <div className="text-base font-normal font-poppins text-muted-foreground mt-1">
                    The taking of a person into custody when and in the manner authorized by law or military authority due to an accusation or suspicion that the person committed a crime.
                  </div>
                </div>
              </div>
              {/* CONVICTION */}
              <div className="flex items-start gap-4">
                <Checkbox
                  id="conviction"
                  checked={documentValidation.isConviction}
                  onCheckedChange={(checked) =>
                    setDocumentValidation(prev => ({ ...prev, isConviction: checked as boolean }))
                  }
                  className="h-6 w-6 border-2 border-gray-300 bg-white data-[state=checked]:bg-white data-[state=checked]:text-green-500 focus:ring-0 focus:ring-offset-0 transition"
                  style={{ borderColor: "#d1d5db" }}
                />
                <div>
                  <div className="text-base font-bold font-poppins leading-tight">
                    CONVICTION
                  </div>
                  <div className="text-base font-normal font-poppins text-muted-foreground mt-1">
                    Any adjudication of guilt or sentence arising from a verdict or plea of guilty or no contest or the equivalent in relation to a crime, including a sentence of incarceration, a suspended sentence, a sentence of probation, a sentence of unconditional discharge, or a diversion program.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Legitimate Business Reason Analysis</h2>
            <p className="text-muted-foreground">
              Indicate which, if any, of the following legitimate business reasons apply to this candidate. For each, you may provide additional notes or explanation.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox id="legit-1" />
                <div>
                  <label htmlFor="legit-1" className="font-semibold">Direct and Substantial Bearing</label>
                  <p className="text-sm text-muted-foreground">
                    The nature of the criminal conduct has a direct and substantial bearing on the fitness or ability to perform the duties or responsibilities of the intended employment, considering:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground">
                    <li>Nature of the employment</li>
                    <li>Place and manner of employment</li>
                    <li>Nature and seriousness of the offense or conduct</li>
                    <li>Opportunity for similar offense or conduct</li>
                    <li>Length of time since conviction or arrest (excluding probation/parole/fines)</li>
                    <li>Number and types of convictions or pending charges</li>
                    <li>Verifiable information about rehabilitation or good conduct</li>
                  </ul>
                  <Textarea className="mt-2" placeholder="Notes or explanation (optional)" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="legit-2" />
                <div>
                  <label htmlFor="legit-2" className="font-semibold">Unreasonable Risk of Harm or Business Impact</label>
                  <p className="text-sm text-muted-foreground">
                    Granting employment would involve unreasonable risk of substantial harm to property, safety of individuals or the public, or to business reputation/assets, considering the factors above.
                  </p>
                  <Textarea className="mt-2" placeholder="Notes or explanation (optional)" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="legit-3" />
                <div>
                  <label htmlFor="legit-3" className="font-semibold">Vulnerable Populations</label>
                  <p className="text-sm text-muted-foreground">
                    Position involves working with children, developmentally disabled persons, or vulnerable adults, and the applicant has a conviction record of a crime against such individuals (e.g., rape, sexual abuse, assault, domestic violence, kidnapping, financial exploitation, neglect, abandonment, child endangerment).
                  </p>
                  <Textarea className="mt-2" placeholder="Notes or explanation (optional)" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="legit-4" />
                <div>
                  <label htmlFor="legit-4" className="font-semibold">Legal Requirement</label>
                  <p className="text-sm text-muted-foreground">
                    Employer must comply with federal or state law or regulation pertaining to background checks and the criminal conduct is relevant to the applicant's fitness for the job.
                  </p>
                  <Textarea className="mt-2" placeholder="Notes or explanation (optional)" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Time Elapsed Analysis</h2>
            <Select
              value={timeElapsed}
              onValueChange={setTimeElapsed}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select time elapsed since offense" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-7">3-7 years</SelectItem>
                <SelectItem value="more-than-7">More than 7 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Evidence of Rehabilitation</h2>
            <RadioGroup
              value={rehabilitation.hasEvidence === null ? "" : rehabilitation.hasEvidence.toString()}
              onValueChange={(value) => {
                const hasEvidence = value === "true";
                setRehabilitation(prev => ({ ...prev, hasEvidence }));
                if (!hasEvidence) {
                  setShowPDFViewerModal(true);
                }
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="evidence-yes" />
                  <Label htmlFor="evidence-yes">Yes, evidence was provided</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="evidence-no" />
                  <Label htmlFor="evidence-no">No evidence was provided</Label>
                </div>
              </div>
            </RadioGroup>

            <div>
              <Label>Rehabilitation Notes</Label>
              <Textarea
                value={rehabilitation.notes}
                onChange={(e) => setRehabilitation(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Document any evidence of rehabilitation or mitigating factors..."
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Assessment Summary</h2>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Job-relatedness</h3>
                <p>{jobRelation.isRelated ? "Directly related" : "Not directly related"}</p>
                {jobRelation.isRelated && (
                  <>
                    <p className="text-sm text-muted-foreground mt-2">Related duties:</p>
                    <ul className="list-disc pl-5">
                      {jobRelation.duties.map(duty => (
                        <li key={duty}>{duty}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Time Elapsed</h3>
                <p>{timeElapsed.replace("-", " to ")}</p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Rehabilitation Evidence</h3>
                <p>{rehabilitation.hasEvidence ? "Evidence provided" : "No evidence provided"}</p>
                {rehabilitation.notes && (
                  <p className="text-sm text-muted-foreground mt-2">{rehabilitation.notes}</p>
                )}
              </div>

              <div className="flex items-start space-x-3 mt-6">
                <Checkbox
                  id="certification"
                  checked={certificationChecked}
                  onCheckedChange={(checked) => setCertificationChecked(checked as boolean)}
                />
                <Label htmlFor="certification" className="text-sm">
                  I certify that this decision is in alignment with Iowa Code section 364.3(12)(a) and is based solely on legally permissible information.
                </Label>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Individualized Assessment</h2>
            <div className="rounded-lg border p-4 bg-muted">
              <h3 className="font-semibold mb-2">Notice of Intent to Take Adverse Action</h3>
              <p className="text-sm text-muted-foreground">
                You are about to conduct an individualized assessment using the Iowa Fair Chance Hiring Law framework.
              </p>
            </div>
            <Button
              onClick={() => setShowNoticeDialog(true)}
            >
              Preview & Send Notice
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700 font-semibold w-full mt-4"
              onClick={() => setShowHireModal(true)}
            >
              Hire the Candidate
            </Button>
            <Dialog open={showHireModal} onOpenChange={setShowHireModal}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-green-700 text-2xl font-bold mb-2">Congratulations on Your Fair Chance Hire!</DialogTitle>
                  <DialogDescription className="space-y-4 pt-2">
                    <p>We have prefiled for you to receive Work Opportunity Tax Credits (WOTC) for hiring a candidate who has faced significant barriers to employment. We've also prefiled the paperwork for federal bonding—a type of business insurance. We will monitor hours worked to maximize your tax incentive.</p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-semibold mb-2">BENEFITS TO EMPLOYERS</h3>
                      <ul className="list-disc pl-6 text-sm text-green-900 space-y-2">
                        <li>The credit available ranges from $2,400 up to $9,600, depending on the targeted group and qualified wages paid to the new employee generally during the first year of employment.</li>
                        <li>Generally, the credit is 40% of qualified first-year wages for individuals who work 400+ hours in their first year of employment.</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                      <h3 className="font-semibold mb-2">The Federal Bonding Program (FBP)</h3>
                      <ul className="list-disc pl-6 text-sm text-blue-900 space-y-2">
                        <li>Employers can receive fidelity bonds free of charge when hiring certain job applicants.</li>
                        <li>The bonds reimburse the employer for any loss due to employee theft ($5,000 up to $25,000), and cover the first six months of employment at no cost to the job applicant or the employer ($0 deductible).</li>
                      </ul>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end mt-6">
                  <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => setShowHireModal(false)}>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );

      case 8:
        if (showWOTCSigningScreen) {
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">WOTC Tax Credit Details</h2>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
                  Tax Credit Value
                </h3>
                <p className="text-green-700 dark:text-green-400 text-lg">
                  You are eligible for <span className="font-bold">40% of first-year wages</span> (up to $6,000) if the person works at least 400 hours as part of a WOTC targeted group.
                </p>
              </div>

              <Card className="p-6 bg-secondary">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div className="space-y-3">
                    <h4 className="font-semibold">Policy Information</h4>
                    <p className="text-sm text-muted-foreground">
                      The Work Opportunity Tax Credit (WOTC) is a federal tax credit available to employers who invest in American job seekers who have consistently faced barriers to employment. Employers may meet their business needs and claim a tax credit if they hire an individual who is in a WOTC targeted group.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Employers must apply for and receive a certification verifying the new hire is a member of a targeted group before they can claim the tax credit. After the required certification is secured, taxable employers claim the WOTC as a general business credit against their income taxes, and tax-exempt employers claim the WOTC against their payroll taxes.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      WOTC is authorized until December 31, 2025 (Section 113 of Division EE of P.L. 116-260 -- Consolidated Appropriations Act, 2021).
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSignAndSend}>
                  SIGN & SEND FOR REVIEW
                </Button>
              </div>
          </div>
        );
        }

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Final Decision</h2>
            <div className="space-y-4">
              <Textarea
                placeholder="Provide final justification for the hiring decision..."
              />
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 ia-button-outline px-5 py-2 rounded-md text-base font-poppins"
                  onClick={handleProceedWithHire}
                >
                  Proceed with Hire
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 ia-button-primary bg-cinnabar text-white hover:bg-cinnabar-600 px-5 py-2 rounded-md text-base font-poppins"
                  onClick={() => setShowFinalNoticeDialog(true)}
                >
                  Take Adverse Action
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderOfferLetterContent = () => {
    return (
      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        <div className={!isEditingLetter ? "space-y-4" : "hidden"}>
          <p>{offerLetterData.date}</p>
          <p>RE: Conditional Job Offer & Notice of Intent to Conduct Background Check</p>
          <p>Dear {offerLetterData.applicantName || "[APPLICANT NAME]"},</p>
          <p>
            We are writing to make you a conditional offer of employment for the position of {offerLetterData.position || "[INSERT POSITION]"}. We are informing you that before this job offer becomes final, we will conduct a review of your criminal history background.
          </p>
          <p>We have good cause to conduct a review of criminal history for this position because:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              If we do not review the criminal history of applicants for this position, we will face a significant risk to our business operations or business reputation because {offerLetterData.businessRisk || "[explain the reasoning, i.e., the sensitive, serious, public, or critical nature of the business and job position, which requires the conduct of criminal background checks.]"}
              <br />
              <span className="text-sm text-muted-foreground">Los Angeles County Code Chapter 8.300.050. D</span>
            </li>
            <li>
              a review of criminal history is necessary for the position due to concerns regarding the safety of, or risk of harm or harassment to {offerLetterData.safetyRisk || "[identify the persons at risk, i.e, staff, employees, contractors, vendors, associates, clients, customers, minors, dependents, or persons 65 years or older, or the general public]"}
              <br />
              <span className="text-sm text-muted-foreground">Los Angeles County Code Chapter 8.300.050. D.6</span>
            </li>
          </ul>
          <p>In addition to your criminal history information, we will also be reviewing the following information, background or history as part of the overall background check process before your job offer becomes final:</p>
          <ul className="list-disc pl-5 space-y-2">
            {offerLetterData.additionalChecks && offerLetterData.additionalChecks.length > 0 ? (
              offerLetterData.additionalChecks.map((check, index) => (
                <li key={index}>{check || "______________________________________"}</li>
              ))
            ) : (
              <li>______________________________________</li>
            )}
          </ul>
          <div className="mt-6">
            <p>Sincerely,</p>
            <p>{offerLetterData.employerContact || "[EMPLOYER CONTACT]"}</p>
            <p>{offerLetterData.employer || "[EMPLOYER]"}</p>
            <p>{offerLetterData.employerAddress || "[EMPLOYER ADDRESS]"}</p>
            <p>{offerLetterData.contactPhone || "[CONTACT'S PHONE NUMBER]"}</p>
            <p>{offerLetterData.contactEmail || "[CONTACT'S EMAIL]"}</p>
          </div>
        </div>
        <div className={isEditingLetter ? "space-y-4" : "hidden"}>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={offerLetterData.date}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="applicantName">Applicant Name</Label>
            <Input
              id="applicantName"
              value={offerLetterData.applicantName}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, applicantName: e.target.value }))}
              placeholder="Enter applicant name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={offerLetterData.position}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, position: e.target.value }))}
              placeholder="Enter position title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessRisk">Business Risk Explanation</Label>
            <Textarea
              id="businessRisk"
              value={offerLetterData.businessRisk}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, businessRisk: e.target.value }))}
              placeholder="Explain the reasoning for conducting criminal background checks"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="safetyRisk">Safety Risk Explanation</Label>
            <Textarea
              id="safetyRisk"
              value={offerLetterData.safetyRisk}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, safetyRisk: e.target.value }))}
              placeholder="Identify the persons at risk"
            />
          </div>
          <div className="space-y-2">
            <Label>Additional Background Checks</Label>
            {offerLetterData.additionalChecks && offerLetterData.additionalChecks.map((check, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={check}
                  onChange={(e) => {
                    const newChecks = [...(offerLetterData.additionalChecks || [])];
                    newChecks[index] = e.target.value;
                    setOfferLetterData(prev => ({ ...prev, additionalChecks: newChecks }));
                  }}
                  placeholder="Enter additional check"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newChecks = (offerLetterData.additionalChecks || []).filter((_, i) => i !== index);
                    setOfferLetterData(prev => ({ ...prev, additionalChecks: newChecks }));
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setOfferLetterData(prev => ({
                ...prev,
                additionalChecks: [...(prev.additionalChecks || []), ""]
              }))}
            >
              Add Check
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="employerContact">Employer Contact</Label>
            <Input
              id="employerContact"
              value={offerLetterData.employerContact}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, employerContact: e.target.value }))}
              placeholder="Enter employer contact name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employer">Employer</Label>
            <Input
              id="employer"
              value={offerLetterData.employer}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, employer: e.target.value }))}
              placeholder="Enter employer name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employerAddress">Employer Address</Label>
            <Textarea
              id="employerAddress"
              value={offerLetterData.employerAddress}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, employerAddress: e.target.value }))}
              placeholder="Enter employer address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              value={offerLetterData.contactPhone}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, contactPhone: e.target.value }))}
              placeholder="Enter contact phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              value={offerLetterData.contactEmail}
              onChange={(e) => setOfferLetterData(prev => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="Enter contact email"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderNoticeContent = () => {
    return (
      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        <div className={!isEditingNotice ? "space-y-4" : "hidden"}>
          <p>{noticeData.date}</p>
          <p className="font-semibold">RE: Preliminary Notice of Adverse Action</p>
          <p>Dear {noticeData.applicantName || "[APPLICANT/EMPLOYEE NAME]"},</p>
          
          <p>After reviewing the results of your criminal background check, we have made a preliminary (nonfinal) decision to take the following action:</p>
          
          <p>{noticeData.preliminaryDecision || "[Identify the preliminary decision for adverse action, i.e., withdrawal of conditional job offer, denial of promotion, discharge, transfer or discipline. Example: 'We intend to withdraw our conditional job offer for the position of [JOB POSITION]'; or, 'We intend to deny your promotion to the position of [JOB POSITION].']"}</p>
          
          <p>This decision was based on the following convictions or unresolved arrests:</p>
          
          <ul className="list-disc pl-5">
            {noticeData.convictions.map((conviction, idx) => (
              <li key={idx}>{conviction || "____________________________________"}</li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="font-semibold">Individualized Assessment Information</h3>
            <p>{noticeData.individualizedAssessment.generalExplanation}</p>
            
            <p className="mt-4">The individual's showing may include information that he was not correctly identified in the criminal record, or that the record is otherwise inaccurate. Other relevant individualized evidence includes, for example:</p>
            
            <ul className="list-disc pl-5 mt-2">
              {noticeData.individualizedAssessment.additionalInfo.map((info, idx) => (
                <li key={idx}>{info}</li>
              ))}
            </ul>
            
            <p className="mt-4">{noticeData.individualizedAssessment.noResponseNote}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold">YOUR RIGHT TO RESPOND TO THIS PRELIMINARY NOTICE AND IMPORTANT DEADLINES:</h3>
            
            <p>You may respond to this Preliminary Notice before our decision becomes final.</p>
            
            <p>You have FIVE (5) BUSINESS DAYS from the receipt of this Preliminary Notice to do one of the following:</p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Submit a written Response to this Preliminary Notice containing:
                <ul className="list-disc pl-5 mt-1">
                  <li>Information challenging the accuracy of the criminal background check report or other criminal history information; and/or</li>
                  <li>Evidence of rehabilitation or mitigating circumstances.</li>
                </ul>
              </li>
              <li>Submit a written request to extend the deadline to submit your Response for TEN (10) ADDITIONAL BUSINESS DAYS, affirming that you need additional time to gather or obtain relevant information, evidence and/or documents for your Response.</li>
              <li>Notify us that you will NOT be submitting a written Response but are instead electing to present evidence of rehabilitation or mitigating circumstances orally, via in-person, virtual or telephone contact. The meeting will take place within ten (10) Business Days of your request.</li>
            </ol>
            
            <p className="mt-4 font-semibold">NOTE: If you do not take any of the above actions within FIVE (5) BUSINESS DAYS from the receipt of this Preliminary Notice, the decision contained in this Preliminary Notice will become final.</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold">CONTACT INFO: Please send your Response, requests for extension, submissions and/or any additional information you would like us to consider to:</h3>
            
            <p>{noticeData.contactInfo.name || "[INSERT NAME AND MAILING ADDRESS, EMAIL ADDRESS]"}</p>
          </div>
          
          <div className="mt-6">
            <p>Sincerely,</p>
            <p>{noticeData.employerName || "[EMPLOYER COMPANY NAME]"}</p>
            <p>{noticeData.employerContact || "[H.R CONTACT NAME]"}</p>
            <p>{noticeData.employerAddress || "[EMPLOYER ADDRESS]"}</p>
            <p>{noticeData.employerEmail || "[CONTACT'S EMAIL]"}</p>
            <p>{noticeData.employerPhone || "[CONTACT'S PHONE NUMBER]"}</p>
          </div>
        </div>
        
        <div className={isEditingNotice ? "space-y-4" : "hidden"}>
          {/* Existing form fields */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={noticeData.date}
              onChange={(e) => setNoticeData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="applicantName">Applicant/Employee Name</Label>
            <Input
              id="applicantName"
              value={noticeData.applicantName}
              onChange={(e) => setNoticeData(prev => ({ ...prev, applicantName: e.target.value }))}
              placeholder="Enter applicant/employee name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={noticeData.position}
              onChange={(e) => setNoticeData(prev => ({ ...prev, position: e.target.value }))}
              placeholder="Enter position"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preliminaryDecision">Preliminary Decision</Label>
            <Textarea
              id="preliminaryDecision"
              value={noticeData.preliminaryDecision}
              onChange={(e) => setNoticeData(prev => ({ ...prev, preliminaryDecision: e.target.value }))}
              placeholder="Describe the preliminary decision"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Convictions or Unresolved Arrests</Label>
            {noticeData.convictions.map((conviction, idx) => (
              <Input
                key={idx}
                value={conviction}
                onChange={e => setNoticeData(prev => {
                  const convictions = [...prev.convictions];
                  convictions[idx] = e.target.value;
                  return { ...prev, convictions };
                })}
                placeholder={`Conviction ${idx + 1}`}
              />
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="generalExplanation">Individualized Assessment Explanation</Label>
            <Textarea
              id="generalExplanation"
              value={noticeData.individualizedAssessment.generalExplanation}
              onChange={(e) => setNoticeData(prev => ({
                ...prev,
                individualizedAssessment: {
                  ...prev.individualizedAssessment,
                  generalExplanation: e.target.value
                }
              }))}
              placeholder="Enter the general explanation for individualized assessment"
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Information Points</Label>
            {noticeData.individualizedAssessment.additionalInfo.map((info, idx) => (
              <Input
                key={idx}
                value={info}
                onChange={e => setNoticeData(prev => {
                  const additionalInfo = [...prev.individualizedAssessment.additionalInfo];
                  additionalInfo[idx] = e.target.value;
                  return {
                    ...prev,
                    individualizedAssessment: {
                      ...prev.individualizedAssessment,
                      additionalInfo
                    }
                  };
                })}
                placeholder={`Additional information point ${idx + 1}`}
              />
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="noResponseNote">No Response Note</Label>
            <Textarea
              id="noResponseNote"
              value={noticeData.individualizedAssessment.noResponseNote}
              onChange={(e) => setNoticeData(prev => ({
                ...prev,
                individualizedAssessment: {
                  ...prev.individualizedAssessment,
                  noResponseNote: e.target.value
                }
              }))}
              placeholder="Enter the note about no response"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employerName">Employer Company Name</Label>
            <Input
              id="employerName"
              value={noticeData.employerName}
              onChange={(e) => setNoticeData(prev => ({ ...prev, employerName: e.target.value }))}
              placeholder="Enter employer company name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employerContact">H.R Contact Name</Label>
            <Input
              id="employerContact"
              value={noticeData.employerContact}
              onChange={(e) => setNoticeData(prev => ({ ...prev, employerContact: e.target.value }))}
              placeholder="Enter H.R contact name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employerAddress">Employer Address</Label>
            <Input
              id="employerAddress"
              value={noticeData.employerAddress}
              onChange={(e) => setNoticeData(prev => ({ ...prev, employerAddress: e.target.value }))}
              placeholder="Enter employer address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employerEmail">Contact's Email</Label>
            <Input
              id="employerEmail"
              type="email"
              value={noticeData.employerEmail}
              onChange={(e) => setNoticeData(prev => ({ ...prev, employerEmail: e.target.value }))}
              placeholder="Enter contact's email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employerPhone">Contact's Phone Number</Label>
            <Input
              id="employerPhone"
              value={noticeData.employerPhone}
              onChange={(e) => setNoticeData(prev => ({ ...prev, employerPhone: e.target.value }))}
              placeholder="Enter contact's phone number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfoName">Response Contact Name</Label>
            <Input
              id="contactInfoName"
              value={noticeData.contactInfo.name}
              onChange={(e) => setNoticeData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, name: e.target.value }
              }))}
              placeholder="Enter response contact name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfoMailingAddress">Response Contact Mailing Address</Label>
            <Input
              id="contactInfoMailingAddress"
              value={noticeData.contactInfo.mailingAddress}
              onChange={(e) => setNoticeData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, mailingAddress: e.target.value }
              }))}
              placeholder="Enter response contact mailing address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfoEmail">Response Contact Email</Label>
            <Input
              id="contactInfoEmail"
              type="email"
              value={noticeData.contactInfo.emailAddress}
              onChange={(e) => setNoticeData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, emailAddress: e.target.value }
              }))}
              placeholder="Enter response contact email"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFinalNoticeContent = () => {
    return (
      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        <div className={!isEditingFinalNotice ? "space-y-4" : "hidden"}>
          <p>{finalNoticeData.date}</p>
          <p className="font-semibold">RE: Final Notice of Adverse Action</p>
          <p>Dear {finalNoticeData.applicantName || "[CANDIDATE NAME]"}:</p>
          <p>
            On {finalNoticeData.initialNoticeDate || "[DATE]"} we sent you a Preliminary Notice of Adverse Action, informing you of our preliminary decision to {finalNoticeData.preliminaryDecision || "[Identify the adverse action, i.e., withdraw job offer, deny promotion, termination, discipline, etc.]"}. This letter is to notify you that this decision is now final, as follows:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={finalNoticeData.responseReceived === 'noResponse'}
                onCheckedChange={() => setFinalNoticeData(prev => ({ ...prev, responseReceived: 'noResponse' }))}
              />
              <span>We did not receive a timely response from you after sending you the Preliminary Notice of Adverse Action, and therefore, our decision to {finalNoticeData.preliminaryDecision || "[identify the adverse action]"} is now final.</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={finalNoticeData.responseReceived === 'infoSubmitted'}
                onCheckedChange={() => setFinalNoticeData(prev => ({ ...prev, responseReceived: 'infoSubmitted' }))}
              />
              <span>We made a final decision to {finalNoticeData.preliminaryDecision || "[identify the adverse action]"}, after considering the information, documents and/or records you submitted in response to the Preliminary Notice of Adverse Action, and conducting a Second Individualized Assessment. A copy of the Second Individualized Assessment is enclosed.</span>
            </div>
          </div>
          <p className="font-semibold mt-4">Our final decision is based on the following criminal history:</p>
          <p>Conviction or Unresolved Arrest & Date</p>
          <ol className="list-decimal pl-5">
            {finalNoticeData.convictions.map((conv, idx) => (
              <li key={idx}>{conv || <span className="text-muted-foreground">[LIST CONVICTION(S) THAT LED TO DECISION]</span>}</li>
            ))}
          </ol>
          <p className="font-semibold mt-4">Request for Reconsideration with Employer (Please check one):</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={finalNoticeData.reconsideration === 'notAllowed'}
                onCheckedChange={() => setFinalNoticeData(prev => ({ ...prev, reconsideration: 'notAllowed' }))}
              />
              <span>Unfortunately, we do not offer any other internal procedure to challenge or request reconsideration of this final decision.</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={finalNoticeData.reconsideration === 'allowed'}
                onCheckedChange={() => setFinalNoticeData(prev => ({ ...prev, reconsideration: 'allowed' }))}
              />
              <span>We do offer a way for you to challenge or request reconsideration of this final decision with us as follows: {finalNoticeData.reconsiderationProcess || "[describe internal procedure]"}</span>
            </div>
          </div>
          <p className="font-semibold mt-4">Your Right to File a Fair Chance Complaint with the County of Los Angeles and/or State</p>
          <p className="font-semibold">County of Los Angeles:</p>
          <p>If you believe your rights under the County's Fair Chance Ordinance for Employers have been violated during this process, you have the right to file a complaint with the Los Angeles County Department of Consumer & Business Affairs - Office of Labor Equity, as follows:</p>
          <p>Online: Fair Chance Ordinance for Employers – Consumer & Business</p>
          <p>Phone: 800.593.8222</p>
          <p>Email: FairChance@dcba.lacounty.gov</p>
          <p className="font-semibold mt-4">State:</p>
          <p>If you believe your rights under California's Fair Chance Act have been violated during this process, you have the right to file a complaint with the State's Civil Rights Department (CRD). Information regarding how to file a complaint can be found on the following CRD link: <a href="https://calcivilrights.ca.gov/complaintprocess/how-to-file-a-complaint/" target="_blank" rel="noopener noreferrer">https://calcivilrights.ca.gov/complaintprocess/how-to-file-a-complaint/</a></p>
          <div className="mt-6">
            <p>Sincerely,</p>
            <p>{finalNoticeData.employerContact || "[CONTACT NAME]"}</p>
            <p>{finalNoticeData.employerTitle || "[CONTACT JOB TITLE]"}</p>
          </div>
        </div>
        <div className={isEditingFinalNotice ? "space-y-4" : "hidden"}>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={finalNoticeData.date}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="applicantName">Candidate Name</Label>
            <Input
              id="applicantName"
              value={finalNoticeData.applicantName}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, applicantName: e.target.value }))}
              placeholder="Enter candidate name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialNoticeDate">Initial Notice Date</Label>
            <Input
              id="initialNoticeDate"
              type="date"
              value={finalNoticeData.initialNoticeDate}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, initialNoticeDate: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preliminaryDecision">Preliminary Decision</Label>
            <Input
              id="preliminaryDecision"
              value={finalNoticeData.preliminaryDecision}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, preliminaryDecision: e.target.value }))}
              placeholder="Enter preliminary decision"
            />
          </div>
          <div className="space-y-2">
            <Label>Convictions</Label>
            {finalNoticeData.convictions.map((conviction, index) => (
              <Input
                key={index}
                value={conviction}
                onChange={e => {
                  const newConvictions = [...finalNoticeData.convictions];
                  newConvictions[index] = e.target.value;
                  setFinalNoticeData(prev => ({ ...prev, convictions: newConvictions }));
                }}
                placeholder={`Enter conviction ${index + 1}`}
              />
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reconsiderationProcess">Internal Procedure for Reconsideration</Label>
            <Textarea
              id="reconsiderationProcess"
              value={finalNoticeData.reconsiderationProcess}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, reconsiderationProcess: e.target.value }))}
              placeholder="Describe internal procedure for reconsideration"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employerContact">Contact Name</Label>
            <Input
              id="employerContact"
              value={finalNoticeData.employerContact}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, employerContact: e.target.value }))}
              placeholder="Enter contact name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employerTitle">Contact Job Title</Label>
            <Input
              id="employerTitle"
              value={finalNoticeData.employerTitle}
              onChange={e => setFinalNoticeData(prev => ({ ...prev, employerTitle: e.target.value }))}
              placeholder="Enter contact job title"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/3 border-r p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* RezMe Logo */}
            <div className="flex items-center mb-6">
              <Image
                src="/rezme-logo.png"
                alt="rézme logo"
                width={160}
                height={48}
                priority
                className="ml-2 mt-2"
                style={{ maxWidth: 200, maxHeight: 60, width: "auto", height: "auto" }}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Assessment Progress</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  className={`w-full p-3 rounded-lg border ${
                    currentStep === step.id ? "bg-secondary" : ""
                  } transition-colors hover:bg-secondary/50`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className="flex items-center gap-2">
                    {step.completed ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border" />
                    )}
                    <span className={step.completed ? "text-muted-foreground" : ""}>
                      {step.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-6">
            {/* Removing the Assessment Steps card */}
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  className="ia-button-outline px-5 py-2 rounded-md text-base font-poppins"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep !== 8 && (
                  <Button
                    className="ia-button-primary bg-cinnabar text-white hover:bg-cinnabar-600 px-5 py-2 rounded-md text-base font-poppins"
                    onClick={currentStep === 8 ? handleComplete : handleNext}
                    disabled={
                      (currentStep === 1 && !hasConditionalOffer) ||
                      (currentStep === 6 && !certificationChecked)
                    }
                  >
                    {currentStep === 8 ? "Complete" : (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
          </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <h3 className="font-semibold">Critical Information</h3>
              </div>
              
              {/* Tabs with Cinnabar accent for selected, light Cinnabar for unselected */}
              <Tabs defaultValue="policy" className="w-full">
                <TabsList className="w-full flex bg-transparent mb-0 p-0 rounded-none border-0 shadow-none justify-start gap-4">
                  <TabsTrigger
                    value="legal"
                    className={`font-poppins text-base px-8 py-3 rounded-t-xl font-semibold
                      data-[state=active]:bg-cinnabar data-[state=active]:text-white
                      data-[state=inactive]:bg-[#ffeceb] data-[state=inactive]:text-cinnabar
                      border-0 shadow-none outline-none transition-none
                    `}
                    style={{ zIndex: 2 }}
                  >
                    Legal
                  </TabsTrigger>
                  <TabsTrigger
                    value="policy"
                    className={`font-poppins text-base px-8 py-3 rounded-t-xl font-semibold
                      data-[state=active]:bg-cinnabar data-[state=active]:text-white
                      data-[state=inactive]:bg-[#ffeceb] data-[state=inactive]:text-cinnabar
                      border-0 shadow-none outline-none transition-none
                    `}
                    style={{ zIndex: 1 }}
                  >
                    Company Policy
                  </TabsTrigger>
                  <TabsTrigger
                    value="context"
                    className={`font-poppins text-base px-8 py-3 rounded-t-xl font-semibold
                      data-[state=active]:bg-cinnabar data-[state=active]:text-white
                      data-[state=inactive]:bg-[#ffeceb] data-[state=inactive]:text-cinnabar
                      border-0 shadow-none outline-none transition-none
                    `}
                    style={{ zIndex: 0 }}
                  >
                    Candidate Context
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="legal" className="pt-8 p-4 border rounded-b-lg border-t-0 -mt-2">
                  {getLegalGuidance()}
                </TabsContent>
                <TabsContent value="policy" className="pt-8 p-4 border rounded-b-lg border-t-0 -mt-2">
                  {getCompanyPolicy()}
                </TabsContent>
                <TabsContent value="context" className="pt-8 p-4 border rounded-b-lg border-t-0 -mt-2">
                  {getCandidateContext()}
                </TabsContent>
              </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={showOfferLetterDialog} onOpenChange={setShowOfferLetterDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Conditional Offer Letter</DialogTitle>
            <DialogDescription>
              Review and send the conditional offer letter to proceed with the background check.
            </DialogDescription>
          </DialogHeader>
          
          {renderOfferLetterContent()}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditingLetter(!isEditingLetter)}
            >
              {isEditingLetter ? (
                <>Preview Letter</>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Letter
                </>
              )}
            </Button>
            <Button
              className="ia-button-primary bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={handleSendOfferLetter}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Offer Letter
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNoticeDialog} onOpenChange={setShowNoticeDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Notice of Preliminary Decision</DialogTitle>
            <DialogDescription>
              Review and send the notice of preliminary decision to revoke job offer.
            </DialogDescription>
          </DialogHeader>
          
          {renderNoticeContent()}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditingNotice(!isEditingNotice)}
            >
              {isEditingNotice ? (
                <>Preview Notice</>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Notice
                </>
              )}
            </Button>
            <Button
              className="ia-button-primary bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => {
                toast({
                  title: "Notice Sent",
                  description: "The candidate has been notified and has 7 days to respond.",
                });
                setShowNoticeDialog(false);
                setShowSuccessModal(true); // Show success modal instead of directly showing reassessment reminder
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Notice
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showFinalNoticeDialog} onOpenChange={setShowFinalNoticeDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Final Notice of Decision</DialogTitle>
            <DialogDescription>
              Review and send the final notice of decision to revoke job offer.
            </DialogDescription>
          </DialogHeader>
          
          {renderFinalNoticeContent()}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditingFinalNotice(!isEditingFinalNotice)}
            >
              {isEditingFinalNotice ? (
                <>Preview Notice</>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Notice
                </>
              )}
            </Button>
            <Button
              className="ia-button-primary bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => {
                toast({
                  title: "Final Notice Sent",
                  description: "The final notice has been sent to the candidate.",
                });
                setShowFinalNoticeDialog(false);
                setShowCompleteModal(true);
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Final Notice
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompletionWarning} onOpenChange={setShowCompletionWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Important Notice</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>
                Before taking adverse action such as failing/refusing to hire, discharging, or not promoting an individual based on a conviction history or unresolved arrest, you must give the individual an opportunity to present evidence that:
                           </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The information is inaccurate</li>
                <li>The individual has been rehabilitated</li>
                <li>There are other mitigating factors</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                This follows procedures outlined in Police Code Section 4909 or L.E.C. Article 142.4
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleComplianceAcknowledge}>I Understand</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showComplianceConfirmation} onOpenChange={setShowComplianceConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compliance Acknowledgment</DialogTitle>
            <DialogDescription className="space-y-4">
              <p className="text-sm">
                SEC. 4909. IMPLEMENTATION AND ENFORCEMENT OF EMPLOYMENT PROVISIONS.
                (a) Administrative Enforcement.
                (1) With regard to the employment provisions of this Article 49, the OLSE is authorized to take appropriate steps to enforce this Article and coordinate enforcement, including the investigation of any possible violations of this Article. Where the OLSE has reason to believe that a violation has occurred, it may order any appropriate temporary or interim relief to mitigate the violation or maintain the status quo pending completion of a full investigation or hearing. The OLSE shall not find a violation based on an Employer's decision that an applicant or employee's Conviction History is Directly Related, but otherwise may find a violation of this Article, including if the Employer failed to conduct the individualized assessment as required under Section 4904(f).
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="compliance"
                  checked={complianceAcknowledged}
                  onCheckedChange={(checked) => setComplianceAcknowledged(checked as boolean)}
                />
                <Label htmlFor="compliance">
                  I acknowledge and understand these requirements
                </Label>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleComplianceConfirm} disabled={!complianceAcknowledged}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTimeframeDialog} onOpenChange={setShowTimeframeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Additional Evidence Opportunity</DialogTitle>
            <DialogDescription>
              Would you like to give the candidate another chance to provide evidence or dispute the information in the criminal background report?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup
              value={giveAnotherChance === null ? "" : giveAnotherChance.toString()}
              onValueChange={(value) => setGiveAnotherChance(value === "true")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>

            {giveAnotherChance && (
              <div className="space-y-2">
                <Label>Response Timeframe (in business days)</Label>
                <Input
                  type="number"
                  min="1"
                  value={responseTimeframe}
                  onChange={(e) => setResponseTimeframe(e.target.value)}
                  placeholder="Enter number of days"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleTimeframeSubmit} disabled={giveAnotherChance === null || (giveAnotherChance && !responseTimeframe)}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showFinalDialog} onOpenChange={setShowFinalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assessment Complete</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>
                Congratulations! You have completed the Fair Chance assessment process.
                {giveAnotherChance && (
                  <>
                    <br /><br />
                    If the candidate does not respond within {responseTimeframe} business days, your decision will be final and all documentation will be stored for future compliance audits.
                  </>
                )}
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleReturnToDashboard}>
              Return to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showWOTCModal} onOpenChange={setShowWOTCModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Congratulations on Your Fair Chance Hire!</DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <p>Based on your Fair Chance Hiring Protocol, WE applied for WOTC, by following these steps:</p>
              
              <div className="space-y-2">
                <p>✓ Pre-Screening: Checked that the candidate qualifies for the WOTC.</p>
                
                <p>WE auto filled out the two required forms:</p>
                <ul className="list-disc pl-6">
                  <li>The Individual Characteristics Form (ETA 9061)</li>
                  <li>The Pre-Screening Notice and Certification Request (IRS Form 8850)</li>
                </ul>

                <ul className="space-y-2 mt-4">
                  <li>• You can sign the necessary forms with the person applying for the job on the next screen.</li>
                  <li>• Forms have been automatically filed and sent online to the Work Opportunity Tax Credit Online (eWOTC) system.</li>
                  <li>• Digital Forms were also downloaded and sent by mail to the EDD.</li>
                  <li>• Forms are automatically sent within 28 days of the person starting the job.</li>
                  <li>• Since the person qualifies as a long-term unemployed recipient, we'll include the Self-Attestation Form (ETA Form 9175) from them.</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button onClick={handleContinueToSigning}>
              Continue to Signing Forms
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompleteModal} onOpenChange={setShowCompleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assessment Complete</DialogTitle>
            <DialogDescription>
              You have completed the Fair Chance assessment process. Click Complete to finalize.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => { setShowCompleteModal(false); handleComplete(); }}>
              Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showWOTCCongratsModal} onOpenChange={setShowWOTCCongratsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              Through our integration with your HRIS, we will track your employee's hours and eligibility for the maximum tax credit return. All compliance steps have been recorded and securely stored for audit purposes for three years.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => { setShowWOTCCongratsModal(false); router.push("/"); }}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reassessment Reminder Dialog */}
      <Dialog open={showReassessmentReminder} onOpenChange={setShowReassessmentReminder}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4 border-b">
            <DialogTitle>Second Individualized Assessment</DialogTitle>
          </DialogHeader>
          <DialogDescription className="pt-4">
            <div className="space-y-6 text-gray-700 text-base">
              <p>
                You've indicated an intent to revoke this offer based on criminal history. We have stored your initial assessment of the candidate during the necessary individualized assessment of an applicant's criminal history that you conducted.
              </p>
              
              <p>
                Per compliance requirements, the candidate shall have at least five (5) business days to respond to the preliminary notice of adverse action before the employer can make a final decision.
              </p>

              <p>Within the 5-day period, if the individual notifies the employer in writing that they:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>dispute the accuracy of the criminal history information and is taking steps to obtain evidence supporting that assertion, or</li>
                <li>needs additional time to obtain written evidence of rehabilitation or mitigating circumstances, the individual will be provided at least ten (10) additional business days;</li>
              </ol>

              <p>In lieu of submission of any written materials, upon request, and employer shall provide the applicant or employee with an opportunity present evidence of rehabilitation or mitigating circumstance orally to the employer, via in-person, virtual, or telephone contact.</p>

              <p>When this information is provided by the candidate, your system will be updated with this content and you can perform a second individualized assessment, documented in writing, assessing the same factors contained in the initial individualized assessment.</p>

              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">FAIR CHANCE ORDINANCE FOR EMPLOYERS</h3>
                <p>County Code Section 8.300 et. seq.</p>
                <h3 className="font-semibold text-gray-900">SECOND INDIVIDUALIZED ASSESSMENT FORM</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employerName">Employer Name</Label>
                    <Input id="employerName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="applicantName">Applicant/Employee Name</Label>
                    <Input id="applicantName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="position">Position Applied For/Under Review</Label>
                    <Input id="position" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="conditionalOfferDate">Date of Conditional Job Offer</Label>
                    <Input id="conditionalOfferDate" type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="initialAssessmentDate">Date of Initial Individualized Assessment</Label>
                    <Input id="initialAssessmentDate" type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="secondAssessmentDate">Date of Second Individualized Assessment</Label>
                    <Input id="secondAssessmentDate" type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="assessor">Second Individualized Assessment Performed by</Label>
                    <Input id="assessor" className="mt-1" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900">SECTION 1. DOCUMENTS, RECORDS AND INFORMATION PROVIDED BY THE APPLICANT OR EMPLOYEE IN RESPONSE TO PRELIMINARY NOTICE OF ADVERSE ACTION</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">A. CRIMINAL HISTORY INFORMATION</h4>
                      <p className="text-sm text-muted-foreground">List any documents or records provided by the applicant or employee disputing the accuracy of the criminal background check report or criminal history information, and/or providing an explanation regarding criminal history:</p>
                      
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                          <Label>Name/Title of Document or Record</Label>
                          <Input className="mt-1" />
                        </div>
                        <div>
                          <Label>Date of Document or Record</Label>
                          <Input type="date" className="mt-1" />
                        </div>
                        <div>
                          <Label>Description of Error or Explanation</Label>
                          <Textarea className="mt-1" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold">B. EVIDENCE OF REHABILITATION OR MITIGATING CIRCUMSTANCES</h4>
                      <p className="text-sm text-muted-foreground">Name/Title of Document, Record or Information Evidencing Rehabilitation or Mitigating Circumstances:</p>
                      
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <Label>Document {num}</Label>
                            <Input className="mt-1" />
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input type="date" className="mt-1" />
                          </div>
                          <div>
                            <Label>Description/Explanation</Label>
                            <Textarea className="mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">SECTION 2. SECOND INDIVIDUALIZED ASSESSMENT - FACTORS</h3>
                    <p className="text-sm text-muted-foreground">INSTRUCTIONS: For each Conviction or Unresolved Arrest that was the basis for the Employer's Preliminary Notice of Adverse Action, reassess whether the individual's Criminal History has a direct, adverse and negative bearing on their ability to perform the duties or responsibilities of the position, by taking into account the information, documents and/or records provided by the applicant or employee as identified in SECTION 1.</p>

                    <div className="space-y-4">
                      <div>
                        <Label>Conviction or Unresolved Arrest</Label>
                        <Input className="mt-1" />
                      </div>
                      <div>
                        <Label>Date of Conviction or Unresolved Arrest</Label>
                        <Input type="date" className="mt-1" />
                      </div>

                      <div>
                        <Label>1. The seriousness and type of criminal conduct</Label>
                        <p className="text-sm text-muted-foreground">Factors may include: the individual's specific personal conduct, whether the harm was to property or people; the level or degree of injury or loss; the permanence of the harm; the person's age when the conduct occurred; the context in which the offense occurred</p>
                        <Textarea className="mt-1" />
                      </div>

                      <div>
                        <Label>2. The time that has passed since the criminal conduct and/or completion of the sentence</Label>
                        <p className="text-sm text-muted-foreground">Factors may include: the amount of time that has passed since the conduct/incident underlying the conviction, and/or the amount of time that has passed since the person's release from incarceration</p>
                        <Textarea className="mt-1" />
                      </div>

                      <div>
                        <Label>3. The nature of the job sought or held by the applicant or employee</Label>
                        <div className="space-y-2">
                          <Label>A. List the specific duties and responsibilities of the job position</Label>
                          <Textarea className="mt-1" />
                          
                          <Label>B. Assess the likelihood of a recurrence in the job position</Label>
                          <p className="text-sm text-muted-foreground">Factors may include: Whether the job offers the opportunity for the same or a similar offense to occur; whether circumstances leading to the conduct for which the person was convicted or that is the subject of an unresolved arrest will recur in the job; whether the context in which the conviction occurred is likely to arise in the workplace; whether the type or degree of harm that resulted from the conviction is likely to occur in the workplace.</p>
                          <Textarea className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label>4. List any relevant work experience or job training of the applicant or employee following the criminal conduct</Label>
                        <Textarea className="mt-1" />
                      </div>

                      <div>
                        <Label>5. List any other relevant Section 1 information or documentation provided by the applicant or employee in response to the Preliminary Notice of Adverse Action that was considered for the Employer's Second Individualized Assessment</Label>
                        <Textarea className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">SECTION 3. Final Determination</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="optionA" />
                        <div>
                          <Label htmlFor="optionA">Option A: (Criminal History has no direct, adverse and negative bearing on job position)</Label>
                          <p className="text-sm text-muted-foreground">Based on the Second Individualized Assessment, the criminal history information does not have a direct, adverse and negative bearing on the individual's ability to perform the duties or responsibilities necessarily related to the job position</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="optionB" />
                        <div>
                          <Label htmlFor="optionB">Option B: (Final Decision to Rescind Conditional Job offer or Take Adverse Action)</Label>
                          <p className="text-sm text-muted-foreground">Based on the Second Individualized Assessment, the Employer has determined that the criminal history information has a direct, adverse and negative bearing on the individual's ability to perform the duties or responsibilities necessarily related to the job position such that it justifies a final decision to rescind the conditional job offer or take adverse action for the following reasons:</p>
                        </div>
                      </div>

                      <div>
                        <Label>Explain the link between the specific aspects of the individual's criminal history with risks inherent in the duties or responsibilities of the job position</Label>
                        <Textarea className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    320W. TempleSt.,Room G-10 • LosAngeles,CA,90012-2706 • toll-free800.593.82.22 • fax 13.687.1137
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
          <div className="flex justify-end gap-3 mt-6 sticky bottom-0 bg-background pt-4 border-t">
            <Button variant="outline" onClick={() => setShowReassessmentReminder(false)}>
              Save Draft
            </Button>
            <Button onClick={() => { setShowReassessmentReminder(false); handleNext(); }}>
              Complete Reassessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add the new EEOC Guidance Modal */}
      <Dialog open={showEEOCGuidanceModal} onOpenChange={setShowEEOCGuidanceModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cinnabar mb-4">Iowa Fair Chance Law: Application Process Guidance</DialogTitle>
            <DialogDescription className="space-y-6">
              <div className="bg-[#fff5f5] p-6 rounded-lg border border-[#ffeceb]">
                <p className="text-lg leading-relaxed mb-6">
                  To make any inquiry regarding, or to require any person to disclose or reveal, any convictions, arrests, or pending criminal charges during the application process, including but not limited to any interview. The application process shall begin when the applicant inquires about the employment being sought and shall end when an employer has extended a conditional offer of employment to the applicant. If the applicant voluntarily discloses any information regarding his or her criminal record at the interview, the employer may discuss the criminal record disclosed by the applicant.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => {
                setShowEEOCGuidanceModal(false);
                setSteps(prev => prev.map(step => 
                  step.id === currentStep ? { ...step, completed: true } : step
                ));
                setCurrentStep(prev => prev + 1);
              }}
            >
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showGreenFactorsModal} onOpenChange={setShowGreenFactorsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cinnabar mb-4">Green Factors Analysis</DialogTitle>
            <DialogDescription className="space-y-6">
              <div className="bg-[#fff5f5] p-6 rounded-lg border border-[#ffeceb] mb-6">
                <p className="text-lg leading-relaxed">
                  Absent a validation study that meets the Uniform Guidelines' standards, the Green factors provide the starting point for analyzing how specific criminal conduct may be linked to particular positions. The three Green factors are:
                </p>
                <ul className="list-decimal pl-6 mt-4 space-y-2">
                  <li>The nature and gravity of the offense or conduct;</li>
                  <li>The time that has passed since the offense, conduct and/or completion of the sentence; and</li>
                  <li>The nature of the job held or sought.</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">a. The Nature and Gravity of the Offense or Conduct</h3>
                  <p className="text-muted-foreground mb-4">
                    Careful consideration of the nature and gravity of the offense or conduct is the first step in determining whether a specific crime may be relevant to concerns about risks in a particular position. The nature of the offense or conduct may be assessed with reference to the harm caused by the crime (e.g., theft causes property loss). The legal elements of a crime also may be instructive.
                  </p>
                  <Textarea
                    value={greenFactorsAnalysis.natureAndGravity}
                    onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, natureAndGravity: e.target.value }))}
                    placeholder="Describe the nature and gravity of the offense..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">b. The Time that Has Passed Since the Offense</h3>
                  <p className="text-muted-foreground mb-4">
                    Employer policies typically specify the duration of a criminal conduct exclusion. While the Green court did not endorse a specific timeframe for criminal conduct exclusions, it did acknowledge that permanent exclusions from all employment based on any and all offenses were not consistent with the business necessity standard.
                  </p>
                  <Textarea
                    value={greenFactorsAnalysis.timeElapsed}
                    onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, timeElapsed: e.target.value }))}
                    placeholder="Describe the time elapsed since the offense..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">c. The Nature of the Job Held or Sought</h3>
                  <p className="text-muted-foreground mb-4">
                    Identify the particular job(s) subject to the exclusion, including the nature of the job's duties, essential functions, circumstances under which the job is performed, and the environment in which the job's duties are performed.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Job Duties</Label>
                      <Textarea
                        value={greenFactorsAnalysis.jobDuties}
                        onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, jobDuties: e.target.value }))}
                        placeholder="Describe the job duties..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label>Essential Functions</Label>
                      <Textarea
                        value={greenFactorsAnalysis.essentialFunctions}
                        onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, essentialFunctions: e.target.value }))}
                        placeholder="List the essential functions of the position..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label>Work Environment</Label>
                      <Textarea
                        value={greenFactorsAnalysis.workEnvironment}
                        onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, workEnvironment: e.target.value }))}
                        placeholder="Describe the work environment..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label>Level of Supervision</Label>
                      <Textarea
                        value={greenFactorsAnalysis.supervisionLevel}
                        onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, supervisionLevel: e.target.value }))}
                        placeholder="Describe the level of supervision..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label>Risk Assessment</Label>
                      <Textarea
                        value={greenFactorsAnalysis.riskAssessment}
                        onChange={(e) => setGreenFactorsAnalysis(prev => ({ ...prev, riskAssessment: e.target.value }))}
                        placeholder="Assess the risks and their relationship to the position..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowGreenFactorsModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => {
                setShowGreenFactorsModal(false);
                handleNext();
              }}
            >
              Complete Analysis
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPDFViewerModal} onOpenChange={setShowPDFViewerModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cinnabar mb-4">Candidate Response for Rehabilitative Evidence</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[70vh] overflow-hidden rounded-lg border">
            <iframe
              src="/Rehab%20Evidence.pdf"
              className="w-full h-full"
              title="Candidate Response for Rehabilitative Evidence"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              className="bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => setShowPDFViewerModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">Success!</DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <p className="text-lg leading-relaxed">
                  You have successfully followed the requirements of <span className="font-bold">Iowa Code section 364.3(12)(a)</span> and made a fair chance hiring decision by:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Conducting an individualized assessment</li>
                  <li>Providing the candidate with a preliminary notice</li>
                  <li>Allowing the candidate time to respond with additional information</li>
                  <li>Following the proper notification procedures</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  The candidate has been notified and has 7 days to respond with any additional information or evidence of rehabilitation.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  (This process is also consistent with EEOC fair chance hiring guidance.)
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                setShowSuccessModal(false);
                setShowFinalConfirmationModal(true); // Show final confirmation instead of reassessment reminder
              }}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showFinalConfirmationModal} onOpenChange={setShowFinalConfirmationModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confidentiality Statement</DialogTitle>
            <DialogDescription className="space-y-6 pt-4">
              <div className="bg-white p-6 rounded-lg border">
                <p className="text-lg leading-relaxed mb-8">
                  Keep information about applicants' and employees' criminal records confidential. Only use it for the purpose for which it was intended.
                </p>
                
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground mb-2">Approved by the Commission:</p>
                  <div className="flex flex-col items-end space-y-4">
                    <div className="w-48 border-t border-gray-400"></div>
                    <p className="text-sm">Chair Jacqueline A. Berrien</p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              className="bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => {
                setShowFinalConfirmationModal(false);
                router.push("/"); // Return to dashboard
              }}
            >
              Complete Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add the new Guidance Modal */}
      <Dialog open={showGuidanceModal} onOpenChange={setShowGuidanceModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-2xl font-bold text-cinnabar mb-4">Iowa Fair Chance Hiring Law Best Practices Guidance</DialogTitle>
          <DialogDescription className="space-y-6">
            <div className="bg-[#fff5f5] p-6 rounded-lg border border-[#ffeceb]">
              <p className="text-lg leading-relaxed mb-6">
                The Iowa Fair Chance Hiring Law provides that an employer may not ask about an applicant's criminal history until after a conditional job offer has been made. The law also requires that an employer consider the applicant's criminal history in a manner that is consistent with the applicant's qualifications for the position.
              </p>
              <div className="border-l-4 border-cinnabar pl-4">
                <p className="text-lg leading-relaxed">
                  As a best practice, and consistent with applicable laws, the Commission recommends that employers not ask about convictions on job applications and that, if and when they make such inquiries, the inquiries be limited to convictions for which exclusion would be job related for the position in question and consistent with business necessity.
                </p>
              </div>
            </div>
          </DialogDescription>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="bg-cinnabar text-white hover:bg-cinnabar-600"
              onClick={() => {
                setShowGuidanceModal(false);
                setSteps(prev => prev.map(step => 
                  step.id === currentStep ? { ...step, completed: true } : step
                ));
                setCurrentStep(prev => prev + 1);
              }}
            >
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* End of Demo Modal */}
      <Dialog open={showEndOfDemoModal} onOpenChange={setShowEndOfDemoModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cinnabar mb-2">End of Demo</DialogTitle>
            <DialogDescription className="space-y-4 pt-2">
              <p className="text-lg leading-relaxed">
                This is the end of the demo experience. To unlock more features or request customizations for your organization, please reach out to our team.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-6">
            <Button className="bg-cinnabar text-white hover:bg-cinnabar-600" onClick={() => setShowEndOfDemoModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}