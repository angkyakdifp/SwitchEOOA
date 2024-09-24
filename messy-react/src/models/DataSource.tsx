export class Datasource {
    private url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
    async getPrices() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`Error fetching prices: ${response.statusText}`);
        }
        const data = await response.json();
        return data.reduce((acc: Record<string, number>, curr: any) => {
          acc[curr.currency] = curr.price;
          return acc;
        }, {});
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}

export const useWalletBalances = () => {
    /*
    const [balances, setBalances] = useState<WalletBalance[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchBalances = async () => {
        try {
          const response = await fetch('https://example.com/wallet-balances.json');
          if (!response.ok) {
            throw new Error(`Error fetching balances: ${response.statusText}`);
          }
          const data = await response.json();
          setBalances(data);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch wallet balances');
        }
      };
  
      fetchBalances();
    }, []);
  
    return balances;
    */
    return [{currency: "ETH", amount: 1, blockchain: 'Ethereum'}];
}