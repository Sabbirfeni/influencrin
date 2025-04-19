import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface ProfileImageProps {
  style: string; // supports both numbers and Tailwind strings like "10"
  fullname: string;
  src?: string;
  backgroundColor?: string; // expects Tailwind-friendly colors like "gray-200"
}

export function ProfileImage({
  style,
  fullname,
  src,
  backgroundColor,
}: ProfileImageProps) {
  const firstLetterOfUsername = fullname.trim().charAt(0).toUpperCase();

  return (
    <Avatar className={`cursor-pointer ${style}`}>
      <AvatarImage
        src={src || "/avatar.jpg"}
        className="object-cover"
        alt={fullname}
      />
      <AvatarFallback
        className={`${backgroundColor || "bg-gray-300"} text-muted-foreground`}
      >
        {firstLetterOfUsername}
      </AvatarFallback>
    </Avatar>
  );
}
