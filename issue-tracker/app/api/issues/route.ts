import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";


export async function POST(request: NextRequest) {
    const body = await request.json(); // request.json() returns a promise, so we 
    // have to "await" it to get the body of the request. Because we "await", the funciton needs to by "async"
    const validation = createIssueSchema.safeParse(body); // checking if the request is valid
    if (!validation.success) // checking if the validation was successful
        return NextResponse.json(validation.error.format(), { status: 400}); // the status 400 means that it was invalid data
    
    const newIssue = await prisma.issue.create({ // to actually POST/Create a new issue (using PostMan), the app needs to be 
        // running on the web, using npm run dev, or it will result in an error and not POST the issue
        data: { title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue, { status: 201});
}