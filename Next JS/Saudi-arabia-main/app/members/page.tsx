"use client";


import MembersPage from "@/components/pages/members/components/members";
import Hero from "@/components/ui/hero";


export default function Members() {


    return (
        <div className="bg-black">
            <Hero
                image="/about-us.jpg"
                shadow
                title="Members"
                description="" />
            
            <MembersPage />
        </div>
    )
}