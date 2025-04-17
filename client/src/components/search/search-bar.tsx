import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const navigateToSearchPageWithParams = () => {
    navigate("/search");
  };

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative w-full md:w-[300px] pl-2 md:pl-0">
      {/* Search Icon */}
      <Search
        onClick={() => setIsFocused(true)}
        className={`absolute right-0 md:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 ease-in-out ${
          isFocused ? "opacity-0 -translate-x-3" : "opacity-100"
        }`}
      />

      {/* Input: Initially hidden, expands when the icon is clicked */}
      <Input
        ref={inputRef}
        placeholder="influencer name or handle"
        className={`transition-all duration-300 ease-in-out text-sm md:text-md pl-10 w-0 md:w-[300px] placeholder:text-gray-300  ${
          isFocused ? "w-full pl-3 pr-10" : "hidden md:flex"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Search
        onClick={navigateToSearchPageWithParams}
        className={`absolute cursor-pointer right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 ease-in-out ${
          isFocused ? "opacity-100" : "opacity-0 translate-x-3"
        }`}
      />
    </div>
  );
}
