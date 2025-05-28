"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrdinancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-poppins p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6 text-cinnabar" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Iowa Fair Chance Hiring Law
          </h1>
        </div>

        {/* Main Content */}
        <Card className="bg-background text-foreground border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Scale className="h-6 w-6 text-cinnabar" />
              Ordinance 5522 and Iowa Code Section 364.3(12)(a)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Definitions Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Definitions</h2>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">ADVERSE HIRING DECISION</h3>
                  <p className="text-sm text-muted-foreground">
                    A refusal to hire an applicant or the revocation of a conditional offer of employment to an applicant.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">APPLICANT</h3>
                  <p className="text-sm text-muted-foreground">
                    Any person considered or who requests to be considered for employment by an employer.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">ARREST</h3>
                  <p className="text-sm text-muted-foreground">
                    The taking of a person into custody when and in the manner authorized by law or military authority due to an accusation or suspicion that the person committed a crime.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">CONVICTION</h3>
                  <p className="text-sm text-muted-foreground">
                    Any adjudication of guilt or sentence arising from a verdict or plea of guilty or no contest or the equivalent in relation to a crime, including a sentence of incarceration, a suspended sentence, a sentence of probation, a sentence of unconditional discharge, or a diversion program.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">CRIMINAL RECORD</h3>
                  <p className="text-sm text-muted-foreground">
                    Information regarding a conviction, arrest or pending criminal charge.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">EMPLOYER</h3>
                  <p className="text-sm text-muted-foreground">
                    Any person, partnership, company, corporation, labor organization or association which regularly employs four (4) or more persons within the City of Waterloo, including the City of Waterloo, its departments, boards, commissions and agencies, except:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                    <li>The United States or any of its political subdivisions</li>
                    <li>The State of Iowa or any of its political subdivisions other than the City of Waterloo, such as, but not limited to, Black Hawk County, the Waterloo Community School District, and Hawkeye Community College</li>
                    <li>Employers who are required by federal or state law or regulation to make an inquiry on an application or in an interview</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">EMPLOYMENT</h3>
                  <p className="text-sm text-muted-foreground">
                    Any occupation, vocation, job, work for pay or employment, including temporary or seasonal work, contracted work, contingent work and work through the services of a temporary or other employment agency; or any form of vocational or educational training with or without pay.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">INQUIRY</h3>
                  <p className="text-sm text-muted-foreground">
                    Any direct or indirect conduct intended to gather information, using any mode of communication, including but not limited to a box or blank that seeks to elicit information about an applicant's criminal record on an employment application form.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">INTERVIEW</h3>
                  <p className="text-sm text-muted-foreground">
                    Any direct contact by the employer with the applicant, whether in person or by telephone, to discuss the employment being sought or the applicant's qualifications.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">PENDING CRIMINAL CHARGE</h3>
                  <p className="text-sm text-muted-foreground">
                    An existing accusation that a person has committed a crime, lodged by a prosecutor, law enforcement agency or military authority through an indictment, information, complaint or other formal charge, where the accusation has not yet resulted in a final judgment, acquittal, conviction, plea, dismissal or withdrawal.
                  </p>
                </div>
              </div>
            </section>

            {/* Legitimate Business Reasons Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Legitimate Business Reasons</h2>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">1. Direct and Substantial Bearing on Job Duties</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Situations where the nature of the criminal conduct has a direct and substantial bearing on the fitness or ability to perform the duties or responsibilities of the intended employment, taking into consideration the following factors:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground">
                    <li>The nature of the employment</li>
                    <li>The place and manner in which the employment will be performed</li>
                    <li>The nature and seriousness of the offense or conduct</li>
                    <li>Whether the employment presents an opportunity for the commission of a similar offense or conduct</li>
                    <li>The length of time between the conviction or arrest and the application for employment (not including time on probation or parole or the time during which fines or other financial penalties or remedies may be outstanding)</li>
                    <li>The number and types of convictions or pending charges</li>
                    <li>Any verifiable information provided by the applicant that is related to the applicant's rehabilitation or good conduct</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">2. Unreasonable Risk</h3>
                  <p className="text-sm text-muted-foreground">
                    Situations where the granting of employment would involve unreasonable risk of substantial harm to property or to safety of individuals or the public, or to business reputation or business assets, taking into consideration the factors listed in paragraph 1 of this definition.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">3. Vulnerable Populations</h3>
                  <p className="text-sm text-muted-foreground">
                    Positions working with children, developmentally disabled persons and vulnerable adults where the applicant has a conviction record of a crime against children or disabled or vulnerable adults, including but not limited to crimes of rape, sexual abuse, incest, prostitution, pimping, pandering, assault, domestic violence, kidnapping, financial exploitation, neglect, abandonment, and child endangerment.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">4. Federal or State Law Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Situations where an employer must comply with any federal or state law or regulation pertaining to background checks and the criminal conduct is relevant to the applicant's fitness for the job.
                  </p>
                </div>
              </div>
            </section>

            {/* Prohibited Practices Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Prohibited Practices</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  In connection with the employment of any person, it shall be an unlawful discriminatory practice for an employer to include a criminal record inquiry on any application. It shall further be an unlawful discriminatory practice for an employer who employs fifteen (15) or more persons, but not private schools providing a regular course of instruction for any part of kindergarten through high school education, to engage in any of the following activity:
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                  <li>To make any inquiry regarding, or to require any person to disclose or reveal, any convictions, arrests, or pending criminal charges during the application process, including but not limited to any interview.</li>
                  <li>The application process shall begin when the applicant inquires about the employment being sought and shall end when an employer has extended a conditional offer of employment to the applicant.</li>
                  <li>If the applicant voluntarily discloses any information regarding his or her criminal record at the interview, the employer may discuss the criminal record disclosed by the applicant.</li>
                </ul>
              </div>
            </section>

            {/* Handling of Criminal Records Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Handling of Criminal Records</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Employers shall comply with any obligations arising under federal or state law relating to authorization for background checks, notifying applicants about adverse hiring decisions based on an applicant's criminal record, and any other matters involving the use of criminal record information.
                </p>
              </div>
            </section>

            {/* Enforcement Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Enforcement</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Any complaint alleging a violation of this section shall be filed within the time provided in 5-3-10. Upon certification by the commission of an affirmative finding of probable cause that an employer has committed a violation of this section, the commission shall refer the complaint and probable cause finding to the city attorney for review, together with a recommendation as to the amount of a fine to be assessed.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Upon determination that the complaint meets the requisite standard of proof, the city attorney shall issue a municipal infraction citation against the employer:
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                  <li>First offense: Up to $750</li>
                  <li>Repeat offense within 3 years: Up to $1,000</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Fines shall be payable to the complainant. For purposes of enforcing this section, the provisions of sections 5-3-10.D, 5-3-10.E, 5-3-10.F, 5-3-11, 5-3-12 and 5-3-13 shall not apply.
                </p>
              </div>
            </section>

            {/* Effect on Other Laws Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Effect on Other Laws; No Private Rights</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This section shall not be interpreted or applied as imposing an obligation on the part of an employer to provide accommodations or job modifications in order to facilitate the employment of an applicant. Nothing in this section shall be construed to create a private right of action to seek damages or other relief of any kind.
                </p>
              </div>
            </section>

            {/* Effective Date */}
            <div className="text-sm text-muted-foreground border-t pt-4">
              Effective Date: July 1, 2020 (Ord. 5522, 11-4-2019; amd. Ord. 5547, 5-9-2020)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}