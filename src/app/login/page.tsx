import { login, signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-[400px] ">
        <CardHeader>
          <CardTitle>HMTT Website Dasboard</CardTitle>
          <CardDescription>Welcome to HMTT Website Dasboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                />
              </div>
            </div>

            <Button className="w-full mt-6" type="submit" formAction={login}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
