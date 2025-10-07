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
        <g fill="none" strokeWidth="0">
            {/* Ribbon */}
            <path d="M 5 65 L 20 70 L 20 85 L 5 80 Z" fill="#DAA520" />
            <path d="M 95 65 L 80 70 L 80 85 L 95 80 Z" fill="#DAA520" />
            <path d="M 15 70 L 85 70 L 80 85 L 20 85 Z" fill="#800000" />
            <path d="M 50 60 L 80 70 L 20 70 Z" fill="#B8860B" />

             {/* Laurels */}
            <g fill="#CD853F">
                <path d="M 25,20 A 40 40 0 0 1 50,10" stroke="#CD853F" strokeWidth="3" />
                <path d="M 75,20 A 40 40 0 0 0 50,10" stroke="#CD853F" strokeWidth="3" />
                
                <g transform="translate(28, 25) rotate(-30)">
                    <ellipse cx="0" cy="0" rx="3" ry="1.5" />
                    <ellipse cx="0" cy="5" rx="3" ry="1.5" />
                    <ellipse cx="0" cy="10" rx="3" ry="1.5" />
                    <ellipse cx="0" cy="15" rx="3" ry="1.5" />
                </g>
                 <g transform="translate(72, 25) rotate(30)">
                    <ellipse cx="0" cy="0" rx="3" ry="1.5" />
                    <ellipse cx="0" cy="5" rx="3" ry="1.5" />
                    <ellipse cx="0" cy="10" rx="3" ry="1.5" />
                    <ellipse cx="0" cy="15" rx="3" ry="1.5" />
                </g>
            </g>

            {/* Main Shield */}
            <path d="M 50 15 C 20 15, 15 40, 15 50 C 15 70, 30 80, 50 80 C 70 80, 85 70, 85 50 C 85 40, 80 15, 50 15 Z" fill="#DAA520" />
            <circle cx="50" cy="50" r="28" fill="#5C4033" />
            <circle cx="50" cy="50" r="25" stroke="#DAA520" strokeWidth="2" fill="none"/>

            {/* GLB Monogram - Simplified */}
            <text
                x="50"
                y="58"
                fontFamily="serif"
                fontSize="24"
                fill="#DAA520"
                textAnchor="middle"
                fontWeight="bold"
            >
                GLB
            </text>
        </g>
    </svg>
  );
}
