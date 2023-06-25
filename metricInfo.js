const metricInfo = {
  "grossMonthlyRevenue": {
    "label": "Gross Monthly Revenue",
    "info": "It is the total income a property will produce each month if it fully leases the subject property at the prevailing market rents. Frankly, it is an ideal number, often different from the actual rent that the property produces. Specifically, you may not collect gross scheduled income for various reasons."
  },
  "grossYearlyRevenue": {
    "label": "Gross Yearly Revenue",
    "info": "It is the total income a property will produce in a year if it fully leases the subject property at the prevailing market rents. Frankly, it is an ideal number, often different from the actual rent that the property produces. Specifically, you may not collect gross scheduled income for various reasons."
  },
  "totalMonthlyExpenses": {
    "label": "Total Monthly Expenses",
    "info": "Necessary monthly expenses are those that are deemed appropriate, such as interest, taxes, advertising, maintenance, utilities and insurance. You can deduct the costs of certain materials, supplies, repairs, and maintenance that you make to your rental property to keep your property in good operating condition."
  },
  "totalYearlyExpenses": {
    "label": "Total Yearly Expenses",
    "info": "Necessary annual expenses are those that are deemed appropriate, such as interest, taxes, advertising, maintenance, utilities and insurance. You can deduct the costs of certain materials, supplies, repairs, and maintenance that you make to your rental property to keep your property in good operating condition."
  },
  "monthlyNOI": {
    "label": "Monthly NOI",
    "info": "Net operating income (NOI) is a real estate term representing a property's monthly gross operating income, minus its operating expenses. Calculated annually, it is useful for estimating the revenue potential of an investment property."
  },
  "yearlyNOI": {
    "label": "Yearly NOI",
    "info": "Net operating income (NOI) is a real estate term representing a property's annual gross operating income, minus its operating expenses. Calculated annually, it is useful for estimating the revenue potential of an investment property."
  },
  "monthlyCashFlow": {
    "label": "Monthly Cashflow",
    "info": "Similar to NOI, Cashflow is a real estate term representing a property's monthly gross operating income, minus its operating expenses and mortgage payments if included. Calculated annually, it is useful for estimating the revenue potential of an investment property."
  },
  "yearlyCashFlow": {
    "label": "Yearly Cashflow",
    "info": "Similar to NOI, Cashflow is a real estate term representing a property's annual gross operating income, minus its operating expenses and mortgage payments if included. Calculated annually, it is useful for estimating the revenue potential of an investment property."
  },
  "capRate": {
    "label": "Cap Rate",
    "info": "Capitalization rates, also known as cap rates, are measures used to estimate and compare the rates of return on multiple commercial real estate properties. Cap rates are calculated by dividing the property's net operating income (NOI) from its property asset value."
  },
  "cashOnCashReturn": {
    "label": "Cash On Cash Return",
    "info": "A cash-on-cash return is a rate of return often used in real estate transactions that calculates the cash income earned on the cash invested in a property. Put simply, cash-on-cash return measures the annual return the investor made on the property in relation to the amount of mortgage paid during the same year."
  },
  "rOI": {
    "label": "Return On Investment",
    "info": "ROI in real estate is a metric used by investors to predict the profitability of a property investment. Calculate ROI by dividing the difference of selling price and investment price (aka the gains) by the investment price. ROI is used to determine whether the risk of investing in a certain property is worth it."
  },
  "mortgage": {
    "label": 'Mortgage P&I',
    "info": "Mortgage payment consiste of the total amount that is paid every month to the loan originator in order to take out any loan. This is the amount you will pay for borrowing the money in order to purache any property. The amount due consist of the priciple payment amoutn and interest amount every month."
  }
}

const propertyTaxPercentages = {
  "AL": 0.44,
  "AK": 1.19,
  "AZ": 0.77,
  "AR": 0.63,
  "CA": 0.76,
  "CO": 0.55,
  "CT": 1.63,
  "DE": 0.55,
  "FL": 0.83,
  "GA": 0.97,
  "HI": 0.29,
  "ID": 0.76,
  "IL": 2.3,
  "IN": 0.87,
  "IA": 1.49,
  "KS": 1.4,
  "KY": 0.86,
  "LA": 0.51,
  "ME": 1.31,
  "MD": 1.1,
  "MA": 1.25,
  "MI": 1.62,
  "MN": 1.08,
  "MS": 0.8,
  "MO": 0.97,
  "MT": 0.83,
  "NE": 1.77,
  "NV": 0.74,
  "NH": 1.99,
  "NJ": 2.47,
  "NM": 0.75,
  "NY": 1.68,
  "NC": 0.86,
  "ND": 0.86,
  "OH": 1.57,
  "OK": 0.85,
  "OR": 1.03,
  "PA": 1.6,
  "RI": 1.48,
  "SC": 0.57,
  "SD": 1.3,
  "TN": 0.75,
  "TX": 1.81,
  "UT": 0.66,
  "VT": 1.91,
  "VA": 0.8,
  "WA": 0.92,
  "WV": 0.58,
  "WI": 1.94,
  "WY": 0.61
};

module.exports = {
  metricInfo,
  propertyTaxPercentages
}