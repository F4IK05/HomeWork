import React, { useEffect, useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { UserIcon } from '@heroicons/react/24/solid';

function SignButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [signPage, setSignPage] = useState('signin');

    const toggleModal = () => setIsOpen(prevState => !prevState);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            return (() => setSignPage('signin'));
        }

    })


    return (
        <>
            <button onClick={toggleModal} className='ml-3 p-2 bg-stone-200 text-stone-500 cursor-pointer rounded-full'>
                <UserIcon className='w-6 h-6' />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 relative" >
                        <button onClick={toggleModal} className="absolute top-0 right-2 text-gray-500 hover:text-black text-[30px]">
                            ×
                        </button>
                        { signPage === 'signin' ? (
                            <SignInForm switchToSignUp={() => setSignPage('signup')}/>
                        ) : (
                            <SignUpForm switchToSignIn={() => setSignPage('signin')}/>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default SignButton