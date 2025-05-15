function ToastDescription({
  description,
}: {
  description: string | undefined;
}) {
  return <span style={{ color: "#4b5563" }}>{description}</span>;
}

export default ToastDescription;
