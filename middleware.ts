// import and export the next implementation that will lock out non authenticated users

export { default } from "next-auth/middleware";

// Which routes should be protected

export const config = {
    matcher: [
        "/issues/new",
        "/issues/edit/:id+"
    ]
}