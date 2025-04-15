import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, User2 } from "lucide-react"; // User: man, User2: woman (you can customize or swap)
import { cn } from "@/lib/utils"; // Optional utility for conditional classes

export function FindInfluencersButton() {
  const [showMan, setShowMan] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMan((prev) => !prev);
    }, 2000); // Switch every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Button className="relative overflow-hidden px-6 py-5 text-base gap-2">
      {/* Icons */}
      <span className="relative w-5 h-5 inline-block">
        {/* Man icon */}
        <User
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500",
            showMan ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          )}
        />

        {/* Woman icon */}
        <User2
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500",
            !showMan ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}
        />
      </span>
      Find Influencers
    </Button>
  );
}
