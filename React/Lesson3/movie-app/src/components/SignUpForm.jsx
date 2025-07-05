import React, { useRef } from 'react';

function SignUpForm({ switchToSignIn }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Email:', emailRef.current.value);
        console.log('Password:', passwordRef.current.value);
        console.log('Confirm:', confirmPasswordRef.current.value);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className='text-[30px] text-center font-bold'>Sign Up</h2>
            <input type="text" ref={emailRef} placeholder="Email" required className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-black" />
            <input type="password" ref={passwordRef} placeholder="Password" required className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-black" />
            <input type="password" ref={confirmPasswordRef} placeholder="Confirm password" required className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-black"/>

            <p className='text-right text-sm'>
                Already have an account?
                <span onClick={switchToSignIn} className="pl-2 text-blue-600 cursor-pointer hover:underline">
                    Sign In
                </span>
            </p>

            <button className="bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:outline transition">Create account</button>
        </form>
    );
}

export default SignUpForm;