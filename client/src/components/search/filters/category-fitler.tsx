import * as React from "react";
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

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "Fashion", value: "fashion" },
  { label: "Beauty", value: "beauty" },
  { label: "Fitness", value: "fitness" },
  { label: "Health & Wellness", value: "health_wellness" },
  { label: "Travel", value: "travel" },
  { label: "Food & Beverage", value: "food_beverage" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Parenting", value: "parenting" },
  { label: "Technology", value: "technology" },
  { label: "Gaming", value: "gaming" },
  { label: "Music", value: "music" },
  { label: "Photography", value: "photography" },
  { label: "Art & Design", value: "art_design" },
  { label: "DIY & Crafts", value: "diy_crafts" },
  { label: "Home Decor", value: "home_decor" },
  { label: "Education", value: "education" },
  { label: "Finance", value: "finance" },
  { label: "Business", value: "business" },
  { label: "Motivational", value: "motivational" },
  { label: "Spirituality", value: "spirituality" },
  { label: "Books & Literature", value: "books_literature" },
  { label: "Pets & Animals", value: "pets_animals" },
  { label: "Automotive", value: "automotive" },
  { label: "Luxury", value: "luxury" },
  { label: "Sustainability", value: "sustainability" },
  { label: "Politics", value: "politics" },
  { label: "Comedy", value: "comedy" },
  { label: "Real Estate", value: "real_estate" },
  { label: "Film & TV", value: "film_tv" },
  { label: "Sports", value: "sports" },
  { label: "Outdoors & Adventure", value: "outdoors_adventure" },
  { label: "Skincare", value: "skincare" },
  { label: "Makeup", value: "makeup" },
  { label: "Men’s Style", value: "mens_style" },
  { label: "Women’s Style", value: "womens_style" },
];

type CategoryFilterProps = {
  searchParams: URLSearchParams;
};

export function CategoryFilter({
  searchParams,
  setParams,
}: CategoryFilterProps) {
  const current = searchParams.get("category_names");
  let categories = current ? current.split(",") : [];
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(categories);

  const toggleSelection = (value: string) => {
    // Toggle the selected value
    if (categories.includes(value)) {
      categories = categories.filter((item) => item !== value);
    } else {
      categories = [...categories, value];
    }

    // Update searchParams with the new list
    if (categories.length > 0) {
      searchParams.set("category_names", categories.join(","));
      setParams(searchParams);
    } else {
      searchParams.delete("category_names");
      setParams(searchParams);
    }

    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setOpen(false);
  };

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
                .map((val) => options.find((opt) => opt.value === val)?.label)
                .join(", ")
            : "Select categories"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 max-h-60 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search fruits..." className="h-9" />
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggleSelection(option.value)}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selected.includes(option.value)
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50"
                  )}
                >
                  {selected.includes(option.value) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryFilter;
