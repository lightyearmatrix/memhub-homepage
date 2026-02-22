import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div className="text-center mb-16" {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Legal
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last Updated: January 24, 2026</p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="rounded-xl border border-border bg-card p-8 md:p-12 shadow-card space-y-10"
            {...fadeIn}
          >
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>SuperMem ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered memory and knowledge management service (the "Service").</p>
                <p>By accessing or using the Service, you agree to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Account Information:</strong> Email address, name, and other registration details</li>
                <li><strong className="text-foreground">User Content:</strong> Data you create, upload, or sync through the Service, including notes, documents, and files</li>
                <li><strong className="text-foreground">Communications:</strong> Information you provide when contacting us for support or feedback</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.2 Information from Third-Party Services</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">When you authorize connections to third-party platforms (such as Notion, Slack, Google Workspace, Email, Calendar, or IM tools), we collect data from those services as permitted by your authorization, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Messages, documents, and files</li>
                <li>Metadata such as timestamps and sender information</li>
                <li>Calendar events and scheduling data</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.3 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Usage Data:</strong> How you interact with the Service, features used, and actions taken</li>
                <li><strong className="text-foreground">Device Information:</strong> Device type, operating system, browser type, and unique device identifiers</li>
                <li><strong className="text-foreground">Log Data:</strong> IP address, access times, and pages viewed</li>
              </ul>
            </section>

            <hr className="border-border" />

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Provide the Service:</strong> Synchronize, store, index, and enable search across your data</li>
                <li><strong className="text-foreground">Enable AI Features:</strong> Generate summaries, to-do items, meeting notes, and memory records based on your data</li>
                <li><strong className="text-foreground">Improve the Service:</strong> Analyze usage patterns to enhance functionality and user experience</li>
                <li><strong className="text-foreground">Communicate with You:</strong> Send service-related announcements, updates, and respond to inquiries</li>
                <li><strong className="text-foreground">Ensure Security:</strong> Detect and prevent fraud, abuse, and security threats</li>
                <li><strong className="text-foreground">Comply with Legal Obligations:</strong> Meet applicable legal requirements</li>
              </ul>
            </section>

            <hr className="border-border" />

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. AI Processing and Your Data</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">4.1</strong> Your data is processed by AI solely to provide personalized features and functionality to you.</p>
                <p><strong className="text-foreground">4.2</strong> By default, your data is <strong className="text-foreground">not used to train general-purpose AI models</strong>.</p>
                <p><strong className="text-foreground">4.3</strong> If we ever consider using anonymized data for model improvement, we will provide prior notice and an explicit opt-in mechanism.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We do <strong className="text-foreground">not</strong> sell, rent, or trade your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">With Your Consent:</strong> When you explicitly authorize sharing</li>
                <li><strong className="text-foreground">Service Providers:</strong> With trusted third-party providers who assist in operating the Service (e.g., cloud hosting, analytics), bound by confidentiality obligations</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, regulation, or valid legal process</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to you</li>
                <li><strong className="text-foreground">Safety:</strong> To protect the rights, safety, and property of SuperMem, our users, or others</li>
              </ul>
            </section>

            <hr className="border-border" />

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>We implement appropriate technical and organizational measures to protect your data, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular security assessments and monitoring</li>
                  <li>Secure cloud infrastructure with industry-standard protections</li>
                </ul>
                <p>While we strive to protect your information, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">7.1</strong> We retain your data for as long as your account is active or as needed to provide the Service.</p>
                <p><strong className="text-foreground">7.2</strong> You may request deletion of your data at any time through the Service or by contacting us.</p>
                <p><strong className="text-foreground">7.3</strong> Upon account deletion, we will remove your data within a reasonable timeframe, except where retention is required by law.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data</li>
                <li><strong className="text-foreground">Portability:</strong> Request export of your data in a machine-readable format</li>
                <li><strong className="text-foreground">Withdrawal of Consent:</strong> Revoke consent for data processing where applicable</li>
                <li><strong className="text-foreground">Objection:</strong> Object to certain types of processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">To exercise these rights, please contact us at the address below.</p>
            </section>

            <hr className="border-border" />

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.</p>
            </section>

            <hr className="border-border" />

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">The Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it promptly.</p>
            </section>

            <hr className="border-border" />

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.</p>
            </section>

            <hr className="border-border" />

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.</p>
            </section>

            <hr className="border-border" />

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Us</h2>
              <div className="rounded-xl border border-border bg-muted/50 p-6">
                <p className="text-muted-foreground mb-2">If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
                <a
                  href="mailto:business@supermem.io"
                  className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-150"
                >
                  business@supermem.io
                </a>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
