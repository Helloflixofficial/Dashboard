import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto mb-4">
            <span className="text-xl font-bold">N</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to NovaCRM</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border-border",
            },
          }}
        />
      </div>
    </div>
  )
}
