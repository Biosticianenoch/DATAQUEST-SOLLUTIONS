import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "info";
  title?: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, children, ...props }, ref) => {
    const icons = {
      default: Info,
      success: CheckCircle,
      error: XCircle,
      info: AlertCircle,
    };

    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          {
            "bg-background text-foreground": variant === "default",
            "bg-green-50 text-green-800 border-green-200": variant === "success",
            "bg-red-50 text-red-800 border-red-200": variant === "error",
            "bg-blue-50 text-blue-800 border-blue-200": variant === "info",
          },
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-4">
          <Icon className="h-5 w-5" />
          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-medium leading-none tracking-tight">
                {title}
              </h5>
            )}
            <div className="text-sm [&_p]:leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert }; 