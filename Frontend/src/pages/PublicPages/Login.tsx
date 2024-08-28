import { useState } from 'react'
import {useForm} from 'react-hook-form'
import { loginSchema } from '@/schema/Form'
import {z} from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { MdAlternateEmail } from "react-icons/md";
import coffeeToGo from '../../assets/icons/coffeeToGo.png'
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye,FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useLoginApi } from '@/services/api/auth'

export type loginFormProps = z.infer<typeof loginSchema> 

const Login = () => {
    const [isPasswordShow,setIsPasswordShow] = useState<boolean>(false)
    const [backendError, setBackendError] = useState<string | null>()
    const [successMessage, setSuccessMessage] = useState<string |null>()
    const loginMutation = useMutation({
        mutationFn:useLoginApi,
        onSuccess:() => {
            setSuccessMessage('Successfully Login!')
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error:any) => {
           const errorMessage = error.response?.data?.message || "An error occurred";
           setBackendError(errorMessage)
        }
    })

    const form = useForm<loginFormProps>({
        resolver:zodResolver(loginSchema),
        defaultValues: {
            email: '', 
            password: '',
        }
    })

    const onSubmit = async(value:loginFormProps) => {
        await loginMutation.mutateAsync(value)
    }
    const errorToShow = form.formState.errors.email?.message || form.formState.errors.password?.message || backendError;
    const successToShow = successMessage
  return (
    <section className=' w-full flex items-center justify-center' style={{ height: 'calc(100vh - 200px)' }}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' min-h-96 w-full max-w-xl flex flex-col space-y-10 p-10 px-8 md:px-16 border border-potters-clay-500 rounded-md'>    
                <div>
                    <h1 className='text-left text-4xl font-bold flex items-center'>
                        Login
                        <span className=" transform rotate-45">
                            <img src={coffeeToGo} alt="" className="w-14 h-14 " />
                        </span>
                    </h1>
                    <p>Please input your credential to countinue</p>
                </div>
                <div className='flex w-full flex-col space-y-4'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Input
                                    placeholder="Email Address" {...field}  
                                    className='w-full' 
                                    startIcon={MdAlternateEmail } 
                                />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                         control={form.control}
                         name="password"
                         render={({field}) => (
                            <FormItem>
                                <FormControl>
                                <Input
                                    type={isPasswordShow ?'text':'password'}
                                    placeholder="Password" {...field}  
                                    className='w-full' 
                                    startIcon={RiLockPasswordLine } 
                                    endIcon={isPasswordShow ? FiEye : FiEyeOff }
                                    click={() => setIsPasswordShow(prev => !prev)}
                                />
                                </FormControl>
                            </FormItem>
                         )}
                    />
                  {(errorToShow || successToShow) && (
                        <div className={`border border-potters-clay-400 py-2 rounded text-center ${errorToShow ? 'bg-red-500 bg-opacity-55' : 'bg-green-900 bg-opacity-55'}`}>
                            {errorToShow ? <p>{errorToShow}</p> : <p>{successToShow}</p>}
                        </div>
                    )}
                    <div className='flex flex-col w-full space-y-3'>
                        <Button type='submit'>Login</Button>
                         <h1 className='text-center'>
                            Already have account?{" "}
                            <span>
                                <Link to='/register' className='underline'>
                                    register here
                                </Link>
                            </span>
                         </h1>
                    </div>
                    
                    
                </div>
            </form>
        </Form>

       
    </section>
  )
}

export default Login