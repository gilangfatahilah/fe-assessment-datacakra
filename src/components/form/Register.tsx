import { useActionState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "@/actions/auth";

import Input from "../ui/Input";
import Button from "../ui/Button";

const RegisterForm = () => {
  const [state, action, isPending] = useActionState(register, undefined);

  useEffect(() => {
    //Todo: render toast when some error occurred

    console.log(state);
  }, [state]);

  return (
    <form action={action} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6 space-y-2">
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

      <div className="col-span-6 space-y-2">
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

      <div className="col-span-6 space-y-2">
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

      <div className="col-span-6 flex flex-col items-center gap-4">
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
