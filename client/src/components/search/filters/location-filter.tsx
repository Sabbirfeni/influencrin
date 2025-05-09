import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApi } from "@/hooks";
import influencerCategoryApiService from "@/api/endpoints/influencer-category-api-service";
import FilterInfputSkeleton from "@/components/skeletons/filter/filter-input-skeleton";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import capitalizeWords from "@/utils/capitalize-words";

type CategoryFilterProps = {
  searchParams: URLSearchParams;
};

export function LocationFilter({
  searchParams,
  setParams,
}: CategoryFilterProps) {
  const [allLocations, setLocations] = useState([]);
  const current = searchParams.get("locations");
  let currentLocations = current ? current.split(",") : [];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(currentLocations);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSelection = (value: string) => {
    // Toggle the selected value
    if (currentLocations.includes(value)) {
      currentLocations = currentLocations.filter((item) => item !== value);
    } else {
      currentLocations = [...currentLocations, value];
    }

    // Update searchParams with the new list
    if (currentLocations.length > 0) {
      searchParams.set("locations", currentLocations.join(","));
      setParams(searchParams);
    } else {
      searchParams.delete("locations");
      setParams(searchParams);
    }

    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

    // Debounce setOpen(false) - only call after user stops interacting
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const { request, loading } = useApi(
    influencerApiService.getAllLocationsForInfluencers
  );

  useEffect(() => {
    const loadLocations = async () => {
      const { data: locationResponse } = await request();
      if (locationResponse) {
        setLocations(
          locationResponse.locations.map((location: string) =>
            capitalizeWords(location)
          )
        );
      }
    };
    loadLocations();
  }, []);

  if (loading) return <FilterInfputSkeleton />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between overflow-hidden"
        >
          {selected.length > 0
            ? selected
                .map((val) => allLocations.find((opt) => opt === val))
                .join(", ")
            : "Select Locations"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[fit-content] p-0 max-h-60 overflow-y-auto">
        <Command>
          <CommandInput className="h-9" />
          <CommandGroup>
            {allLocations.map((category) => {
              return (
                <CommandItem
                  key={category}
                  onSelect={() => toggleSelection(category)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selected.includes(category)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {selected.includes(category) && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  {category}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default LocationFilter;
