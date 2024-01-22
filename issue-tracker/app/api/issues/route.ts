import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";


// In the Issue model in the schema.prisma, every attribute has a default value except for title and description,
// so we add them here. This is using zod
// If we look at the Issue model in the schema.prisma file, we only need info for title and description because all the
// rest have default values
const createIssueSchema = z.object({
    title: z.string().min(1).max(255), // string with a minimum of 1 character and a max of 255 characters
    description: z.string().min(1) // string with a minimum of 1 character
})

export async function POST(request: NextRequest) {
    const body = await request.json(); // request.json() returns a promise, so we 
    // have to "await" it to get the body of the request. Because we "await", the funciton needs to by "async"
    const validation = createIssueSchema.safeParse(body); // checking if the request is valid
    if (!validation.success) // checking if the validation was successful
        return NextResponse.json(validation.error.errors, { status: 400}); // the status 400 means that it was invalid data
    
    const newIssue = await prisma.issue.create({ // to actually POST/Create a new issue (using PostMan), the app needs to be 
        // running on the web, using npm run dev, or it will result in an error and not POST the issue
        data: { title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue, { status: 201});
}