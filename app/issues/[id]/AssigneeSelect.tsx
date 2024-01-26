"use client";
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from "@/app/components";

interface Props {
    issue: Issue
}

const AssigneeSelect = ({ issue }: Props) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 60s
        retry: 3
    });

    if(isLoading) return <Skeleton />

    if(error) return null;

    return (
        <Select.Root defaultValue={ issue.assignedToUserId || "" } onValueChange={(userId) => {

            /** We don't need to await this call because we don't need to do anything after
             * The select will display the selected user and the patch request can take it's time
             * to register in the database
             */

            // Send the assigned user id if it exists or null if we are unassigning

            axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId || null });
        }}>
            <Select.Trigger placeholder="Assign"/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label> Suggestion </Select.Label>
                        <Select.Item value=""> Unassigned </Select.Item>
                        { users?.map(user => {
                            return <Select.Item key={user.id} value={user.id}> { user.name } </Select.Item>
                        })}
                        
                        </Select.Group>
                        
                </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect