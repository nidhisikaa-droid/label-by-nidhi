type RatingProps = {
  value: number;
  size?: number;
  className?: string;
};

export default function Rating({ value, size = 14, className = "" }: RatingProps) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && hasHalf);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </span>
  );
}
