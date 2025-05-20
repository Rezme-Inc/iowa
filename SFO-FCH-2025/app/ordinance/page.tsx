"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function OrdinancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-poppins p-0">
      <div className="mx-auto max-w-4xl px-8 py-8">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 text-cinnabar hover:text-cinnabar-600"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-foreground">
            Los Angeles Fair Chance Initiative for Hiring Ordinance
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            L.A. Cnty. Code § 8.300.050 et seq
          </h2>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8.300.050 Fair Chance Process in Hiring and Employment Decisions
              </h2>

              <div className="space-y-4">
                <p className="text-gray35">
                  A. Unless legally required, conducting a criminal background check or inquiry regarding the Criminal History information of an Applicant or Employee in connection with hiring or continued employment is voluntary for an Employer.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">B. Job Postings and Announcements</h3>
                  <p className="text-gray35">
                    Employers shall not prevent or discourage Applicants or Employees with Criminal History to apply or respond to job solicitations, postings, announcements and advertisements, including with regard to the following:
                  </p>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray35">
                      In all job solicitations, bulletins, postings, announcements and advertisements, an Employer will include language stating that qualified Applicants with arrest or Conviction records will be considered for Employment in accordance with the Los Angeles County Fair Chance Ordinance for Employers and the California Fair Chance Act.
                    </li>
                    <li className="text-gray35">
                      Employers will not include statements in job solicitations, bulletins, postings, announcements, and advertisements that no persons with Criminal History will be considered for hire or should not apply to the Employment position and will not include phrases such as "No Felons," or "No Convictions." An Employer may include language such as or similar to: "Background Check Required," but is prohibited from including phrases such as "Must Have Clean Background" or "Must Pass Background Check." Nothing in this Paragraph prohibits an Employer from stating that a law or regulation limits or prohibits the hiring of individuals with certain specified Criminal History, consistent with Paragraph 3 below.
                    </li>
                    <li className="text-gray35">
                      If the Employer is required by local, State or federal law or regulation to restrict or prohibit the hiring of individuals with certain specified Criminal History for the job position, the Employer must specify in all job solicitations, bulletins, postings, announcements, and advertisements, any and all such laws or regulations that impose restrictions or prohibitions for Employment due to Criminal History.
                    </li>
                    <li className="text-gray35">
                      If the Employer intends to conduct a review of an Applicant's or Employee's Criminal History in connection with a Conditional Offer of Employment, the Employer must include in any job solicitations, bulletins, postings, announcements, or advertisements, a list of all material job duties of the specific job position which the Employer reasonably believes that Criminal History may have a direct, adverse and negative relationship potentially resulting in the withdrawal of the Conditional Offer of Employment.
                    </li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">C. Prohibited Inquiries Prior to Conditional Offer of Employment</h3>
                  <p className="text-gray35">
                    Unless legally required to do so, Employers are prohibited from making an inquiry regarding Criminal History prior to extending an Applicant or Employee a Conditional Offer of Employment, including but not limited to, during the application and interview process, as follows:
                  </p>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray35">
                      An Employer will not by any means, inquire about, consider, disseminate, distribute or require disclosure of an Applicant's or Employee's Criminal History.
                    </li>
                    <li className="text-gray35">
                      Employers will not encourage, ask, or make opportunities for Applicants or Employees to voluntarily disclose information about their Criminal History.
                    </li>
                    <li className="text-gray35">
                      An Employer will not end a job interview or reject an application based on Criminal History information that was prematurely provided by the Applicant or Employee, or learned from any other source.
                    </li>
                    <li className="text-gray35">
                      Employers will not end a job interview or reject an application because the Applicant or Employee did not provide Criminal History information.
                    </li>
                    <li className="text-gray35">
                      Employers who violate the prohibition on inquiring regarding Criminal History prior to making a Conditional Offer of Employment may not use an Applicant or Employee's failure to disclose Criminal History, refusal to answer a question regarding Criminal History, or provision of incomplete or inaccurate information regarding Criminal History in response to the Employer's prohibited inquiry as a basis for a subsequent Adverse Action following a Conditional Offer of Employment, including denying the Applicant or Employee the Employment position or withdrawing, rescinding and/or cancelling a Conditional Offer of Employment.
                    </li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">D. Notice of Intent to Conduct Background Check</h3>
                  <p className="text-gray35">
                    In connection with a Conditional Offer of Employment, if the Employer intends to conduct a review of an Applicant's or Employee's Criminal History information, the Employer must provide notice in writing to the Applicant or Employee that includes the following:
                  </p>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray35">
                      A statement that the Conditional Offer of Employment is contingent upon the review of the individual's Criminal History.
                    </li>
                    <li className="text-gray35">
                      A statement that the Employer has good cause to conduct a review of Criminal History for the specific job position with supporting justification provided in writing. A general statement that the Employer is performing a review of Criminal History due to "safety concerns" without more supporting justification is not sufficient to meet this requirement. An Employer establishes good cause if it can demonstrate any of the following:
                      <ol className="list-[lower-alpha] pl-6 mt-2 space-y-2">
                        <li className="text-gray35">
                          The Employer faces a significant risk to its business operations or business reputation unless a review of Criminal History is conducted for the specific job position; or
                        </li>
                        <li className="text-gray35">
                          A review of Criminal History is necessary for the specific job position due to articulable concerns regarding the safety of, or risk of harm or harassment to, the Employer's staff, Employees, contractors, vendors, associates, clients, customers, or the general public.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">G. Initial Individualized Assessment</h3>
                  <p className="text-gray35">
                    If an Employer intends to deny an Applicant or Employee a position of Employment, rescind a Conditional Offer of Employment made to an Applicant, or take any other Adverse Action against an Employee, solely or in part because of the Applicant's or Employee's Criminal History, the Employer must first conduct an Initial Individualized Assessment that is documented in writing, of whether the Applicant's or Employee's Criminal History has a direct, adverse and negative bearing on the Applicant's or Employee's ability to perform the duties or responsibilities necessarily related to the applied-for position, such that it justifies denying the Applicant or Employee the Employment position or justifies taking an Adverse Action against an Employee.
                  </p>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray35">
                      The Initial Individualized Assessment must include at a minimum, consideration of the following factors:
                      <ol className="list-[lower-alpha] pl-6 mt-2 space-y-2">
                        <li className="text-gray35">
                          The nature and gravity of the offense or conduct, including but not limited to, consideration of whether the harm was to property or people, the degree or severity of the harm or offense, the age of the Applicant or Employee when the conduct occurred, and the permanence of the harm or offense;
                        </li>
                        <li className="text-gray35">
                          The time that has passed since the offense or conduct and /or completion of the sentence;
                        </li>
                        <li className="text-gray35">
                          The nature of the Employment position sought or held, including consideration of the specific duties of the job, whether the Employment position offers the opportunity for the same or a similar offense to occur, and whether circumstances leading to the conduct for which the person was convicted or that is the subject of an Unresolved Arrest will recur in the Employment position; and
                        </li>
                        <li className="text-gray35">
                          If the Applicant or Employee voluntarily provides to the Employer any Evidence of Rehabilitation or Mitigating Circumstances before or during the Initial Individualized Assessment, that evidence must also be considered as part of the Initial Individualized Assessment.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8.300.130 Operative Date
              </h2>
              <p className="text-gray35">
                The provisions set out in this chapter shall become operative at 12:01 a.m., on September 3, 2024.
              </p>
            </section>

            <div className="mt-8 pt-4 border-t border-border">
              <p className="text-gray35 text-sm">
                S:\Ordinances\County Counsel\2024\2024-0012
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}