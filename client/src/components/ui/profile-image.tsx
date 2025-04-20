import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface ProfileImageProps {
  style: string; // supports both numbers and Tailwind strings like "10"
  fullname: string | undefined;
  src: string | undefined | null;
  backgroundColor?: string; // expects Tailwind-friendly colors like "gray-200"
}

export function ProfileImage({
  style,
  fullname,
  src,
  backgroundColor,
}: ProfileImageProps) {
  const firstLetterOfUsername = fullname?.trim().charAt(0).toUpperCase();
  console.log(
    `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/images/uploads/user-profiles/${src}`
  );
  return (
    <Avatar className={`cursor-pointer ${style}`}>
      <AvatarImage
        src={`${
          import.meta.env.VITE_SERVER_BASE_URL
        }/images/uploads/user-profiles/${src}`}
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
