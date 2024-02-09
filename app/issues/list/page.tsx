import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/prisma/client'
import { IssueStatusBadge} from "@/app/components"; // Coming from our index file
import IssueActions from './IssueActions'
import { Link } from '@/app/components';
import { Issue } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

enum Status {
  OPEN,
  IN_PROGRESS,
  CLOSED
}

interface Props {
    searchParams: {
      status: string,
      orderBy: keyof Issue,
      page: string
    }
}

const IssuesPage = async({ searchParams }: Props) => {


  const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" }
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;
  
  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where })

  return (
    <div>
      <IssueActions />      

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>

            { columns.map(column => (
                <Table.ColumnHeaderCell key={column.value} className={column.className}> 
                    <Link href={{ query: { ...searchParams, orderBy: column.value }}}> {column.label} </Link>
                    { column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>} 
                </Table.ColumnHeaderCell>
            ) ) }

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

      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  )
}

/* This forces nextjs to render this page dynamically instead of on the server
   that way we can reload the page and see when the issues change.*/

export const dynamic = "force-dynamic";

export default IssuesPage;