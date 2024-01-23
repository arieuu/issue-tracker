import { Badge } from '@radix-ui/themes';
import React from 'react'

interface Props {
    status: string;
}

const statusMap = {
    "OPEN": ["red", "Open"],
    "IN_PROGRESS": ["violet", "In progress"],
    "CLOSED": ["green", "Closed"],
}

const IssueStatusBadge = ({ status }: Props) => {
    switch (status) {
        case "OPEN":
            return <Badge color='red'> Open </Badge>

        case "IN_PROGRESS":
            return <Badge color='violet'> In progress </Badge>

        case "CLOSED":
            return <Badge color='green'> Closed </Badge>
    }
}

export default IssueStatusBadge