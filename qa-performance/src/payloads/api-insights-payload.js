import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'

export class ApiInsightsPayload {
  //widget queries
  get aopTotalMktValue () { //AOP stands for 'Assets On Platform'
    return {
      params: {
        tags: {
          widget: 'Total Market Value'
        }
      },
      payload: {
        query: 'query GET_YEARLY_MARKETVALUES_TEN_YEARS @page(number: 1) { marketValues @calendarDateFilter(by: YEAR) @aggregation(by: ["date"]) { date @calendarDateFilter(by: YEAR, last: 10) marketValue @sum __typename } }'
      }
    }
  }
  get aopCAGR () { //CAGR stands 'Compound Annual Growth Rate'
    return {
      params: {
        tags: {
          widget: 'Compound Annual Growth Rate'
        },
      },
      payload: {
        query: 'query GET_YEARLY_MARKETVALUES_WITH_CAGR @page(number: 1) { marketValues @aggregation(by: ["date"]){ marketValue @sum @cagr(by: 4) date @calendarDateFilter(by: YEAR, last: 10) __typename } }'
      }
    }
  }
  get aopLineOfBusiness () {
    return {
      params: {
        tags: {
          widget: 'AOP By Line of Business'
        }
      },
      payload: {
        query: 'query GET_YEARLY_MARKETVALUES_LAST_YEAR @page(number: 1) { aopBy @calendarDateFilter(by: YEAR, last: 1) { valueDate @calendarDateFilter(by: YEAR, last: 1) marketValue lineOfBusiness __typename } }'
      }
    }
  }

  aopLineOfBusinessDrillDown (aopLineOfBusinessRespJSON) {
    let query = 'query GET_YEARLY_MARKETVALUES_LAST_YEAR @page(number: 1) { aopBy @calendarDateFilter(by: YEAR, last: 1) { valueDate @calendarDateFilter(by: YEAR, last: 1) marketValue lineOfBusiness @where(op: "in", value: "") investmentManager __typename } }'
    const uniqueLineOfBusinessArray = Array.from(new Set(aopLineOfBusinessRespJSON.data.aopBy.map(item => item.lineOfBusiness)))
    query = query.replace('value: ""', `value: "${randomItem(uniqueLineOfBusinessArray)}"`)

    return {
      params: {
        tags: {
          widget: 'AOP By Line of Business - Drilldown'
        }
      },
      payload: {
        query: query
      }
    }
  }
  get aopInvestmentManager() {
    return{
      params: {
        tags: {
          widget: 'AOP By Investment Manager'
        }
      },
      payload: {
        query: 'query GET_YEARLY_MARKETVALUES_LAST_YEAR @page(number: 1) { aopBy @calendarDateFilter(by: YEAR, last: 1) { valueDate @calendarDateFilter(by: YEAR, last: 1) marketValue investmentManager __typename } }'
      }
    }
  }

