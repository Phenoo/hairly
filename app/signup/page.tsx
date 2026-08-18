import { AuthPage } from "@/components/auth-ui";

export const metadata = {
  title: "Create an account | A-Glory Hair and Cosmetics",
};

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
