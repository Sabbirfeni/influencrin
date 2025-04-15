import React from "react";

function SectionWrappers({ children }: React.PropsWithChildren) {
  return <div className="px-2 md:px-20">{children}</div>;
}

export default SectionWrappers;
