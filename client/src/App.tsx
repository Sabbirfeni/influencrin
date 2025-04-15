import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
        <Heart color="#0A66C2" fill="#0A66C2" />
      </div>
    </>
  );
}

export default App;
