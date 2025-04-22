import { SignedIn, UserButton } from "@clerk/nextjs";

export default function AppSideBarFooter() {
  return (
    <SignedIn>
      <UserButton showName />
    </SignedIn>
  );
}
