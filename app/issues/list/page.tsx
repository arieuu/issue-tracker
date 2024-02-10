import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

enum Status {
  OPEN,
  IN_PROGRESS,
  CLOSED
}

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async({ searchParams }: Props) => {


  

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  
  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;
  
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
    <Flex direction="column" gap="3">
      <IssueActions />      
      <IssueTable searchParams={searchParams} issues={issues}/>

      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  )
}

/* This forces nextjs to render this page dynamically instead of on the server
   that way we can reload the page and see when the issues change.*/

export const dynamic = "force-dynamic";

export default IssuesPage;


export const metadata: Metadata = {
  title: "Issue Tracker - Issue list",
  description: "View all project issues"
}