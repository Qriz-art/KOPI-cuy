import Icon from "@/components/Icon";

export default function StarRating({ value = 5, className = "h-4 w-4", label }) {
  const rounded = Math.round(value);

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={label ?? `Rating ${value} dari 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          className={`${className} ${star <= rounded ? "text-amberglow" : "text-espresso/15"}`}
        />
      ))}
    </span>
  );
}
