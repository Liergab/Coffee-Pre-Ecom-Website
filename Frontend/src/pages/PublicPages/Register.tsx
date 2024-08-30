import { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { registerSchema } from '@/schema/Form'
import {z} from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { MdAlternateEmail } from "react-icons/md";
import coffeeCup from '../../assets/icons/coffeeCup.png'
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye,FiEyeOff } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {  useRegisterApi } from '@/services/api/auth'

export type registerFormProps = z.infer<typeof registerSchema> 

const Register = () => {
    const [isPasswordShow,setIsPasswordShow] = useState<boolean>(false)
    const [isConPasswordShow, setIsConPasswordShow] = useState<boolean>(false)
    const [backendError, setBackendError] = useState<string | null>()
    const [successMessage, setSuccessMessage] = useState<string |null>()

    const navigate = useNavigate()
    const registerMutation = useMutation({
        mutationFn:useRegisterApi,
        onSuccess:(data) => {
          console.log(data)
          const successMessage = data?.message || 'Successfully registered!';
          setSuccessMessage(successMessage);
          setTimeout(() => {
            navigate("/verification")
          }, 4000)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error:any) => {
           const errorMessage = error.response?.data?.message || "An error occurred";
           setBackendError(errorMessage)
        }
    })

    const form = useForm<registerFormProps>({
        resolver:zodResolver(registerSchema),
        defaultValues: {
            firstName:'',
            lastName:'',
            email: '', 
            password: '',
            password_confirmation:''
        }
    })

    const onSubmit = async(value:registerFormProps) => {
        await registerMutation.mutateAsync(value)
    }

    useEffect(() => {
        if(form.formState.isSubmitSuccessful){
            form.reset()
        }
    },[ form, form.reset, form.formState.isSubmitSuccessful])

    const errorToShow =
    form.formState.errors.email?.message ||
    form.formState.errors.password?.message ||
    form.formState.errors.firstName?.message ||  
    form.formState.errors.lastName?.message ||   
    form.formState.errors.password_confirmation?.message ||  
    backendError;
  

  return (
    <section className=' w-full flex items-center justify-center' style={{ height: 'calc(100vh - 200px)' }}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' min-h-96 w-full max-w-xl flex flex-col space-y-10 p-10 px-8 md:px-16 border border-potters-clay-500 rounded-md bg-potters-clay-600 bg-opacity-15'>    
                <div>
                    <h1 className='text-left text-4xl font-bold flex items-center'>
                        Register
                        <span className="">
                            <img src={coffeeCup} alt="" className="w-14 h-14 " />
                        </span>
                    </h1>
                    <p>Please input your credential to countinue</p>
                </div>
                <div className='flex w-full flex-col space-y-4'>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                          <FormItem>
                                <FormControl>
                                <Input
                                    placeholder="FirstName" {...field}  
                                    className='w-full' 
                                    startIcon={FaRegUser} 
                                />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                          <FormItem>
                                <FormControl>
                                <Input
                                    placeholder="LastName" {...field}  
                                    className='w-full' 
                                    startIcon={FaRegUser} 
                                />
                                </FormControl>
                            </FormItem>
                        )}
                    />
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
                     <FormField
                         control={form.control}
                         name="password_confirmation"
                         render={({field}) => (
                            <FormItem>
                                <FormControl>
                                <Input
                                    type={isConPasswordShow ?'text':'password'}
                                    placeholder="Password" {...field}  
                                    className='w-full' 
                                    startIcon={RiLockPasswordLine } 
                                    endIcon={isConPasswordShow ? FiEye : FiEyeOff }
                                    click={() => setIsConPasswordShow(prev => !prev)}
                                />
                                </FormControl>
                            </FormItem>
                         )}
                    />
                  {(errorToShow || successMessage) && (
                        <div className={`border border-potters-clay-400 py-2 rounded text-center ${errorToShow ? 'bg-red-500 bg-opacity-55' : 'bg-green-900 bg-opacity-55'}`}>
                            {errorToShow ? (
                                <p>{errorToShow}</p>
                            ) : (
                                successMessage?.split('\n').map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))
                            )}
                        </div>
                    )}
                    <div className='flex flex-col w-full space-y-3'>
                        <Button type='submit' 
                            disabled={registerMutation.isPending}
                            className='button-login hover:bg-potters-clay-700'
                        >
                            {registerMutation.isPending ?<><CgSpinner className='w-6 h-6 animate-spin'/> Register</> : 'Register'}
                        </Button>
                         <h1 className='text-center'>
                            Already have account?{" "}
                            <span>
                                <Link to='/login' className='underline'>
                                    Login here
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

export default Register