import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-20 h-20 sm:w-32 sm:h-32",
    md: "w-24 h-24 sm:w-32 sm:h-32 -my-2 sm:-my-6",
    lg: "w-40 h-40 sm:w-52 sm:h-52",
  };

  return (
    <div className="flex items-center gap-2 group">
      <div className={`${sizeClasses[size]} relative group-hover:scale-105 transition-all z-10 flex-shrink-0`}>
        <Image
          src="/logo.png"
          alt="Zurich Fast String Logo"
          width={size === "sm" ? 128 : size === "md" ? 128 : 208}
          height={size === "sm" ? 128 : size === "md" ? 128 : 208}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="hidden sm:flex flex-col">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
            Zurich <span className="text-brand">Fast</span> String
          </h1>
        </div>
      )}
    </div>
  );
}
