import { Input } from "@nextui-org/input";
import { title } from "@/components/primitives";
import { Button } from "@/components/Button";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 p-4">
      <div>
        <img alt="loginImg" src="/loginImg.png" />
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-md w-full space-y-5">
          <h1 className={title({ color: "coklat" })}>Silahkan Login</h1>
          <hr className="h-1 bg-black" />
          <form action="/api/auth/login" className="space-y-2" method="post">
            <Input
              required
              id="email"
              label="Email"
              name="email"
              type="email"
            />
            <Input
              required
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            <Button className="w-full" color="primary" type="submit">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
