import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";


export async function GET() {
    noStore();
    const {getUser} = getKindeServerSession()
    const user = await getUser();

    if(!user || user === null || !user.id){
        throw new Error('User not found');
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });
    if(!dbUser){
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? '',
                firstName: user.given_name ?? '',
                lastName: user.family_name ?? '',
                ProfileImage: user.picture ??  `https://avatar.vercel.sh/${user.given_name}`,
            }
        });
    }

    return NextResponse.redirect(process.env.AUTH_REDIRECT_URL as string);

}