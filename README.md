This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## TODOS
✅Add `/channels` to list all channels
✅Add Tags, and Number of users in Room details (on lobby and inside room)
✅Add Filter to Channels by Tags
✅Add Save Name for next time
✅Add Filter to Channels by Name
✅Add Types to Messages (Server | Client )
✅ Add Random avatar to subscribers
✅ Add VerifiedBadge avatar to Server
Add Filter to Channels by Number of users
Add Random color to usernames (needs to be unique for each user, does not require to be the same across the users) | REVIEW: Change this to a user setting.
Add Custom Colors to Tags ► Update the UI to make Channels have the background color of the tag
Add List of Users in Room
Add Validation for unique usernames subscriptions by room (avoid 2 users with the same name in the same room)
Customize the UI to sent messages be displayed on right, and received messages on left (same as WhatsApp/Discord/Others)
Add Priority to ActionsMenu