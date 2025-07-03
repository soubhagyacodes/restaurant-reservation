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
import { toast } from "sonner"
import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label"
import useAuth from "@/hooks/useAuth"
import { fetchUser, handleFetchUserError, handleLoginError, loginUser } from "@/api/auth"

const formSchema = z.object({
  email: z.string().nonempty("Email cannot be empty").email("Not a valid email").trim(),
  password: z.string().nonempty("Password cannot be empty"),
  role: z.enum(["CUSTOMER", "OWNER"], {
    message: "Should be something out of customer or owner"
  }),
  persist: z.boolean()
})

export type loginFormType = z.infer<typeof formSchema>

export default function SignInForm() {
  const navigate = useNavigate()
  const [btnloading, setbtnLoading] = useState(false)
  const { setUser, setLoading } = useAuth()

  const form = useForm<loginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      persist: false
    },
  })

  async function onSubmit(values: loginFormType) {
    setbtnLoading(true)
    const loadingID = toast.loading("Loading...", { description: "Please wait while we log you in." })
    try {
      const response = await loginUser(values)

      try {
        setLoading(true)
        const userResponse = await fetchUser()
        setUser(userResponse.data)
        if (userResponse.data.role === "CUSTOMER") {
          navigate("/restaurants")
        }

        else if (userResponse.data.role === "OWNER") {
          navigate("/ownerhome")
        }
        toast.success(response.data.msg, { description: "Welcome to plated.", id: loadingID })

      } catch (error) {
        handleFetchUserError(error)
      }
      finally {
        setLoading(false)
      }


    } catch (error) {
      handleLoginError(error, loadingID)
    }
    finally {
      setbtnLoading(false)
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
        <FormField
          control={form.control}
          name="persist"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2 mt-3">
                  <Checkbox id="persist" checked={field.value} onCheckedChange={field.onChange} className="border-1 border-gray-400/70 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                  <Label htmlFor="persist" className="text-[13px] mt-[2px]">Keep me logged in for 7 days</Label>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {btnloading ? <Button type="submit" className="w-full bg-orange-500/80 h-10" disabled={true}><Loader2Icon className="animate-spin" />Please wait</Button>
          : <Button type="submit" className="w-full bg-orange-500/90 hover:bg-orange-500/80 h-10">Sign In</Button>}
      </form>
    </Form>
  )
}
