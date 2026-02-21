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

interface ClientWaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientWaitlistModal = ({ open, onOpenChange }: ClientWaitlistModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    helpWith: "",
    startTiming: "",
    preference: "",
    notes: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          helpWith: formData.helpWith,
          startTiming: formData.startTiming,
          preference: formData.preference,
          notes: formData.notes,
          fromSource: "io",
        }),
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
        company: "",
        helpWith: "",
        startTiming: "",
        preference: "",
        notes: "",
      });
      navigate("/success?type=waitlist");
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
            Join the Beta Waitlist
          </DialogTitle>
          <DialogDescription>
            We're in beta. Apply now to be among the first batch getting access to
            expert agents.
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
              <span>Details</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company / Project name</Label>
                <Input
                  id="company"
                  placeholder="Your company or project"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
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
                <Label>What do you want the agent to help you with first?</Label>
                <RadioGroup
                  value={formData.helpWith}
                  onValueChange={(value) =>
                    setFormData({ ...formData, helpWith: value })
                  }
                  className="space-y-2"
                >
                  {[
                    "Growth / content / marketing",
                    "Fundraising",
                    "Contracts / legal review",
                    "Strategy / planning",
                    "Operations workflows",
                    "Not sure yet",
                  ].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>When would you like to start?</Label>
                <RadioGroup
                  value={formData.startTiming}
                  onValueChange={(value) =>
                    setFormData({ ...formData, startTiming: value })
                  }
                  className="flex gap-3"
                >
                  {["ASAP", "Just exploring"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer flex-1"
                    >
                      <RadioGroupItem value={option} id={`timing-${option}`} />
                      <Label htmlFor={`timing-${option}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Would you prefer to hire experts, or their agents (1/10 price)?</Label>
                <RadioGroup
                  value={formData.preference}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preference: value })
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  {["Experts", "Agents", "Depends", "Both"].map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`pref-${option}`} />
                      <Label htmlFor={`pref-${option}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  Anything important we should know? (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Big deadline, specific workflow, security needs..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 btn-glow"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.helpWith}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join Waitlist
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

export default ClientWaitlistModal;
