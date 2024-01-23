import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
    href: string,
    children: string[]
}

const Link = ({ href, children }: Props) => {

    // Use those props for next link so that we can use custom hooks as its children

    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink> {children} </RadixLink>
        </NextLink>
    )
}


export default Link;