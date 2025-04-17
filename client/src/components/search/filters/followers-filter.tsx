import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

export function FollowersFilter({ className, ...props }: SliderProps) {
  const [value, setValue] = useState<[number, number]>([0, 8000]);
  const minGap = 2000; // Minimum allowed gap
  const handleSliderChange = (newValue: [number, number]) => {
    let [min, max] = newValue;

    // Enforce minimum gap between min and max
    if (max - min < minGap) {
      if (min === value[0]) {
        // Adjust max if min thumb is being moved
        max = min + minGap;
      } else {
        // Adjust min if max thumb is being moved
        min = max - minGap;
      }
    }

    setValue([min, max]);
  };

  return (
    <div className="flex items-center gap-4 ml-3">
      {/* <p className="text-sm font-medium text-muted-foreground">Followers</p> */}
      <div className={cn("relative w-[200px]", className)}>
        {/* Tooltip labels */}
        <div className="flex justify-between px-1 mb-2 text-sm font-medium">
          <div>
            {value[0].toLocaleString()}{" "}
            <span className="text-gray-400 text-xs">to</span>{" "}
          </div>
          <div>
            {value[1].toLocaleString()}{" "}
            <span className="text-gray-400 text-xs">followers</span>{" "}
          </div>
        </div>

        {/* Slider */}
        <Slider
          value={value}
          onValueChange={handleSliderChange}
          min={0}
          max={10000}
          step={500}
          {...props}
        />
      </div>
    </div>
  );
}

export default FollowersFilter;
