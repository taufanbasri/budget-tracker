'use server'

import { UpdateUserCurrencySchema } from "@/app/schema/userSettings"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function UpdateUserCurrency(currency: string) {
    const parsedBody = UpdateUserCurrencySchema.safeParse({
        currency
    })

    if (!parsedBody.success) {
        throw parsedBody.error
    }

    const user = await currentUser()

    if (!user) {
        redirect('/sign-in')
    }

    const userSettings = await prisma.userSettings.update({
        where: {
            userId: user.id
        },
        data: {
            currency: parsedBody.data.currency
        }
    })

    return userSettings
}