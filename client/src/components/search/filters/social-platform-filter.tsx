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
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Twitter / X", value: "twitter" },
  { label: "TikTok", value: "tiktok" },
  { label: "YouTube", value: "youtube" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Snapchat", value: "snapchat" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Reddit", value: "reddit" },
  { label: "Twitch", value: "twitch" },
  { label: "Threads", value: "threads" },
  { label: "Discord", value: "discord" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Telegram", value: "telegram" },
  { label: "Clubhouse", value: "clubhouse" },
  { label: "Tumblr", value: "tumblr" },
  { label: "WeChat", value: "wechat" },
  { label: "Vimeo", value: "vimeo" },
  { label: "Medium", value: "medium" },
  { label: "Quora", value: "quora" },
  { label: "Line", value: "line" },
  { label: "VK", value: "vk" },
  { label: "Douyin", value: "douyin" },
  { label: "KakaoTalk", value: "kakaotalk" },
  { label: "Byte", value: "byte" },
  { label: "Triller", value: "triller" },
  { label: "Mix", value: "mix" },
  { label: "MeWe", value: "mewe" },
  { label: "Parler", value: "parler" },
  { label: "BeReal", value: "bereal" },
  { label: "Rumble", value: "rumble" },
  { label: "Lemon8", value: "lemon8" },
  { label: "Mastodon", value: "mastodon" },
  { label: "Zalo", value: "zalo" },
  { label: "Periscope", value: "periscope" },
];

type SocialPlatformFilterProps = {
  searchParams: URLSearchParams;
};

export function SocialPlatformFilter({
  searchParams,
}: SocialPlatformFilterProps) {
  const current = searchParams.get("platform_names");
  let platforms = current ? current.split(",") : [];
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(platforms);

  const toggleSelection = (value: string) => {
    // Toggle the selected value
    if (platforms.includes(value)) {
      platforms = platforms.filter((item) => item !== value);
    } else {
      platforms = [...platforms, value];
    }

    // Update searchParams with the new list
    if (platforms.length > 0) {
      searchParams.set("platform_names", platforms.join(","));
    } else {
      searchParams.delete("platform_names");
    }
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
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
            : "Select platforms"}
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

export default SocialPlatformFilter;
