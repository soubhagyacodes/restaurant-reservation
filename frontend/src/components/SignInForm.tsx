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
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"

const formSchema = z.object({
  email: z.string().nonempty("Email cannot be empty").email("Not a valid email").trim(),
  password: z.string().nonempty("Password cannot be empty"),
  role: z.enum(["CUSTOMER", "OWNER"], {
    message: "Should be something out of customer or owner"
  })
})

type formType = z.infer<typeof formSchema>

export default function SignInForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // hari@gmail.com
  // ssSS12@#
  // OWNER

  async function onSubmit(values: formType) {
    setLoading(true)
    const loadingID = toast.loading("Loading...", {description: "Please wait while we serve"})
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', values, {withCredentials: true})
      setLoading(false)
      navigate("/PROTECTED_ROUTE")
      toast.success(response.data.msg, {description: "Welcome to plated.", id: loadingID})
    } catch (error) {
      setLoading(false)
      if (error instanceof AxiosError) {
        if (error.response) {
        toast.error("Something Went Wrong", {description: error.response.data.msg, id: loadingID})
        console.log("Error when signing in, response received: ", error.response);
      } else if (error.request) {
        toast.error("Something Went Wrong", {description: "Please try again later.", id: loadingID})
        console.log("Error when signing in, server didn't respond: ", error)
      } else {
        toast.error("Something Went Wrong", {description: "Please try again.", id: loadingID})
        console.log("Error when signing in, problem in the request setup: ", error)
      }
      } else {
        console.log(error)
        toast.error("Something Went Wrong", {description: "Please try again after some time", id: loadingID})
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-[Rubik]">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email..." {...field} className="w-85 h-10" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} className="w-85 h-10" />
              </FormControl>
              <FormMessage className="text-xs" />
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
                      Sign in as:
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
        {loading ? <Button type="submit" className="w-full bg-orange-500/80 h-10 mt-3" disabled={true}><Loader2Icon />Please wait</Button>
        : <Button type="submit" className="w-full bg-orange-500/90 hover:bg-orange-500/80 h-10 mt-3">Sign In</Button>}
      </form>
    </Form>
  )
}
