import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  fallback,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${className}`}
      >
        {fallback || <ImageIcon className="w-8 h-8 text-muted-foreground" />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
