import { z } from 'zod';

// In the Issue model in the schema.prisma, every attribute has a default value except for title and description,
// so we add them here. This is using zod
// If we look at the Issue model in the schema.prisma file, we only need info for title and description because all the
// rest have default values
export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255), // string with a minimum of 1 character and a max of 255 characters
    description: z.string().min(1, 'Description is required.') // string with a minimum of 1 character
});
