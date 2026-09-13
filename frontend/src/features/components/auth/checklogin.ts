"use server";

import { redirect } from "next/navigation";



type LoginProp = {
        name: string;
        email: string;
    }

export async function CheckLogin( data: LoginProp) {
    const response = await fetch(
        "http://127.0.0.1:8000/user/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                email:data.email
            })
        }
    )

    if (response.ok) {
        const user = await response.json()
        redirect(`/${user.id}/dashboard`)

    } else if (!response.ok) {
        const err = await response.json()
        if (response.status == 404) {
            return err.detail || "User not found, input valid details"
        } else {
            return "Something went wrong. Try again"
        }
    }
    }