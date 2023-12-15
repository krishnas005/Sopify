"use client";

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import { signUp } from "@/services/signup";
import { registrationFormControls } from "@/utils"
import Link from "next/link"
import { useContext,useState,useEffect } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import Notification from "@/components/Notification";
import ComponentLevelLoader from "@/components/ComponentLoader";

const initialForm = {
    name:'',
    email:'',
    password:'',
    role:'customer'
}

const Page = () => {

    const router = useRouter();
    const [isRegistered, setIsRegistered] = useState(false);
    const { pageLevelLoader, setPageLevelLoader , isAuthUser } = useContext(GlobalContext);

    const [formData,setFormData] = useState(initialForm);

    function isFormValid() {
        return formData &&
            formData.name &&
            formData.name.trim() !== "" &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
        }

    async function handleRegister(e) {
        setPageLevelLoader(true);
        const data = await signUp(formData);
        
        if (data.success) {
            toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            });
            setIsRegistered(true);
            setPageLevelLoader(false);
            setFormData(initialForm);
        } else {
            toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            });
            setPageLevelLoader(false);
            setFormData(initialForm);
        }
    }
    
    useEffect(() => {
        if (isAuthUser) router.push("/");
      }, [isAuthUser]);

    // console.log(formData)
    
    return (
    <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                    <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                        <p className="w-full text-4xl font-medium text-center font-serif">Register</p>
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                            {
                                registrationFormControls.map((controlItem) =>
                                controlItem.componentType === "input" ? (
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
                                        });
                                    }}
                                    />
                                ) : controlItem.componentType === "select" ? (
                                    <SelectComponent
                                    options={controlItem.options}
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
                                    ) : null
                                )}
                                <button
                                className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                disabled={!isFormValid()}
                                onClick={handleRegister}
                                >
                                    {pageLevelLoader ? (
                                    <ComponentLevelLoader
                                    text={"Registering"}
                                    color={"#ffffff"}
                                    loading={pageLevelLoader}
                                    />
                                ) : (
                                    "Register"
                                )}
                                </button>
                                <div className="text-center">
                                    Already have an account? <Link href="/login" className="text-blue-500 font-semibold">Login</Link>
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

export default Page
