import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const LOGIN_REQUIRED_EVENT = "finance:login-required";

export function emitLoginRequired() {
  window.dispatchEvent(new CustomEvent(LOGIN_REQUIRED_EVENT));
}

// Shown when a guest exhausts the free AI sample. They can keep browsing the
// course; only further AI generation requires signing in with Google.
export function LoginGate() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(LOGIN_REQUIRED_EVENT, handler);
    return () => window.removeEventListener(LOGIN_REQUIRED_EVENT, handler);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <DialogTitle className="text-center font-serif">
            You've sampled the course
          </DialogTitle>
          <DialogDescription className="text-center">
            You've used up the free AI sample — about two paragraphs of tutoring
            and practice. Sign in with Google to keep going. It's free, and your
            progress will be saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Keep browsing
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              setLocation("/sign-in");
            }}
            data-testid="button-login-gate-signin"
          >
            Sign in with Google
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
