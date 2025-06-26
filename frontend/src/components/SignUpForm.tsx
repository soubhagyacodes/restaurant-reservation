
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const passwordRegex = /^(?=(?:.*[a-z]){2,})(?=(?:.*[A-Z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+;':"\\|,.<>\/?`\-=\[\]{}]){1,}).{8,}$/

const formSchema = z.object({
  name: z.string().nonempty("Name cannot be empty").max(40, {message: "Name can't be larger than 40 characters"}).trim(),
  email: z.string().nonempty("Email cannot be empty").email("Not a valid email").trim(),
  passwordHash: z.string().nonempty("Password cannot be empty").regex(passwordRegex, {message: "Password must be strong with 2{a-z}, 2{A-Z}, 2{0-9}, 2 symbols and minimum length of 8"}),
  confirmPassword: z.string().nonempty("Confirm Password cannot be empty"),
  role: z.enum(["CUSTOMER", "OWNER"], {
    message: "Should be something out of customer or owner"
  })
}) .refine((data) => data.passwordHash === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type formType = z.infer<typeof formSchema>

export default function SignUpForm() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      passwordHash: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: formType) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-[Rubik]">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your Name..." {...field} className="w-85 h-10" />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your Email..." {...field} className="w-85 h-10" />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordHash"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Set your Password..." {...field} className="w-85 h-10" />
              </FormControl>
              <FormMessage className="text-xs w-full max-w-[300px]"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Confirm Password..." {...field} className="w-85 h-10" />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="font-[Rubik] text-[14px]">
                      Register as:
                    </div>
                    <div className="flex-1">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUSTOMER">Customer</SelectItem>
                        <SelectItem value="OWNER">Owner</SelectItem>
                      </SelectContent>
                    </div>
                  </div>
                </Select>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-orange-500/90 hover:bg-orange-500/80 h-10 mt-3">Sign Up</Button>
      </form>
    </Form>
  )
}
