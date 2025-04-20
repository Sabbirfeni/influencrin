import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import formatFollowers from "@/utils/format-follwers";
import { useState } from "react";

type FollowersFilterProps = {
  searchParams: URLSearchParams;
  className?: string;
} & React.ComponentProps<typeof Slider>;

export function FollowersFilter({
  searchParams,
  className,
  ...props
}: FollowersFilterProps) {
  const currentMinFollowers = searchParams.get("min_followers");
  const currentMaxFollowers = searchParams.get("max_followers");
  const minFollowers = Number(currentMinFollowers) || 0;
  const maxFollowers = Number(currentMaxFollowers) || 300000;
  const [value, setValue] = useState<[number, number]>([
    minFollowers,
    maxFollowers,
  ]);
  const minGap = 5000; // Minimum allowed gap
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

    if (min) {
      searchParams.set("min_followers", min.toString());
    } else {
      searchParams.delete("min_followers");
    }
    searchParams.set("max_followers", max.toString());

    setValue([min, max]);
  };

  return (
    <div className="flex items-center gap-4 ml-3">
      {/* <p className="text-sm font-medium text-muted-foreground">Followers</p> */}
      <div className={cn("relative w-[200px]", className)}>
        {/* Tooltip labels */}
        <div className="flex justify-between px-1 mb-2 text-sm font-medium">
          <div>
            {formatFollowers(value[0])}{" "}
            <span className="text-gray-400 text-xs">to</span>{" "}
          </div>
          <div>
            {formatFollowers(value[1])}{" "}
            <span className="text-gray-400 text-xs">followers</span>{" "}
          </div>
        </div>

        {/* Slider */}
        <Slider
          value={value}
          onValueChange={handleSliderChange}
          min={0}
          max={1000000}
          step={500}
          {...props}
        />
      </div>
    </div>
  );
}

export default FollowersFilter;
