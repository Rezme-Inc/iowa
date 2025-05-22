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
            Consideration of Arrest and Conviction Records in Employment Decisions
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Under Title VII of the Civil Rights Act of 1964
          </h2>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Summary
              </h2>

              <div className="space-y-4">
                <p className="text-gray35">
                  An employer's use of an individual's criminal history in making employment decisions may, in some instances, violate the prohibition against employment discrimination under Title VII of the Civil Rights Act of 1964, as amended.
                </p>

                <p className="text-gray35">
                  The Guidance builds on longstanding court decisions and existing guidance documents that the U.S. Equal Employment Opportunity Commission (Commission or EEOC) issued over twenty years ago.
                </p>

                <p className="text-gray35">
                  The Guidance focuses on employment discrimination based on race and national origin. The Introduction provides information about criminal records, employer practices, and Title VII.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Arrest vs. Conviction Records</h3>
                  <p className="text-gray35">
                    The fact of an arrest does not establish that criminal conduct has occurred, and an exclusion based on an arrest, in itself, is not job related and consistent with business necessity. However, an employer may make an employment decision based on the conduct underlying an arrest if the conduct makes the individual unfit for the position in question.
                  </p>
                  <p className="text-gray35">
                    In contrast, a conviction record will usually serve as sufficient evidence that a person engaged in particular conduct. In certain circumstances, however, there may be reasons for an employer not to rely on the conviction record alone when making an employment decision.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Disparate Treatment and Impact Analysis</h3>
                  <p className="text-gray35">
                    A violation may occur when an employer treats criminal history information differently for different applicants or employees, based on their race or national origin (disparate treatment liability).
                  </p>
                  <p className="text-gray35">
                    An employer's neutral policy (e.g., excluding applicants from employment based on certain criminal conduct) may disproportionately impact some individuals protected under Title VII, and may violate the law if not job related and consistent with business necessity (disparate impact liability).
                  </p>
                  <p className="text-gray35">
                    National data supports a finding that criminal record exclusions have a disparate impact based on race and national origin. The national data provides a basis for the Commission to investigate Title VII disparate impact charges challenging criminal record exclusions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Job Related and Business Necessity Defense</h3>
                  <p className="text-gray35">
                    Two circumstances in which the Commission believes employers will consistently meet the "job related and consistent with business necessity" defense are as follows:
                  </p>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray35">
                      The employer validates the criminal conduct exclusion for the position in question in light of the Uniform Guidelines on Employee Selection Procedures (if there is data or analysis about criminal conduct as related to subsequent work performance or behaviors); or
                    </li>
                    <li className="text-gray35">
                      The employer develops a targeted screen considering at least the nature of the crime, the time elapsed, and the nature of the job (the three factors identified by the court in Green v. Missouri Pacific Railroad, 549 F.2d 1158 (8th Cir. 1977)). The employer's policy then provides an opportunity for an individualized assessment for those people identified by the screen, to determine if the policy as applied is job related and consistent with business necessity. (Although Title VII does not require individualized assessment in all circumstances, the use of a screen that does not include individualized assessment is more likely to violate Title VII.)
                    </li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Legal Compliance</h3>
                  <p className="text-gray35">
                    Compliance with other federal laws and/or regulations that conflict with Title VII is a defense to a charge of discrimination under Title VII.
                  </p>
                  <p className="text-gray35">
                    State and local laws or regulations are preempted by Title VII if they "purport[] to require or permit the doing of any act which would be an unlawful employment practice" under Title VII. 42 U.S.C. § 2000e-7.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-8 pt-4 border-t border-border">
              <p className="text-gray35 text-sm">
                Source: U.S. Equal Employment Opportunity Commission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}