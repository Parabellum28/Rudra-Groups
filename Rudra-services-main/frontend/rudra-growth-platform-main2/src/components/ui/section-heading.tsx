import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { KineticText } from "@/components/animations/KineticText";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "default" | "light";
  className?: string;
  kineticTitle?: boolean;
  kineticVariant?: "hero" | "section" | "branding" | "edge";
}

const SectionHeading = ({
  label,
  title,
  description,
  align = "center",
  variant = "default",
  className,
  kineticTitle = false,
  kineticVariant = "section",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 font-body text-sm font-medium mb-6",
            variant === "default" ? "text-primary" : "text-primary-foreground"
          )}
        >
          <Sparkles className="w-4 h-4" />
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
          align === "center" && "sm:whitespace-nowrap",
          variant === "default" ? "text-foreground" : "text-primary-foreground"
        )}
        style={align === "center" ? { wordBreak: "keep-all" } : undefined}
      >
        {kineticTitle ? (
          <KineticText variant={kineticVariant} delay={0.1} as="span" className="inline-block">
            {title}
          </KineticText>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "font-body text-lg leading-relaxed",
            variant === "default" ? "text-muted-foreground" : "text-primary-foreground/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export { SectionHeading };