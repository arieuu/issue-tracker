
"use client";

import { useRouter } from 'next/navigation';
import { Select } from '@radix-ui/themes'
import React from 'react'

 const statuses = [
        { label: "All" },
        { label: "Open", value: "OPEN" },
        { label: "In progress", value: "IN_PROGRESS" },
        { label: "Closed", value: "CLOSED" },
    ]

const IssueStatusFilter = () => {

    const router = useRouter();
   
  return (
    <Select.Root onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";

        router.push("/issues/list" + query);
    }}>
        <Select.Trigger placeholder="Filter by status"/>
        <Select.Content>
            {statuses.map(status => (
                <Select.Item key={status.value} value={status.value || ""}> { status.label } </Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter