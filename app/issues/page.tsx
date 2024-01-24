import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/prisma/client'
import { IssueStatusBadge} from "@/app/components"; // Coming from our index file
import IssueActions from './IssueActions'
import { Link } from '@/app/components';

const IssuesPage = async() => {

  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueActions />      

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell> Issue </TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'> Status </TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'> Created </TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(issue => (

            <Table.Row key={issue.id}>

              <Table.Cell>
                 <Link href={`/issues/${issue.id}`}> { issue.title } </Link>
                 <div className='block md:hidden'> <IssueStatusBadge status={issue.status}/> </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'> <IssueStatusBadge status={ issue.status } /> </Table.Cell>
              <Table.Cell className='hidden md:table-cell'> { issue.createdAt.toDateString() } </Table.Cell>
            </Table.Row>

          ))}
        </Table.Body>

      </Table.Root>
    </div>
  )
}

/* This forces nextjs to render this page dynamically instead of on the server
   that way we can reload the page and see when the issues change.*/

export const dynamic = "force-dynamic";

export default IssuesPage;