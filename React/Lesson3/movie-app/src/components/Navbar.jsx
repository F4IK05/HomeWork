import React from 'react';
import SearchForm from './SearchForm';

const Navbar = ({setValue}) => {
    return (
        <div className="w-full bg-white text-black ">
            <div className="px-10">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-xl font-bold">
                        <a href="/">SearchMovie</a>
                    </div>

                    <div>
                        <SearchForm setValue={setValue}/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;