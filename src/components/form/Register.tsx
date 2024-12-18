import { useActionState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

import Input from "../ui/Input";
import Button from "../ui/Button";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [state, action, isPending] = useActionState(register, undefined);

  /**
   * Listen to response form action if success it will redirected to dashboard.
   */
  useEffect(() => {
    if (state?.success) {
      navigate("/dashboard");
    }
  }, [state, navigate]);

  return (
    <form action={action} className="mt-8 flex flex-col items-center gap-6">
      <div className="w-full space-y-2">
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>

        <Input
          defaultValue={state?.data?.username}
          type="text"
          id="username"
          name="username"
        />
      </div>

      <div className="w-full space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>

        <Input
          defaultValue={state?.data?.email}
          type="email"
          id="email"
          name="email"
        />
      </div>

      <div className="w-full space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>

        <Input
          defaultValue={state?.data?.password}
          type="password"
          id="password"
          name="password"
        />
      </div>

      <div className="w-full space-y-2">
        <label
          htmlFor="password-confirmation"
          className="block text-sm font-medium"
        >
          Password Confirmation
        </label>

        <Input
          defaultValue={state?.data?.password_confirmation}
          type="password"
          id="password-confirmation"
          name="password_confirmation"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button className="w-full" disabled={isPending}>
          {isPending ? "Please wait" : "Register"}
        </Button>

        <p className="mt-4 text-sm text-muted-foreground sm:mt-0">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary underline">
            Log in
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
