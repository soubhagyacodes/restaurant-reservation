import type { loginFormType } from "@/components/SignInForm"
import type { registerformType } from "@/components/SignUpForm"
import axios from '../config/axios';
import { AxiosError } from "axios";
import { toast } from "sonner"

export const loginUser = (values: loginFormType) => {
    return axios.post('/api/auth/login', values, { withCredentials: true })
}

export const registerUser = (values: registerformType) => {
    return axios.post('/api/auth/register', values, {withCredentials: true})
}

export const fetchUser = () => {
    return axios.get('/api/auth/me', { withCredentials: true })
}

export const handleFetchUserError = (error: unknown, loadingID: string | number) => {
    if (error instanceof AxiosError) {
          if (error.response) {
            console.log("User is not allowing third party cookies: ", error)
            toast.error("You need to enable third-party cookies in order to login", {description: "Change your cookie preferences.", id:loadingID})
          }
          else if (error.request) {
            console.log("Error while fetching the user details from the server (server didn't respond): ", error)
            toast.error("Something Went Wrong. Login Again", {description: "There was an in issue getting your details.", id: loadingID})

          }
          else {
            console.log("Error while setting up the request for fetching the user details: ", error)
            toast.error("Something Went Wrong. Login Again", {description: "There was an in issue getting your details.", id: loadingID})

          }
        }
        else {
          console.log("Something went wrong when finding the user details: ", error)
            toast.error("Something Went Wrong. Login Again", {description: "There was an in issue getting your details.", id: loadingID})

        }
}

export const handleLoginError = (error: unknown, loadingID: string | number) => {
    if (error instanceof AxiosError) {
        if (error.response) {
          toast.error("Something Went Wrong", { description: error.response.data.msg, id: loadingID })
          console.log("Error when signing in, response received: ", error.response);
        } else if (error.request) {
          toast.error("Something Went Wrong", { description: "Please try again later.", id: loadingID })
          console.log("Error when signing in, server didn't respond: ", error)
        } else {
          toast.error("Something Went Wrong", { description: "Please try again.", id: loadingID })
          console.log("Error when signing in, problem in the request setup: ", error)
        }
      } else {
        console.log(error)
        toast.error("Something Went Wrong", { description: "Please try again after some time", id: loadingID })
      }
}

export const handleRegisterError = (error: unknown, loadingID: string | number) => {
      if (error instanceof AxiosError) {
        if (error.response) {
        toast.error("Something Went Wrong", {description: error.response.data.msg, id: loadingID})
        console.log("Error when signing up, response received: ", error.response);
      } else if (error.request) {
        toast.error("Something Went Wrong", {description: "Please try again later.", id: loadingID})
        console.log("Error when signing up, server didn't respond: ", error)
      } else {
        toast.error("Something Went Wrong", {description: "Please try again.", id: loadingID})
        console.log("Error when signing up, problem in the request setup: ", error)
      }
      } else {
        console.log(error)
        toast.error("Something Went Wrong", {description: "Please try again after some time", id: loadingID})
      }
}