  aopInvestmentManagerDrillDown (aopInvestmentManagerRespJSON) {
    let query = 'query GET_YEARLY_MARKETVALUES_LAST_YEAR @page(number: 1) { aopBy @calendarDateFilter(by: YEAR, last: 1) { valueDate @calendarDateFilter(by: YEAR, last: 1) marketValue investmentManager @where(op: "in", value: "") productName __typename } }'
    const uniqueInvestmentManagerArray = Array.from(new Set(aopInvestmentManagerRespJSON.data.aopBy.map(item => item.investmentManager)))
    query = query.replace('value: ""', `value: "${randomItem(uniqueInvestmentManagerArray)}"`)

    return {
      params: {
        tags: {
          widget: 'AOP By Investment Manager - Drilldown'
        }
      },
      payload: {
        query: query
      }
    }
  }
  get aopInvestmentApproach() {
    return{
      params: {
        tags: {
          widget: 'AOP By Investment Approach'
        }
      },
      payload: {
        query: 'query GET_YEARLY_MARKETVALUES_LAST_YEAR @page(number: 1) { aopBy @calendarDateFilter(by: YEAR, last: 1) { valueDate @calendarDateFilter(by: YEAR, last: 1) marketValue allocation __typename } }'
      }
    }
  }
  aopInvestmentApproachDrillDown (aopInvestmentApproachRespJSON) {
    let query = 'query GET_YEARLY_MARKETVALUES_LAST_YEAR @page(number: 1) { aopBy @calendarDateFilter(by: YEAR, last: 1) { valueDate @calendarDateFilter(by: YEAR, last: 1) marketValue investmentManager allocation @where(op: "in", value: "") __typename } }'
    const uniqueAllocationArray = Array.from(new Set(aopInvestmentApproachRespJSON.data.aopBy.map(item => item.allocation)))
    query = query.replace('value: ""', `value: "${randomItem(uniqueAllocationArray)}"`)

    return {
      params: {
        tags: {
          widget: 'AOP By Investment Approach - Drilldown'
        }
      },
      payload: {
        query: query
      }
    }
  }
  get feesAnalysisHousehold() {
    return{
      params: {
        tags: {
          widget: 'Fees By Household Size'
        }
      },
      payload: {
        //TODO update and use calculated last quarter date function (now uses an interval)
        query: `query GET_LAST_QUARTER_FEES_VALUES @page(number: 1) { fees @datePart(part: QUARTER) @aggregation(by: ["billedDate", "clientHouseholdId", "virtualAccountId"]) { billedDate @datePart(part: QUARTER) @where(op: "between", value: ["2024-01-01", "2024-03-31"]) amount @sum basis @avg clientHouseholdId virtualAccountId __typename } feesHist: feeBasisByClientHousehold @datePart(part: QUARTER) @aggregation(by: ["billedDate", "clientHouseholdId"]) { billedDate @datePart(part: QUARTER) @where(op: "between", value: ["2024-01-01", "2024-03-31"]) clientHouseholdId basis @sum __typename } }`
      }
    }
  }
  get feesType(){
    const lastYear = new Date().getFullYear()-1
    return{
      params: {
        tags: {
          widget: 'Fees Type'
        }
      },
      payload: {
        query: `query FEESTYPE @page(number: 1) { fees @aggregation(by: ["name", "billedDate"]) @datePart(part: YEAR) { amount @sum name billedDate @datePart(part: YEAR) @where(op: "year", value: "${lastYear}") __typename } }`
      }
    }
  }
  get feesLastQuarterYoY(){
    const startYear = new Date().getFullYear()-4
    return{
      params: {
        tags: {
          widget: 'Fees Last Quarter YoY'
        }
      },
      payload: {
        query: `query GET_YOY_FEES @page(number: 1) { fees @datePart(part: YEAR) @aggregation(by: "billedDate") { billedDate @datePart(part: YEAR) @where(op: ">=", value: "${startYear}") amount @sum @growth __typename } }`
      }
    }
  }
  get feesLast5Years(){
    const startYear = new Date().getFullYear()-4
    return{
      params: {
        tags: {
          widget: 'Fees Last 5 Years'
        }
      },
      payload: {
        query: `query GET_FEES_LAST_FIVE_YEARS @page(number: 1) { fees @datePart(part: YEAR) @aggregation(by: "billedDate") { amount @sum billedDate @where(op: ">=", value: "${startYear}") billedDate @datePart(part: YEAR) __typename } }`
      }
    }
  }
  feesLast5YearsMontlyDrilldown(feesLast5YearsRespJSON){
    let query = 'query GET_FEES_LAST_FIVE_YEARS @page(number: 1) { fees @datePart(part: YEAR) @aggregation(by: "billedDate") { amount @sum billedDate @where(op: ">=", value: "") billedDate @datePart(part: MONTH) billedDate @where(op: "year", value: "") __typename } }'
    const startYear = new Date().getFullYear() - 4
    const uniqueYearsArray = Array.from(new Set(feesLast5YearsRespJSON.data.fees.map(item => new Date(item.billedDate).getFullYear())))
    query = query.replace('op: ">=", value: ""', `op: ">=", value: "${startYear}"`).replace('op: "year", value: ""',`op: "year", value: "${randomItem(uniqueYearsArray)}"`)
    return {
      params: {
        tags: {
          widget: 'Fees Last 5 Years - Monthly Drilldown'
        }
      },
      payload: {
        query: query
      }
    }
  }
  get feesAnalysisTableDrillDown(){
    return {
      params: {
        tags: {
          widget: 'Fees By Household Size Table View - Drilldown'
        }
      },
      payload: {
        //TODO: Automatic date from last quarter when data from last quarter is normalized on DB
        query: `query GET_LAST_QUARTER_FEES_VALUES @page(number: 1) { fees @datePart(part: QUARTER) @aggregation(by: ["billedDate", "clientHouseholdId", "virtualAccountId"]) { billedDate @datePart(part: QUARTER) @where(op: "between", value: ["2024-01-01", "2024-03-31"]) amount @sum basis @avg clientHouseholdId virtualAccountId clientHousehold { name __typename } __typename } feesHist: feeBasisByClientHousehold @datePart(part: QUARTER) @aggregation(by: ["billedDate", "clientHouseholdId"]) { billedDate @datePart(part: QUARTER) @where(op: "between", value: ["2024-01-01", "2024-03-31"]) clientHouseholdId basis @sum @where(op: "between", value:[100000.01, 250000]) __typename } }`
      }
    }
  }
  get netFlowsDetails(){
    return{
      params: {
        tags: {
          widget: 'Netflows Details'
        }
      },
      payload: {
        query: 'query FLOWS @page(number: 1) { flows @datePart(part: YEAR) @aggregation(by: ["flowDate", "subtype"]) { flowDate @datePart(part: YEAR) subtype amount @sum __typename } }'
      }
    }
  }
  get inflowsOutflows(){
    return{
      params: {
        tags: {
          widget: 'Inflows and Outflows'
        }
      },
      payload: {
        query: 'query FLOWS_VS_MARKET_VALUE @page(number: 1) { flowMarketValues @aggregation(by: ["endOfPeriodDate", "clientHouseholdId", "productId"]) @calendarDateFilter(by: YEAR) { inflow @sum outflow @sum netflow @sum endOfPeriodDate @calendarDateFilter(by: YEAR, last: 5) __typename } marketValues @aggregation(by: ["date", "clientHouseholdId"]) @calendarDateFilter(by: YEAR) { marketValue @sum date @calendarDateFilter(by: YEAR) __typename } }'
      }
    }
  }
  get inflowsOutflowsDrillDown () {
    const previousYear = new Date().getFullYear() - 1
    const lastDateOfPreviousYear = new Date(previousYear, 11, 31)
    const formattedLastDate = lastDateOfPreviousYear.toISOString().split('T')[0]
    return {
      params: {
        tags: {
          widget: 'Inflows and Outflows - Drilldown'
        }
      },
      payload: {
        query: `query FLOWS_VS_MARKET_VALUE @page(number: 1) { flowMarketValues @aggregation(by: ["endOfPeriodDate", "clientHouseholdId", "productId"]) @calendarDateFilter(by: YEAR) { inflow @sum outflow @sum netflow @sum endOfPeriodDate @calendarDateFilter(by: YEAR, last: 5) @where(op: "in", value: "${formattedLastDate}") productId product { name __typename } __typename } marketValues @aggregation(by: ["date", "clientHouseholdId"]) @calendarDateFilter(by: YEAR) { marketValue @sum date @calendarDateFilter(by: YEAR) @where(op: "in", value: "${formattedLastDate}") __typename } }`
      }
    }
  }
  netflowsMontlyDrilldown(inflowsOutflowsRespJSON){
    let query = 'query FLOWS_VS_MARKET_VALUE @page(number: 1) { flowMarketValues @aggregation(by: ["endOfPeriodDate", "clientHouseholdId", "productId", "yearly", "quarterly", "monthly"]) @calendarDateFilter(by: YEAR) { inflow @sum outflow @sum netflow @sum endOfPeriodDate @where(op: "year", value: "") endOfPeriodDate @calendarDateFilter(by: MONTH) monthly @where(op: "=", value: 1) __typename } marketValues @aggregation(by: ["date", "clientHouseholdId"]) @calendarDateFilter(by: YEAR) { marketValue @sum date @calendarDateFilter(by: YEAR) __typename } }'
    const uniqueYearsArray = Array.from(new Set(inflowsOutflowsRespJSON.data.flowMarketValues.map(item => new Date(item.endOfPeriodDate).getFullYear())))
    query = query.replace('op: "year", value: ""',`op: "year", value: "${randomItem(uniqueYearsArray)}"`)
    return {
      params: {
        tags: {
          widget: 'Net flows Chart Summary - Monthly Drilldown'
        }
      },
      payload: {
        query: query
      }
    }
  }
  get flowsLastQuarterYoY(){
    return{
      params: {
        tags: {
          widget: 'Flows Last Quarter YoY'
        }
      },
      payload: {
        query: 'query FLOWS_YOY @page(number: 1) { flows @datePart(part: YEAR) @aggregation(by: ["flowDate"]) { flowDate @datePart(part: YEAR) amount @sum @growth __typename } }'
      }
    }
  }
}