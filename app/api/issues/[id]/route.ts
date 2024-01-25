import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
 
export async function PATCH(request: NextRequest, { params }: { params: { id: string }}) {
    const body = await request.json();

    const validation = issueSchema.safeParse(body);
    
    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({}, { status: 401});

    if(!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!issue) {
        return NextResponse.json({error: "Issue doesn't exist"}, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: issue?.id },
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue);
}

interface Props {
    params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) }});

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({}, { status: 401});

    if(!issue) {
        return NextResponse.json({ error: "issue doesn't exist" }, { status: 404 });
    }

    // If nothing is wrong we delete the issue

    await prisma.issue.delete({ where: { id: issue.id }});

    return NextResponse.json({}, { status: 200 });

}