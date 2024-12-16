import { useActionState, useEffect } from "react";
import { login } from "@/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [state, action, isPending] = useActionState(login, undefined);

  /**
   * Listen to response form action if success it will redirected to dashboard.
   */
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    if (!state?.error && state?.success) {
      setUser(state.response.user);
      navigate("/dashboard");
    }
  }, [state, navigate, setUser]);

  return (
    <form action={action} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6 space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>

        <Input
          defaultValue={state?.data?.identifier}
          type="email"
          id="email"
          name="identifier"
        />
      </div>

      <div className="col-span-6 space-y-2">
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

      <div className="col-span-6 flex flex-col items-center gap-4">
        <Button className="w-full" disabled={isPending}>
          {isPending ? "Please wait" : "Login"}
        </Button>

        <p className="mt-4 text-sm text-muted-foreground sm:mt-0">
          Doesn't have an account?{" "}
          <Link to={"/register"} className="text-primary underline">
            Register
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
