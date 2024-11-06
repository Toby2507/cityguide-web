import { AirtimeTransactions } from '@/containers';
import { airtimeTransactions } from '@/data';

const AirtimeHistoryPage = () => {
  return <AirtimeTransactions transactions={airtimeTransactions} showPagination showFilters />;
};

export default AirtimeHistoryPage;
