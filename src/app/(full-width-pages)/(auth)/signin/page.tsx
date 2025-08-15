import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " SignIn Page | karkard",
  description: "صفحه ورود کارکرد",
};

export default function SignIn() {
  return <SignInForm />;
}
