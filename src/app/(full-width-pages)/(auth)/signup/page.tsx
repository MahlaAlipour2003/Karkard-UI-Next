import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp Page | karkard",
  description: "صفحه ثبت نام سامانه کارکرد",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
