import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

// Lazy loading the whole form instead of just the description input/MDE

const IssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  
  {
    ssr: false,
    loading: () => <IssueFormSkeleton /> // Define what renders when page is loading
  }
);

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage