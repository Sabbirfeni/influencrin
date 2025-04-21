import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useState } from "react";

type Category = {
  id: string;
  influencer_id: string;
  category_name: string;
};

type InfluencerCategoryListProps = {
  style?: string;
  categories: Category[];
};
// const suggestionsList = [
//   "Instagram",
//   "YouTube",
//   "Twitter",
//   "TikTok",
//   "LinkedIn",
// ];

function AddInfluencerCategoryList({
  style,
  categories,
  setCategories,
}: InfluencerCategoryListProps) {
  const [category, setCategory] = useState("");
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (value.trim() === "") {
      // setFilteredSuggestions([]);
      // setShowDropdown(false);
    } else {
      // const filtered = suggestionsList.filter((s) =>
      //   s.toLowerCase().includes(value.toLowerCase())
      // );
      // setFilteredSuggestions(filtered);
      // setShowDropdown(true);
    }
    setSelected(null); // Clear previous selection
  };

  // const handleSelect = (suggestion) => {
  //   setCategory(suggestion);
  //   setSelected(suggestion);
  //   setShowDropdown(false);
  // };

  const handleAdd = () => {
    const categoryToAdd = selected || category;
    if (categoryToAdd.trim() !== "") {
      setCategories((prevCategories) => [...prevCategories, categoryToAdd]);
      setCategory("");
      // setFilteredSuggestions([]);
      // setShowDropdown(false);
    }
  };

  const handleRemove = (categoryToRemove) => {
    const filteredCategories = categories.filter(
      (category) => category !== categoryToRemove
    );

    setCategories(filteredCategories);
  };
  return (
    <div
      className={`p-4 ${style} flex-col gap-4 border border-gray-200 rounded-xl`}
    >
      {/* Categories card header */}

      <div className="flex items-start justify-between">
        <h4 className="text-sm font-semibold">Categories</h4>
        {/* <Button className="w-10 h-8 flex items-center justify-center shadow-none text-primary bg-white hover:bg-primary hover:text-white hover:shadow-lg"></Button> */}
        {/* <Button className="w-7 h-7 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary  hover:text-white shadow-lg">
          <Plus className="w-3 h-3" />
        </Button> */}
      </div>
      {/* Category list */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <Badge
              onClick={() => handleRemove(cat)}
              key={`${cat}${idx}`}
              variant="outline"
              className="group cursor-pointer flex items-center gap-1 text-xs px-3 py-1 rounded-full transition duration-300 bg-white text-primary border border-primary"
            >
              {cat}
              <X
                className="z-50 w-3 h-3 cursor-pointer group-hover:scale-150 transition duration-300"
                strokeWidth={3}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Add category */}
      <div className="relative max-w-md">
        <div className="flex gap-2">
          <Input
            value={category}
            onChange={handleChange}
            className="flex-1 text-xs"
          />

          <Button
            onClick={handleAdd}
            variant="outline"
            className="h-full border border-gray-300 hover:bg-primary hover:border-primary hover:text-white"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* {showDropdown && filteredSuggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md">
            {filteredSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(suggestion)}
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                )}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}

export default AddInfluencerCategoryList;
