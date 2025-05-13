import { Card, CardContent } from "@/components/ui/card";

const ChartSkeleton = () => {
  return (
    <Card className="w-full h-[250px] animate-pulse overflow-hidden">
      <CardContent className="pt-4 w-full h-full p-0">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Simulate visitors area */}
          <path
            d="M0,30 Q10,25 20,28 Q30,31 40,26 Q50,22 60,24 Q70,28 80,20 Q90,15 100,20 L100,40 L0,40 Z"
            fill="#e5e7eb"
          />
          {/* Simulate searches area */}
          <path
            d="M0,35 Q10,32 20,34 Q30,37 40,30 Q50,28 60,29 Q70,33 80,27 Q90,24 100,26 L100,40 L0,40 Z"
            fill="#d1d5db"
          />
        </svg>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;
