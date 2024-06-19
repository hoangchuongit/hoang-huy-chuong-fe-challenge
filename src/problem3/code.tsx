// Defining interfaces
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}

// Separate functions for better SRP
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const formatBalance = (
  balance: WalletBalance,
  prices: Record<string, number>
): FormattedWalletBalance => {
  const usdValue = prices[balance.currency] * balance.amount;
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
    usdValue,
  };
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // useMemo for caching sorted and filtered balances
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  // useMemo for formatting balances
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance) => formatBalance(balance, prices));
  }, [sortedBalances, prices]);

  // Generating rows for rendering
  const rows = formattedBalances.map((balance, index) => (
    <WalletRow
      className={classes.row}
      key={index}
      amount={balance.amount}
      usdValue={balance.usdValue}
      formattedAmount={balance.formatted}
    />
  ));

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
