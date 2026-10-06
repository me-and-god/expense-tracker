"use server";

import { redirect } from "next/navigation";



type LoginProp = {
        name: string;
        email: string;
    }

export async function CheckLogin( data: LoginProp) {
    const response = await fetch(
        "https://expense-tracker-cydq.onrender.com/user/login",
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
        const user = await response.json();
        const id = Number(user.id)
        redirect(`/${id}/dashboard`)

    } else if (!response.ok) {
        const err = await response.json()
        if (response.status == 404) {
            return err.detail || "User not found, input valid details"
        } else {
            return "Something went wrong. Try again"
        }
    }
    }