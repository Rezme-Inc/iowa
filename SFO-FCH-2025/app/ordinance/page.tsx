"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrdinancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-poppins p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Button 
          variant="ghost" 
          className="mb-4 ia-button-outline text-gray35 font-poppins"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-8 bg-card text-card-foreground border border-border shadow-sm rounded-lg">
          <div className="max-w-none font-poppins">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">CALIFORNIA CODE OF REGULATIONS</h1>
            
            <div className="mb-6">
              <p className="ia-text text-gray35 text-base">
                Title 2. Administration<br />
                Div. 4.1. Department of Fair Employment & Housing<br />
                Chapter 5. Fair Employment & Housing Council<br />
                Subchapter 2. Discrimination in Employment<br />
                Article 2. Particular Employment Practices
              </p>
            </div>

            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">§ 11017. Employee Selection.</h2>
              
              <p className="ia-text mb-4 text-gray35 text-base">
                (a) Selection and Testing. Any policy or practice of an employer or other covered entity that has an adverse impact on employment opportunities of individuals on a basis enumerated in the Act is unlawful unless the policy or practice is job-related and consistent with business necessity (business necessity is defined in section 11010 (b). The Council herein adopts the Uniform Guidelines on Employee Selection Procedures promulgated by various federal agencies, including the EEOC and Department of Labor. [29 C.F.R. 1607 (1978)].
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (b) Placement. Placements that are less desirable in terms of location, hours or other working conditions are unlawful where such assignments segregate, or otherwise discriminate against individuals on a basis enumerated in the Act, unless otherwise made pursuant to a permissible defense to employment discrimination. An assignment labeled or otherwise deemed to be "protective" of a category of persons on a basis enumerated in the Act is unlawful unless made pursuant to a permissible defense. (See also section 11041 regarding permissible transfers on account of pregnancy by employees not covered under Title VII of the federal Civil Rights Act of 1964.)
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (c) Promotion and Transfer. An employer or other covered entity shall not restrict information on promotion and transfer opportunities to certain employees or classes of employees when the restriction has the effect of discriminating on a basis enumerated in the Act.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (1) Requests for Transfer or Promotion. An employer or other covered entity who considers bids or other requests for promotion or transfer shall do so in a manner that does not discriminate against individuals on a basis enumerated in the Act, unless pursuant to a permissible defense.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (2) Training. Where training that may make an employee eligible for promotion and/or transfer is made available, it shall be made available in a manner that does not discriminate against individuals on a basis enumerated in the Act.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (3) No-Transfer Policies. Where an employment practice has operated in the past to segregate employees on a basis enumerated in the Act, a no-transfer policy or other practice that has the effect of maintaining a continued segregated pattern is unlawful.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (d) Specific Practices.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (1) Criminal Records. See Section 11017.1
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (2) Height Standards. Height standards that discriminate on a basis enumerated in the Act shall not be used by an employer or other covered entity to deny an individual an employment benefit, unless pursuant to a permissible defense.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (3) Weight Standards. Weight standards that discriminate on a basis enumerated in the Act shall not be used by an employer or other covered entity to deny an individual an employment benefit, unless pursuant to a permissible defense.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (e) Permissible Selection Devices. A testing device or other means of selection that is facially neutral, but that has an adverse impact (as defined in the Uniform Guidelines on Employee Selection Procedures (29 C.F.R. 1607 (1978)) upon persons on a basis enumerated in the Act, is permissible only upon a showing that the selection practice is job-related and consistent with business necessity (business necessity is defined in section 11010(b)).
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                Note: Authority cited: Section 12935(a), Government Code. Reference: Sections 12920, 12921, 12940, and 12941, Government Code.
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">§ 11017.1. Consideration of Criminal History in Employment Decisions</h2>

              <p className="ia-text mb-4 text-gray35 text-base">
                (a) Introduction. Employers and other covered entities ("employers" for purposes of this section) in California are explicitly prohibited under other state laws from utilizing certain enumerated criminal records and information (hereinafter "criminal history") in hiring, promotion, training, discipline, lay-off, termination, and other employment decisions as outlined in subsection (b) below. Employers are prohibited under the Act from utilizing other forms of criminal history in employment decisions if doing so would have an adverse impact on individuals on a basis enumerated in the Act that the employer cannot prove is job-related and consistent with business necessity or if the employee or applicant has demonstrated a less discriminatory alternative means of achieving the specific business necessity as effectively.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (b) Criminal History Information Employers Are Prohibited from Seeking or Considering, Irrespective of Adverse Impact. Except if otherwise specifically permitted by law, employers are prohibited from considering the following types of criminal history, or seeking such history from the employee, applicant or a third party, when making employment decisions such as hiring, promotion, training, discipline, lay-off and termination:
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (1) An arrest or detention that did not result in conviction (Labor Code section 432.7);
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (2) Referral to or participation in a pretrial or post-trial diversion program (Id.);
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (3) A conviction that has been judicially dismissed or ordered sealed, expunged or statutorily eradicated pursuant to law (e.g., juvenile offense records sealed pursuant to Welfare and Institutions Code section 389 and Penal Code sections 851.7 or 1203.45) (Id.);
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (4) An arrest, detention, processing, diversion, supervision, adjudication, or court disposition that occurred while a person was subject to the process and jurisdiction of juvenile court law (Id.); and
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (5) A non-felony conviction for possession of marijuana that is two or more years old (Labor Code section 432.8).
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (c) Additional Criminal History Limitations, Irrespective of Adverse Impact.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (1) State or local agency employers are prohibited from asking applicants for employment to disclose information concerning their conviction history, including on an employment application, until the employer has determined that the applicant meets the minimum employment qualifications as stated in the notice for the position (Labor Code section 432.9).
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (2) Employers may also be subject to local laws or city ordinances that provide additional limitations. For example, in addition to the criminal history outlined in subsection (b), San Francisco employers are prohibited from considering a conviction or any other determination or adjudication in the juvenile justice system; offenses other than a felony or misdemeanor, such as an infraction (other than driving record infractions if driving is more than a de minimis element of the job position); and convictions that are more than seven years old (unless the position being considered supervises minors, dependent adults, or persons 65 years or older) (Article 49, San Francisco Police Code).
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (3) Employers that obtain investigative consumer reports such as background checks are also subject to the requirements of the Fair Credit Reporting Act (15 U.S.C. § 1681 et seq.) and the California Investigative Consumer Reporting Agencies Act (Civil Code section 1786 et seq.).
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (d) Consideration of Other Criminal Convictions and the Potential Adverse Impact. Consideration of other forms of criminal convictions, not enumerated above, may have an adverse impact on individuals on a basis protected by the Act, including, but not limited to, gender, race, and national origin. An applicant or employee bears the burden of demonstrating that the policy of considering criminal convictions has an adverse impact on a basis enumerated in the Act. For purposes of such a determination, adverse impact is defined at Sections 11017 and 11010 and the Uniform Guidelines on Employee Selection and Procedures (29 C.F.R. 1607 (1978)) incorporated by reference in Section 11017(a) and (e). As used in this section, "adverse impact" has the same meaning as "disparate impact" as used and defined in the Equal Employment Opportunity Commission's Consideration of Arrest and Conviction Records in Employment Decisions Under Title VII of the Civil Rights Act of 1964 (Apr. 2012). The applicant(s) or employee(s) bears the burden of proving an adverse impact. An adverse impact may be established through the use of conviction statistics or by offering any other evidence that establishes an adverse impact. State- or national-level statistics showing substantial disparities in the conviction records of one or more categories enumerated in the Act are presumptively sufficient to establish an adverse impact. This presumption may be rebutted by a showing that there is a reason to expect a markedly different result after accounting for any particularized circumstances such as the geographic area encompassed by the applicant or employee pool, the particular types of convictions being considered, or the particular job at issue.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (e) Establishing "Job-Related and Consistent with Business Necessity."
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (1) If the policy or practice of considering criminal convictions creates an adverse impact on applicants or employees on a basis enumerated in the Act, the burden shifts to the employer to establish that the policy is nonetheless justifiable because it is job-related and consistent with business necessity. The criminal conviction consideration policy or practice needs to bear a demonstrable relationship to successful performance on the job and in the workplace and measure the person's fitness for the specific position(s), not merely to evaluate the person in the abstract. In order to establish job-relatedness and business necessity, any employer must demonstrate that the policy or practice is appropriately tailored, taking into account at least the following factors:
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (A) The nature and gravity of the offense or conduct;
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (B) The time that has passed since the offense or conduct and/or completion of the sentence; and
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (C) The nature of the job held or sought.
              </p>

            <p className="ia-text mb-4 text-gray35 text-base">
                (2) Demonstrating that a policy or practice of considering conviction history in employment decisions is appropriately tailored to the job for which it is used as an evaluation factor requires that an employer either:
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (A) Demonstrate that any "bright-line" conviction disqualification or consideration (that is, one that does not consider individualized circumstances) can properly distinguish between applicants or employees that do and do not pose an unacceptable level of risk and that the convictions being used to disqualify, or otherwise adversely impact the status of the employee or applicant, have a direct and specific negative bearing on the person's ability to perform the duties or responsibilities necessarily related to the employment position. Bright-line conviction disqualification or consideration policies or practices that include conviction related-information that is seven or more years old are subject to a rebuttable presumption that they are not sufficiently tailored to meet the job-related and consistent with business necessity affirmative defense (except if justified by subsection (f) below); or
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (B) Conduct an individualized assessment of the circumstances and qualifications of the applicants or employees excluded by the conviction screen. An individualized assessment must involve notice to the adversely impacted employees or applicants (before any adverse action is taken) that they have been screened out because of a criminal conviction; a reasonable opportunity for the individuals to demonstrate that the exclusion should not be applied due to their particular circumstances; and consideration by the employer as to whether the additional information provided by the individuals or otherwise obtained by the employer warrants an exception to the exclusion and shows that the policy as applied to the employees or applicants is not job-related and consistent with business necessity.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (3) Regardless of whether an employer utilizes a bright line policy or conducts individualized assessments, before an employer may take an adverse action such as declining to hire, discharging, laying off, or declining to promote an adversely impacted individual based on conviction history obtained by a source other than the applicant or employee (e.g. through a credit report or internally generated research), the employer must give the impacted individual notice of the disqualifying conviction and a reasonable opportunity to present evidence that the information is factually inaccurate. If the applicant or employee establishes that the record is factually inaccurate, then that record cannot be considered in the employment decision.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (f) Compliance with Federal or State Laws, Regulations, or Licensing Requirements Permitting or Requiring Consideration of Criminal History. In some instances, employers are subject to federal or state laws or regulations that prohibit individuals with certain criminal records from holding particular positions or occupations or mandate a screening process employers are required or permitted to utilize before employing individuals in such positions or occupations (e.g., 21 U.S.C. § 830(e)(1)(G); Labor Code sections 432.7, 432.9). Examples include, but are not limited to, government agencies employing individuals as peace officers, employers employing individuals at health facilities where they will have regular access to patients, and employers employing individuals at health facilities or pharmacies where they will have access to medication or controlled substances. Some federal and state laws and regulations make criminal history a determining factor in eligibility for occupational licenses (e.g., 49 U.S.C. § 31310). Compliance with federal or state laws or regulations that mandate particular criminal history screening processes, or requiring that an employee or applicant possess or obtain any required occupational licenses constitute rebuttable defenses to an adverse impact claim under the Act.
              </p>

              <p className="ia-text mb-4 text-gray35 text-base">
                (g) Less Discriminatory Alternatives. If an employer demonstrates that its policy or practice of considering conviction history is job-related and consistent with business necessity, adversely impacted employees or applicants may still prevail under the Act if they can demonstrate that there is a less discriminatory policy or practice that serves the employer's goals as effectively as the challenged policy or practice, such as a more narrowly targeted list of convictions or another form of inquiry that evaluates job qualification or risk as accurately without significantly increasing the cost or burden on the employer.
              </p>

            <p className="ia-text mb-4 text-gray35 text-base">
                (h) Disparate Treatment. As in other contexts, the Act prohibits employers from treating applicants or employees differently in the course of considering criminal conviction history if the disparate treatment is substantially motivated by a basis enumerated in the Act.
              </p>

              <div className="mt-8 pt-4 border-t border-border">
                <p className="ia-text text-gray35 text-sm">
                  Note: Authority Cited: Section 12935(a), Government Code. Reference: Sections 12920, 12921, and 12940, Government Code; Title 12, Section 1829, United States Code; Title 21, Section 830, United States Code; Harris v. City of Santa Monica (2013) 56 Cal.4th 203; Griggs v. Duke Power Co. (1971) 401 U.S. 424; Watson v. Fort Worth Bank and Trust (1988) 487 U.S. 977; Dothard v. Rawlinson (1977) 433 U.S. 321; Green v. Missouri Pac. R.R. Co. (8th Cir. 1975) 523 F.2d 1290; El v. SEPTA (3d Cir. 2007) 479 F.3d 232; Guerrero v. California Department of Corrections and Rehabilitation (N.D. Cal. 2015) 119 F.Supp.3d 1065; Rankin v. Longs Drug Stores California, Inc. (2009) 196 Cal.App.4th 1246; Equal Emp't Opportunity Comm'n, Consideration of Arrest and Conviction Records in Employment Decisions Under Title VII of the Civil Rights Act of 1964 (Apr. 2012).
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}