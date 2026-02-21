import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Terms = () => {
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
              Data Usage & Processing Terms
            </h1>
            <p className="text-muted-foreground">Last Updated: December 30, 2025</p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="rounded-xl border border-border bg-card p-8 md:p-12 shadow-card space-y-10"
            {...fadeIn}
          >
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Definitions</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">1.1 "User Data"</strong> refers to all data that the user provides, authorizes access to, or that is synchronized from third-party platforms (including but not limited to Notion, Slack, Google Workspace, Email, Calendar, IM tools) through the use of the Service, including but not limited to text, files, messages, metadata, timestamps, and any derived or processed content.
                </p>
                <p>
                  <strong className="text-foreground">1.2 "Processing"</strong> means any operation performed on User Data, whether automated or not, including but not limited to collection, storage, parsing, structuring, indexing, analysis, summarization, retrieval, deletion, or export.
                </p>
                <p>
                  <strong className="text-foreground">1.3 "Service"</strong> refers to the AI-powered memory, knowledge management, data aggregation, and related software and services provided by the Company.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Data Ownership</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">2.1</strong> Users retain <strong className="text-foreground">full ownership</strong> of their User Data.</p>
                <p><strong className="text-foreground">2.2</strong> The Company <strong className="text-foreground">does not claim</strong> any ownership, intellectual property rights, or derivative rights over the User Data itself.</p>
                <p><strong className="text-foreground">2.3</strong> Users grant the Company a <strong className="text-foreground">limited, revocable, non-exclusive license</strong> to process User Data solely for the purpose of providing the Service in accordance with these Terms and user instructions.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Purpose and Scope of Data Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">The Company processes User Data <strong className="text-foreground">only to the extent necessary</strong> for the following purposes:</p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Core Service Functionality</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Data synchronization, storage, indexing, and search</li>
                <li>Generation of to-do items, summaries, meeting notes, and memory records</li>
                <li>Conflict detection, timeline aggregation, deduplication, and merging</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 User-Initiated AI Processing</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Summarization, structuring, and tagging</li>
                <li>Analysis, review, or Q&A explicitly requested by the user</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.3 Service Reliability and Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Logging and debugging</li>
                <li>Abuse prevention, attack detection, and system security</li>
              </ul>
            </section>

            <hr className="border-border" />

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. AI and Model Usage</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">4.1</strong> User Data is processed <strong className="text-foreground">solely to provide AI inference and functionality for the individual user</strong>.</p>
                <p><strong className="text-foreground">4.2 By default, User Data is not used to train general-purpose AI models.</strong></p>
                <p><strong className="text-foreground">4.3</strong> If anonymized or de-identified data is used in the future to improve models or services, the Company will:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide prior notice</li>
                  <li>Offer an explicit opt-in mechanism</li>
                  <li>Ensure no impact on users who do not opt in</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Data Sources and Authorization</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">5.1</strong> When users authorize the Service to access third-party platforms via OAuth or other methods, users represent that they have the lawful right to grant such access.</p>
                <p><strong className="text-foreground">5.2</strong> The Company accesses and processes third-party data <strong className="text-foreground">only within the scope of the authorization granted</strong> and in compliance with applicable third-party platform policies.</p>
                <p><strong className="text-foreground">5.3</strong> Users may revoke third-party access at any time, after which the Company will cease further synchronization of the relevant data.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Storage and Security</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">6.1</strong> The Company implements reasonable technical and organizational measures to protect User Data, including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption in transit and at rest</li>
                  <li>Access control and permission isolation</li>
                  <li>Least-privilege access principles</li>
                  <li>Periodic security reviews</li>
                </ul>
                <p><strong className="text-foreground">6.2</strong> User Data is stored on secure cloud infrastructure. Storage locations may vary depending on service deployment and availability.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention and Deletion</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">7.1</strong> Users may, at any time, through product features or written request:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Export their User Data</li>
                  <li>Delete part or all of their User Data</li>
                </ul>
                <p><strong className="text-foreground">7.2</strong> Upon data deletion or service termination:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The Company will delete User Data within a reasonable timeframe</li>
                  <li>Except where retention is required by applicable law</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Sharing and Disclosure</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">8.1</strong> The Company <strong className="text-foreground">does not</strong> sell, rent, or trade User Data to third parties.</p>
                <p><strong className="text-foreground">8.2</strong> User Data may be disclosed only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upon explicit user instruction or authorization</li>
                  <li>To infrastructure or service providers strictly necessary to deliver the Service</li>
                  <li>Where required by law, regulation, or lawful governmental request</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Compliance and Cross-Border Transfers</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">9.1</strong> The Company is committed to complying with applicable data protection laws and regulations, including but not limited to GDPR and CCPA, where applicable.</p>
                <p><strong className="text-foreground">9.2</strong> Where cross-border data transfers occur, appropriate lawful safeguards will be implemented.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. User Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">10.1</strong> Users represent and warrant that they have the legal right to provide or authorize access to the User Data and that such data does not infringe the rights of any third party.</p>
                <p><strong className="text-foreground">10.2</strong> Users are responsible for assessing the compliance implications of connecting data sources to the Service, including internal policies and regulatory obligations.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Updates to These Terms</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">11.1</strong> The Company may update these Terms from time to time due to legal, regulatory, or service changes.</p>
                <p><strong className="text-foreground">11.2</strong> Material changes will be communicated through reasonable means. Continued use of the Service constitutes acceptance of the updated Terms.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Information</h2>
              <div className="rounded-xl border border-border bg-muted/50 p-6">
                <p className="text-muted-foreground mb-2">For any questions regarding these Data Usage & Processing Terms, please contact:</p>
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

export default Terms;
