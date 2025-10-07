import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-6 w-6', className)}
        >
        <g fill="currentColor">
            {/* Shield shape */}
            <path
            d="M50,2.5A47.5,47.5 0 0 0 2.5,50V80A10,10 0 0 0 12.5,90H87.5A10,10 0 0 0 97.5,80V50A47.5,47.5 0 0 0 50,2.5"
            className="text-amber-700"
            fill="currentColor"
            />
            {/* Inner shield */}
            <path
            d="M50,10A40,40 0 0 0 10,50V75A5,5 0 0 0 15,80H85A5,5 0 0 0 90,75V50A40,40 0 0 0 50,10"
            className="text-amber-400"
            fill="currentColor"
            />
            {/* Inner circle */}
            <circle cx="50" cy="50" r="30" className="text-amber-700" fill="currentColor" />
            {/* Text */}
            <text
            x="50"
            y="62"
            fontFamily="serif"
            fontSize="30"
            className="text-amber-400"
            fill="currentColor"
            textAnchor="middle"
            fontWeight="bold"
            >
            GLB
            </text>
        </g>
    </svg>
  );
}
