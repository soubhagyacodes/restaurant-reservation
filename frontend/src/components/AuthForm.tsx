import { Button } from "@/components/ui/button"

interface AuthFormProps {
  name: string
  desc: string
  Form: React.ComponentType
}

export default function AuthForm({name, desc, Form} : AuthFormProps) {
  return (
    <div>
      <div className="font-[Ubuntu] mb-4">
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <h3 className="text-gray-400 ">{desc}</h3>
      </div>

      {Form && <Form />}
      <div className="flex items-center my-4">
        <hr className="flex-1"/>
        <p className="text-gray-500 text-center mx-3 mb-1"> or  </p>
        <hr className="flex-1 "/>
      </div>

      <Button className="w-full h-11 font-[Ubuntu]" variant="outline">
        <img src="../../Google.png" alt="Google" className="size-5 mr-1"/>  Continue with Google
      </Button>
    </div>
  )
}

