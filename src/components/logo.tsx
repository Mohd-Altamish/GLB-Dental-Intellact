import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', className)}
    >
      <path d="M7 21V15C7 13.3431 8.34315 12 10 12H14C15.6569 12 17 13.3431 17 15V21" />
      <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12" />
      <path d="M12 6C10.5 6 9.5 3 12 3C14.5 3 13.5 6 12 6Z" />
    </svg>
  );
}
