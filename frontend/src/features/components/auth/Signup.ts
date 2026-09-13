"use server";

import { redirect } from "next/navigation";

type SignUpProp = {
        name: string;
        email: string;
    }

export async function SignupNewUser(data : SignUpProp) {

    const response = await fetch(
        "http://127.0.0.1:8000/user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            })
        }
    )

    if (response.ok) {
        await response.json();
        redirect("/login")
    }

}