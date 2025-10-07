import { AuthForm } from '@/components/auth-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
       <div
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-10 dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 60%)',
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Logo className="h-20 w-20 text-primary" />
          <h1 className="mt-6 text-3xl font-bold text-center font-headline text-foreground md:text-4xl">
            Welcome to Dental Intellect
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            Your AI-Powered Dental Health Partner
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
