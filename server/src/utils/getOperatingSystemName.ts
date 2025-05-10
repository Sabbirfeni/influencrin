import { UAParser } from "ua-parser-js";

// Function to extract the OS name (e.g., "macOS", "Windows", "Ubuntu")
const getOperatingSystemName = (userAgent: string): string => {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();

  let osName = "";

  // Handle macOS
  if (os.name === "Mac OS") {
    osName = "macOS";
  }

  // Handle Windows
  else if (os.name === "Windows") {
    osName = "Windows";
  }

  // Handle Linux (e.g., Ubuntu)
  else if (os.name === "Linux") {
    osName = "Linux";
  }

  // Default for unknown OS
  else {
    osName = os.name || "Unknown OS";
  }

  return osName;
};

export default getOperatingSystemName;
