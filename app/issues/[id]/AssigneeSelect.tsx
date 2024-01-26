"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

interface Props {
    issue: Issue
}

const AssigneeSelect = ({ issue }: Props) => {

    const { data: users, error, isLoading } = useUsers();

    if(isLoading) return <Skeleton />

    if(error) return null;

    const assignIssue = (userId: string) => {

        /** We don't need to await this call because we don't need to do anything after
         * The select will display the selected user and the patch request can take it's time
         * to register in the database
         */

        // Send the assigned user id if it exists or null if we are unassigning

        axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId || null })
        .catch(() => {
            toast.error("Changes could not be saved");
        });
    }

    return (
        <>
            <Select.Root defaultValue={ issue.assignedToUserId || "" } onValueChange={ assignIssue }>
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

            <Toaster />
        </>
    )
}

// Extract the request and caching to a hook

const useUsers = () => useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(res => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3
});

export default AssigneeSelect