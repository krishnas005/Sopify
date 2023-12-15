'use client';

import InputComponent from "@/components/FormElements/InputComponent";
import { loginFormControls } from "@/utils";
import Link from "next/link";
import { useContext, useState } from "react";
import { login } from "@/services/login";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ComponentLevelLoader from "@/components/ComponentLoader";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const initialData = {
    email: '',
    password: ''
}

const Page = () => {

    const router  = useRouter();

    const [formData,setFormData] = useState(initialData);

    const {isAuthUser,setIsAuthUser,user,setUser,componentLevelLoader,setComponentLevelLoader} = useContext(GlobalContext);

    function isValidForm() {
        return formData &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
        }

    async function handleLogin() {
        setComponentLevelLoader({loading:true,id:""});
        const res = await login(formData);
        // console.log(res)
        if(res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(true);
            setUser(res?.finalData?.user);
            setFormData(initialData);
            Cookies.set('token', res?.finalData?.token);
            localStorage.setItem('user',JSON.stringify(res?.finalData?.user))
            setComponentLevelLoader({loading:false,id:""});
            router.push('/')
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(false);
            setComponentLevelLoader({loading:false,id:""});
        }
    }

    // console.log(isAuthUser,user);

    return (
    <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                    <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                        <p className="w-full text-4xl font-medium text-center font-serif">Login</p>
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                            {
                                loginFormControls.map((controlItem) => (
                                    <InputComponent
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    key={controlItem.label}
                                    value={formData[controlItem.id]}
                                    onChange={(e)=>{
                                        setFormData({
                                            ...formData,
                                            [controlItem.id]:e.target.value,
                                        })
                                    }}
                                    />
                                ))
                            }
                                <button
                                className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                disabled={!isValidForm()}
                                onClick={handleLogin}
                                >
                                    {
                                        componentLevelLoader && componentLevelLoader.loading ? (<ComponentLevelLoader
                                        text={"Logging In"}
                                        color={"#ffffff"}
                                        loading={componentLevelLoader && componentLevelLoader.loading}
                                        />) : ('Login'
                                    )}
                                </button>
                                <div className="text-center">
                                    Don&apos;t have an account? <Link href="/signup" className="text-blue-500 font-semibold">Register</Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Notification/>
    </div>
    )
}

export default Page;
