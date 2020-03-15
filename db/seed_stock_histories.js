const axios = require('axios');
const { Pool } = require('pg');
const dbParams = { connectionString: process.env.DATABASE_URL };
const db = new Pool(dbParams);
db.connect();

const testStockData = [
  {name: 'Aurora Cannabis',
  symbol: 'ACB'
  },

  {name: 'Ford',
  symbol: 'F'
  },

  {name: 'GE',
  symbol: 'GE'
  },

  {name: 'Microsoft',
  symbol: 'MSFT'
  },

  {name: 'GoPro',
  symbol: 'GPRO'
  }
]

const extraStockDataForProduction = [
  {name: 'Disney',
  symbol: 'DIS'
  },

  {name: 'Apple',
  symbol: 'AAPL'
  },

  {name: 'Fitbit',
  symbol: 'FIT'
  },

  {name: 'Plug Power',
  symbol: 'PLUG'
  },

  {name: 'Snap',
  symbol: 'SNAP'
  },

  {name: 'AMD',
  symbol: 'AMD'
  },

  { name: 'Cronos Group',
  symbol: 'CRON'
  },
    
  { name: 'Inovio',
  symbol: 'INO'
  },
    
  { name: 'Canopy Growth',
  symbol: 'CGC'
  },
    
  { name: 'Chesapeake Energy',
  symbol: 'CHK'
  },
    
  { name: 'Tesla',
  symbol: 'TSLA'
  },
    
  { name: 'Bank of America',
  symbol: 'BAC'
  },
    
  { name: 'Facebook',
  symbol: 'FB'
  },
    
  { name: 'Uber',
  symbol: 'UBER'
  },
    
  { name: 'Twitter',
  symbol: 'TWTR'
  },
    
  { name: 'Zynga',
  symbol: 'ZNGA'
  },
    
  { name: 'Alibaba',
  symbol: 'BABA'
  },
    
  { name: 'NIO',
  symbol: 'NIO'
  },
    
  { name: 'Starbucks',
  symbol: 'SBUX'
  },
    
  { name: 'Groupon',
  symbol: 'GRPN'
  },
    
  { name: 'Amazon',
  symbol: 'AMZN'
  },
    
  { name: 'AT&T',
  symbol: 'T'
  },
    
  { name: 'Aphria',
  symbol: 'APHA'
  },
    
  { name: 'Sprint',
  symbol: 'S'
  },
    
  { name: 'Netflix',
  symbol: 'NFLX'
  },
    
  { name: 'NVIDIA',
  symbol: 'NVDA'
  },
    
  { name: 'Virgin Galactic Holdings',
  symbol: 'SPCE'
  },

  { name: 'Coca-Cola',
  symbol: 'KO'
  },
    
  { name: 'Vanguard S&P 500 ETF',
  symbol: 'VOO'
  },

  { name: 'Vivint Solar',
  symbol: 'VSLR'
  },
    
  { name: 'American Airlines',
  symbol: 'AAL'
  },
    
  { name: 'Nokia',
  symbol: 'NOK'
  },
    
  { name: 'Square',
  symbol: 'SQ'
  },
    
  { name: 'Slack',
  symbol: 'WORK'
  },
    
  { name: 'Beyond Meat',
  symbol: 'BYND'
  },
    
  { name: 'Catalyst Pharmaceuticals',
  symbol: 'CPRX'
  },
    
  { name: 'Lyft',
  symbol: 'LYFT'
  },
    
  { name: 'SPDR S&P 500 ETF',
  symbol: 'SPY'
  },
    
  { name: 'Sirius XM',
  symbol: 'SIRI'
  },
    
  { name: 'Nike',
  symbol: 'NKE'
  },
    
  { name: 'Boeing',
  symbol: 'BA'
  },
    
  { name: 'Visa',
  symbol: 'V'
  },
    
  { name: 'Delta Air Lines',
  symbol: 'DAL'
  },
    
  { name: 'Moderna',
  symbol: 'MRNA'
  },
    
  { name: 'FuelCell Energy',
  symbol: 'FCEL'
  },
    
  { name: 'Nintendo',
  symbol: 'NTDOY'
  },
    
  { name: 'Corbus Pharmaceuticals',
  symbol: 'CRBP'
  },
    
  { name: 'Carnival',
  symbol: 'CCL'
  },
    
  { name: 'OrganiGram',
  symbol: 'OGI'
  },
    
  { name: 'GM',
  symbol: 'GM'
  },
    
  { name: 'Intel',
  symbol: 'INTC'
  },
    
  { name: 'Activision Blizzard',
  symbol: 'ATVI'
  },
    
  { name: 'Tilray',
  symbol: 'TLRY'
  },
    
  { name: 'Exxon Mobil',
  symbol: 'XOM'
  },
    
  { name: 'New Residential Investment',
  symbol: 'NRZ'
  },

  { name: 'Glu Mobile',
  symbol: 'GLUU'
  },
    
  { name: 'Cisco',
  symbol: 'CSCO'
  },
    
  { name: 'Berkshire Hathaway',
  symbol: 'BRK.B'
  },
    
  { name: 'Yamana Gold',
  symbol: 'AUY'
  },
    
  { name: 'OPKO Health',
  symbol: 'OPK'
  },
    
  { name: 'Micron Technology',
  symbol: 'MU'
  },
    
  { name: 'Luckin Coffee',
  symbol: 'LK'
  },
    
  { name: 'Viking Therapeutics',
  symbol: 'VKTX'
  },
    
  { name: 'Vanguard Total Stock Market ETF',
  symbol: 'VTI'
  },
    
  { name: 'Penn National Gaming',
  symbol: 'PENN'
  },
    
  { name: 'Tencent',
  symbol: 'TCEHY'
  },
    
  { name: 'Roku',
  symbol: 'ROKU'
  },
    
  { name: 'Pfizer',
  symbol: 'PFE'
  },
    
  { name: 'PayPal',
  symbol: 'PYPL'
  },
    
  { name: 'ETFMG Alternative Harvest',
  symbol: 'MJ'
  },
    
  { name: 'Salesforce',
  symbol: 'CRM'
  },
    
  { name: 'Alphabet Class A',
  symbol: 'GOOGL'
  },
    
  { name: 'Sony',
  symbol: 'SNE'
  },
    
  { name: 'Walmart',
  symbol: 'WMT'
  },
    
  { name: 'PG&E',
  symbol: 'PCG'
  },
    
  { name: 'Zoom',
  symbol: 'ZM'
  },
    
  { name: 'Verizon',
  symbol: 'VZ'
  },
    
  { name: 'Novavax',
  symbol: 'NVAX'
  },
    
  { name: 'Pinterest',
  symbol: 'PINS'
  },
    
  { name: 'Gilead Sciences',
  symbol: 'GILD'
  },
    
  { name: 'PowerShares S&P 500 High Dividend Low Volatility ETF',
  symbol: 'SPHD'
  },
    
  { name: 'Enphase Energy',
  symbol: 'ENPH'
  },
    
  { name: 'Shopify',
  symbol: 'SHOP'
  },
    
  { name: 'Peloton Interactive',
  symbol: 'PTON'
  },
    
  { name: 'Costco',
  symbol: 'COST'
  },
    
  { name: 'iQIYI',
  symbol: 'IQ'
  },
    
  { name: 'Bilibili',
  symbol: 'BILI'
  },
    
  { name: 'JPMorgan Chase',
  symbol: 'JPM'
  },
    
  { name: 'Dropbox',
  symbol: 'DBX'
  },
    
  { name: 'CRISPR',
  symbol: 'CRSP'
  },
    
  { name: 'SmileDirectClub',
  symbol: 'SDC'
  },
    
  { name: 'Twilio',
  symbol: 'TWLO'
  },
    
  { name: 'JD.com',
  symbol: 'JD'
  },
    
  { name: 'Energy Transfer',
  symbol: 'ET'
  },
    
  { name: 'AbbVie',
  symbol: 'ABBV'
  }
]

const updateStockHistory = async stocks => {
  //Functions used in api calls to alphavantage for weekly, daily, and intraday info
  const functionFieldNames = [
    {
      apiFunction: 'TIME_SERIES_INTRADAY',
      fieldName: 'intraday_data'
    }, 
    {
      apiFunction: 'TIME_SERIES_DAILY',
      fieldName: 'daily_data'
    }, 
    {
      apiFunction: 'TIME_SERIES_WEEKLY',
      fieldName: 'weekly_data'
    }];
  // for every stock
  // for (const stock of stocks){
    const stockSymbol = stocks.symbol;
    for(const functionFieldName of functionFieldNames){
      const url = `https://www.alphavantage.co/query?function=${functionFieldName.apiFunction}&symbol=${stockSymbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`
      const stockInfo = await axios.get(url)
      console.log(stockInfo);
      // db.query(`insert into stock_histories($1) values ($2)`, [functionFieldName.fieldName, stockInfo]);
    }
  // }
}
updateStockHistory(testStockData[0])
