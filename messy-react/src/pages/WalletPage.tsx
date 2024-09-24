import React, { useEffect, useMemo, useState } from 'react';
import WalletRow from '../components/WalletRow';
import { WalletBalance } from '../models/WalletBalance';
import { Datasource, useWalletBalances } from '../models/DataSource';
import { Box, BoxProps } from '@mui/system';

interface Props extends BoxProps {
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, sx, component, ...rest } = props; // extract Material UI-specific props
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const datasource = new Datasource('https://interview.switcheo.com/prices.json');
    datasource.getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        setError('Error fetching prices');
      });
  }, []);

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] ? prices[balance.currency] * balance.amount : 0;
    return (
      <WalletRow
        key={index}
        balance={balance}
        usdValue={usdValue.toFixed(2)}
        className="row-class"
      />
    );
  });

  return (
    <Box {...rest}>
      {error ? <div>{error}</div> : rows}
    </Box>
  );
};

export default WalletPage;
