import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ExpertWaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpertWaitlistModal = ({ open, onOpenChange }: ExpertWaitlistModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedIn: "",
    expertise: "",
    experience: "",
    outcomes: "",
    openToSupervising: "",
    hasClients: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/expert-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Submission failed");
      }
      onOpenChange(false);
      setStep(1);
      setFormData({
        name: "",
        email: "",
        linkedIn: "",
        expertise: "",
        experience: "",
        outcomes: "",
        openToSupervising: "",
        hasClients: "",
      });
      navigate("/success?type=expert");
    } catch (error: any) {
      toast.error("Something went wrong", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Join the Expert Beta
          </DialogTitle>
          <DialogDescription>
            We're onboarding a small group of experts to build the first expert
            agent workforce.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                step >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              <span>Basics</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : "2"}
              <span>Expertise</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="expert-name">Name</Label>
                <Input
                  id="expert-name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expert-email">Professional Email</Label>
                <Input
                  id="expert-email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expert-linkedin">LinkedIn or Website</Label>
                <Input
                  id="expert-linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedIn}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedIn: e.target.value })
                  }
                />
              </div>
              <Button
                className="w-full mt-6 btn-glow"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <Label>Your main area of expertise</Label>
                <RadioGroup
                  value={formData.expertise}
                  onValueChange={(value) =>
                    setFormData({ ...formData, expertise: value })
                  }
                  className="space-y-2"
                >
                  {[
                    "Growth / Marketing",
                    "Fundraising / VC",
                    "Legal / Contracts",
                    "Ops / Finance",
                    "Product / UX",
                    "Engineering",
                    "Other",
                  ].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`exp-${option}`} />
                      <Label htmlFor={`exp-${option}`} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Years of experience</Label>
                <RadioGroup
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                  className="flex gap-3"
                >
                  {["3-5", "6-10", "10+"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer flex-1"
                    >
                      <RadioGroupItem value={option} id={`years-${option}`} />
                      <Label htmlFor={`years-${option}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcomes">
                  What kind of outcomes do you usually help clients achieve?
                </Label>
                <Textarea
                  id="outcomes"
                  placeholder="Helped startups raise Series A, Scaled paid ads to $1M/mo, Reviewed SaaS enterprise contracts"
                  value={formData.outcomes}
                  onChange={(e) =>
                    setFormData({ ...formData, outcomes: e.target.value })
                  }
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-3">
                <Label>Are you open to supervising AI-generated work?</Label>
                <RadioGroup
                  value={formData.openToSupervising}
                  onValueChange={(value) =>
                    setFormData({ ...formData, openToSupervising: value })
                  }
                  className="space-y-2"
                >
                  {[
                    "Yes, that's the point",
                    "Maybe, want to learn more",
                    "Not sure yet",
                  ].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`supervise-${option}`} />
                      <Label htmlFor={`supervise-${option}`} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Do you already have clients?</Label>
                <RadioGroup
                  value={formData.hasClients}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hasClients: value })
                  }
                  className="flex gap-3"
                >
                  {["Yes", "Not yet"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer flex-1"
                    >
                      <RadioGroupItem value={option} id={`clients-${option}`} />
                      <Label htmlFor={`clients-${option}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 btn-glow"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.expertise}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertWaitlistModal;
