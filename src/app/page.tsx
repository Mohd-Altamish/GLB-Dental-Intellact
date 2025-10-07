import { AuthForm } from '@/components/auth-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Logo className="h-16 w-16 text-primary" />
          <h1 className="mt-4 text-3xl font-bold text-center font-headline text-foreground">
            GLB Dental Intellect
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            AI-Powered Dental Health Assessment
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
