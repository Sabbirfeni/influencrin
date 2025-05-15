import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface ProfileImageProps {
  style?: string; // Tailwind classes or sizes
  fullname: string | undefined;
  src: string | File | undefined | null;
  isInfluencer?: boolean | undefined;
  isUser?: boolean | undefined;
  backgroundColor?: string;
}

export function ProfileImage({
  style,
  fullname,
  src,
  isInfluencer,
  isUser,
  backgroundColor,
}: ProfileImageProps) {
  const imageDir = isInfluencer
    ? "influencer-profiles"
    : isUser
    ? "user-profiles"
    : undefined;

  let imgSrc: string | undefined;

  if (src instanceof File) {
    imgSrc = URL.createObjectURL(src);
  } else if (typeof src === "string" && src.startsWith("blob:")) {
    imgSrc = src;
  } else if (typeof src === "string") {
    imgSrc = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/images/uploads/${imageDir}/${src}`;
  } else {
    imgSrc = undefined;
  }

  const firstLetterOfUsername = fullname?.trim().charAt(0).toUpperCase();

  return (
    <Avatar className={`cursor-pointer ${style}`}>
      <AvatarImage src={imgSrc} className="object-cover" alt={fullname} />
      <AvatarFallback
        className={`${backgroundColor || "bg-gray-300"} text-muted-foreground`}
      >
        {firstLetterOfUsername}
      </AvatarFallback>
    </Avatar>
  );
}
