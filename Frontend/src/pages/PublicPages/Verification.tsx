
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { verificationSchema } from "@/schema/Form"
import { useNavigate } from "react-router-dom"
import {  useMutation} from "@tanstack/react-query"
import { useVerifyAccountApi } from "@/services/api/auth"
import { useState } from "react"

export type VerificationFormProps = z.infer<typeof verificationSchema>


const Verification = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>()
    const [backendError, setBackendError] = useState<string | null>()
    const navigate = useNavigate()
    const verifyEmail = useMutation({
        mutationFn:useVerifyAccountApi,
        onSuccess: (data) => {
            console.log(data)
            console.log('message',data?.message)
          const successMessage = data?.message || 'Successfully registered!';
          setSuccessMessage(successMessage);
         setTimeout(() => {
            navigate("/login")
         },4000)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error:any) => {
            const errorMessage = error.response?.data?.message || "An error occurred";
            setBackendError(errorMessage)
        }
    })

    const form = useForm<VerificationFormProps>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
        code: "",
        },
    })

    const onSubmit = async(data:VerificationFormProps) => {
       await verifyEmail.mutateAsync(data)
    }

    const showError = form.formState.errors.code?.message  || backendError



    return (
        <section className=' w-full flex items-center justify-center' style={{ height: 'calc(100vh - 200px)' }}>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' min-h-72 w-full max-w-xl flex flex-col space-y-10 p-10 px-8 md:px-16 border border-potters-clay-500 rounded-md bg-potters-clay-600 dark:bg-white bg-opacity-15'>
                <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="dark:text-gray-400">Verification Code</FormLabel>
                    <FormControl>
                        <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormDescription>
                        Please enter the one-time password sent to your phone.
                    </FormDescription>
                    </FormItem>
                )}
                />

                {(showError  || successMessage) && (
                        <div className={`border border-potters-clay-400 py-2 rounded text-center ${showError ? 'bg-red-500 bg-opacity-55' : 'bg-green-900 bg-opacity-55'}`}>
                            {showError  ? <p>{showError }</p> : <p>{successMessage}</p>}
                        </div>
                )}

                <Button type="submit" className="dark:bg-potters-clay-200">Submit</Button>
            </form>
            </Form>
        </section>
    )
}

export default Verification