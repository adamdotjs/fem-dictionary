import clsx from "clsx";

type HeadingProps = {
  size: "sm" | "md" | "lg";
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
};

function Heading({ size, as, children }: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        size === "sm" && "text-xl",
        size === "md" && "text-2xl",
        size === "lg" && "text-[4rem]",
        "leading-tight"
      )}
    >
      {children}
    </Tag>
  );
}

function Text() {}

export { Heading, Text };
