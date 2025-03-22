import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">SplitEase</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Split expenses with your friends, hassle-free
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    SplitEase makes it easy to track shared expenses, settle
                    debts, and keep everyone on the same page. Perfect for
                    students sharing apartments, planning trips, or managing
                    group activities.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-lg bg-muted p-4 shadow-lg">
                  <div className="absolute left-4 top-4 right-4 h-10 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium">
                    Apartment Expenses
                  </div>
                  <div className="absolute left-4 top-16 right-4 space-y-3">
                    <div className="rounded-md bg-card p-3 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Groceries</div>
                          <div className="text-xs text-muted-foreground">
                            Added by Alex
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$45.80</div>
                          <div className="text-xs text-muted-foreground">
                            You owe $15.27
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md bg-card p-3 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Electricity</div>
                          <div className="text-xs text-muted-foreground">
                            Added by You
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$78.35</div>
                          <div className="text-xs text-green-500">
                            Alex owes you $39.18
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md bg-card p-3 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Internet</div>
                          <div className="text-xs text-muted-foreground">
                            Added by Sam
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$60.00</div>
                          <div className="text-xs text-muted-foreground">
                            You owe $20.00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-md bg-primary p-3 text-center font-medium text-primary-foreground">
                    Settle up
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Features designed for student life
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                SplitEase makes expense sharing simple with features tailored to
                student needs.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <feature.icon className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 SplitEase. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Group Expenses",
    description:
      "Create groups for roommates, trips, or events and track all shared expenses in one place.",
    icon: function GroupIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7V5c0-1.1.9-2 2-2h2" />
          <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
          <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
          <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
          <rect width="7" height="5" x="7" y="7" rx="1" />
          <rect width="7" height="5" x="10" y="12" rx="1" />
        </svg>
      );
    },
  },
  {
    title: "Split Multiple Ways",
    description:
      "Split bills equally, by percentage, or by specific amounts to match your exact situation.",
    icon: function SplitIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 3h5v5" />
          <path d="M8 3H3v5" />
          <path d="M21 16v5h-5" />
          <path d="M3 16v5h5" />
          <path d="m21 3-9 9" />
          <path d="m12 12-9 9" />
        </svg>
      );
    },
  },
  {
    title: "Simplified Settlements",
    description:
      "See who owes what at a glance and settle debts with minimal transactions.",
    icon: function SettleIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
          <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
          <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" />
          <path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" />
        </svg>
      );
    },
  },
  {
    title: "Expense Categories",
    description:
      "Categorize expenses to track spending patterns and budget more effectively.",
    icon: function CategoryIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      );
    },
  },
  {
    title: "Expense History",
    description:
      "Keep a complete record of all expenses and payments for future reference.",
    icon: function HistoryIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
      );
    },
  },
  {
    title: "Mobile Friendly",
    description:
      "Access your expenses on the go with a fully responsive design optimized for mobile devices.",
    icon: function MobileIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    },
  },
];
