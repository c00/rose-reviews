import { z } from 'zod';

export interface Reviewer {
	id: number;
	name?: string;
	gender?: 'm' | 'f';
	company?: string;
	role?: string;
	personality?: string;
	physicalDescription?: string;
	review?: string;
	imageUrl?: string;
}

export const reviewerSchema = z.object({
	name: z.string(),
	gender: z.union([z.literal('m'), z.literal('f')]),
	company: z.string(),
	role: z.string(),
	personality: z.string(),
	physicalDescription: z.string(),
	review: z.string().optional(),
	imageBase64: z.string().optional(),
});

export const exampleReviewer: Reviewer = {
	id: 1,
	name: 'Lily Green',
	gender: 'f',
	company: 'Ribbit Solutions',
	role: 'Product Manager',
	personality:
		'Lily is a creative and imaginative person, always coming up with new ideas and approaches. She has a great sense of humor and enjoys making people laugh. Lily is also very detail-oriented and takes pride in her work, ensuring that every aspect of the product is well-thought-out and user-friendly.',
	physicalDescription:
		'Lily has vibrant green hair that matches her enthusiasm. She is in her late 20s and has a friendly and approachable demeanor. Lily stands out with her colorful wardrobe, often seen wearing stylish frog-inspired accessories.',
	review:
		"Tinder for Frogs is absolutely ribbiting! As someone with a creative mind and a love for all things out of the ordinary, I couldn't help but be captivated by this fantastical idea. The concept of frogs seeking their perfect match through a dating app is both hilarious and charming. And let me tell you, the attention to detail in this app is through the roof! From customizable lily pad backgrounds to a wide selection of croakalicious pickup lines, every aspect of Tinder for Frogs is well-thought-out and user-friendly. It's a whimsical and fun experience for anyone with a great sense of humor and a fondness for cold-blooded companionship. I give it five hopping stars!",
	imageUrl:
		'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0fS84Mc7K6loKPaLnuwOvonM/user-JFHOn42HV0ruR7FgKkLEt2no/img-hVPIu6Jhlnf3gknKaH0StNB1.png?st=2023-12-10T00%3A52%3A14Z&se=2023-12-10T02%3A52%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-09T23%3A13%3A30Z&ske=2023-12-10T23%3A13%3A30Z&sks=b&skv=2021-08-06&sig=s05BIU/rpSTgYbK3LmbdLOdNZ6bfEKJt8/WEO4k1W88%3D',
};
