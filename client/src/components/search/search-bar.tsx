import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false); // State to manage focus
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for input field

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus(); // Focus input when state is true
    }
  }, [isFocused]); // Re-run the effect when 'isFocused' changes

  return (
    <div className="relative w-full md:w-[300px] pl-2 md:pl-0">
      {/* Search Icon */}
      <Search
        onClick={() => setIsFocused(true)} // Show the input when clicked
        className={`absolute right-0 md:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 ease-in-out ${
          isFocused ? "opacity-0 -translate-x-3" : "opacity-100"
        }`} // Hides and moves the icon to the left when focused
      />

      {/* Input: Initially hidden, expands when the icon is clicked */}
      <Input
        ref={inputRef} // Reference to the input
        placeholder="search name..."
        className={`transition-all duration-300 ease-in-out text-sm md:text-md pl-10 w-0 md:w-[300px] ${
          isFocused ? "w-full pl-3 pr-10" : "hidden md:flex" // Expands the input when focused
        }`}
        onFocus={() => setIsFocused(true)} // Expands the input when focused
        onBlur={() => setIsFocused(false)} // Collapses the input when focus is lost
      />

      <Search
        onClick={() => setIsFocused(true)} // Show the input when clicked
        className={`absolute cursor-pointer right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 ease-in-out ${
          isFocused ? "opacity-100" : "opacity-0 translate-x-3"
        }`} // Hides and moves the icon to the left when focused
      />
    </div>
  );
}
