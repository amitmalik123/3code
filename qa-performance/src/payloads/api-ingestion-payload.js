import {randomIntBetween, uuidv4} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {getRandomCorpName, getRandomName, timeShift} from '../utils/helpers'

export class Ingestion {

  get getJsonPayload() {
    const today = new Date().toISOString()
    const pastYear = timeShift('year',-5).toISOString()
    const pastMonth = timeShift('month',-1).toISOString()
    const startPeriod = timeShift('month', -4).toISOString()
    const endPeriod = timeShift('month', -2).toISOString()

    return {
      upsertOrganization_Valid_Payload: 
              [  
                {
                  'OrganizationID': uuidv4().toUpperCase(),
                  'ParentOrganizationID': null,
                  'Ancestors': [],
                  'Name': getRandomName(),
                  'PrimaryUserID': null,
                  'Type': 'AdvisorRepCode',
                  'Subtype': null,
                  'Tags': [],
                  'CustomAttributes': {
                    'isFeeAdmin': 'true',
                    'RequiresQuestionnaire': '0'
                  },
                  'SourceID': 'AGACID',
                  'SourceSystem': 'K6-Performance-tests',
                  'Contacts': [],
                  'PlatformStartDate': pastYear,
                  'PlatformEndDate': null,
                  'UpdateTimestamp': today
                },
                  
                {
                  'OrganizationID': uuidv4().toUpperCase(),
                  'ParentOrganizationID': null,
                  'Ancestors': [],
                  'Name': getRandomName(),
                  'PrimaryUserID': null,
                  'Type': 'AdvisorRepCode',
                  'Subtype': null,
                  'Tags': [],
                  'CustomAttributes': {
                    'isFeeAdmin': 'true',
                    'RequiresQuestionnaire': '0'
                  },
                  'SourceID': 'AGACID',
                  'SourceSystem': 'K6-Performance-tests',
                  'Contacts': [],
                  'PlatformStartDate': pastYear,
                  'PlatformEndDate': null,
                  'UpdateTimestamp': today
                },
                
              ],
  
      virtualAccount_Valid_Payload:
              [
                {
                  'SourceID': 'AI0UT6',
                  'SourceSystem': 'K6-Performance-tests',
                  'ParentID': 'CA6HA4',
                  'ParentType': 'Organization',
                  'Name': getRandomCorpName(),
                  'Tags': [
                    'Funding Met'
                  ],
                  'CustomAttributes': {
                    'Custodian': 'PRS',
                    'accountType': 'Corporate',
                    'OpenDate': startPeriod.slice(0,10).replace(/-/g,''),
                    'FundedDate': endPeriod.slice(0,10).replace(/-/g,''),
                    'TerminationDate': '99999999'
                  },
                  'Restrictions': [],
                  'Status': 'Active',
                  'LineOfBusiness': 'Managed Assets',
                  'TransactionMode': 'VirtualAccount',
                  'HoldingsMode': 'VirtualAccount',
                  'PerformanceMode': 'VirtualAccount',
                  'FlowsMode': 'VirtualAccount',
                  'MarketValuesMode': 'VirtualAccount',
                  'CustodialDataMode': 'Exclusive',
                  'AnalyticsDataSets': [],
                  'SourceAccounts': [
                    {
                      'SourceSystem': 'K6-Performance-tests',
                      'SourceID': 'BDC27D778'
                    }
                  ],
                  'ProductSourceID': 'NFESA3',
                  'ProductSourceSystem': 'AMK',
                  'PlatformStartDate': pastYear,
                  'PlatformEndDate': null,
                  'UpdateTimestamp': today
                }
              ],
  
      upsertSourceAccount_ValidPayload:
                [
                  {
                    'SourceID': 'Z6WLET',
                    'SourceSystem': 'K6-Performance-tests',
                    'ParentID': 'CB4ND4',
                    'ParentType': 'Organization',
                    'Name': getRandomCorpName(),
                    'Tags': [
                      ''
                    ],
                    'CustomAttributes': {
                      'Custodian': 'GNW',
                      'accountType': 'Corporate',
                      'OpenDate': startPeriod.slice(0,10).replace(/-/g,''),
                      'TerminationDate': endPeriod.slice(0,10).replace(/-/g,'')
                    },
                    'Restrictions': [
                      ''
                    ],
                    'LineOfBusiness': 'Managed Assets',
                    'TransactionMode': 'VirtualAccount',
                    'HoldingsMode': 'VirtualAccount',
                    'PerformanceMode': 'VirtualAccount',
                    'FlowsMode': 'VirtualAccount',
                    'MarketValuesMode': 'VirtualAccount',
                    'CustodialDataMode': 'Exclusive',
                    'SourceAccounts': [
                      {
                        'SourceSystem': 'K6-Performance-tests',
                        'SourceID': 'C1F50274C11A4F9'
                      }
                    ],
                    'ProductSourceID': 'ADM05Y',
                    'ProductSourceSystem': 'AMK',
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceId': 'AB0Z50',
                    'SourceSystem': 'K6-Performance-tests',
                    'Type': 'custodial',
                    'Subtype': 'Sole Proprietor',
                    'Bank': 'AssetMark Trust',
                    'BankAccountNumber': 'NULL',
                    'BankType': 'Custodian',
                    'Status': 'Active',
                    'Name': getRandomName(),
                    'Tags': [
                      ''
                    ],
                    'CustomAttributes': {},
                    'UpdateTimestamp': today
                  }
                ],
              
      upsertUser_ValidPayload:
                [
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name':getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'ADA1ND',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      },
                      {
                        'TargetSourceID': 'ADA1NE',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      },
                      {
                        'TargetSourceID': 'AGB1W8',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE1N52',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB5OR0',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CD8CN8',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE1JH9',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB5L97',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB0LM9',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB4EB5',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CD8K88',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CA85Z0',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB23K9',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE6BG9',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CA5J62',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB4VR0',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE2W59',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB4H40',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE1SL8',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE51W3',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE3GW6',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE26S7',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'C31953',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB3QL7',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CB34T1',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'CE0EU4',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': uuidv4().toUpperCase(),
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomName(),
                    'Email': 'xxxx',
                    'Roles': [
                      {
                        'TargetSourceID': 'AGA82Y',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      },
                      {
                        'TargetSourceID': 'AGA9CQ',
                        'TargetSourceSystem': 'AMK',
                        'TargetType': 'Organization',
                        'Permission': 'Modify'
                      }
                    ],
                    'UpdateTimestamp': today
                  }
                ],
  
      upsertHoldings_Payload:
                [
                  {
                    'SourceId': 'A06690',
                    'SourceSystem': 'K6-Performance-tests',
                    'Holdings': [
                      {
                        'Type': 'Multi-Asset Securities',
                        'ValuationDate': today.substring(0,10),
                        'Value': randomIntBetween(100, 99999999)/100,
                        'SourceAccountID': '123',
                        'Currency': 'USD',
                        'Description': 'DIMENSIONAL U.S. EQUITY ETF',
                        'Ticker': 'DFUS',
                        'Cusip': '25434V401',
                        'Units': 759,
                        'CustomAttributes': {
                          'AssetClass': 'Multi-Asset Securities',
                          'SubAssetClass': 'Multi-Asset Securities'
                        }
                      }
                    ],
                    'UpdateTimestamp': today
                  }
                ],
  
      marketValue_Payload:
                [
                  {
                    'VirtualAccountID': uuidv4().toUpperCase(),
                    'SourceID': '3DZ|3DZ_VTIVX',
                    'SourceSystem': 'K6-Performance-tests',
                    'Value': randomIntBetween(100, 99999999)/100,
                    'Currency': 'USD',
                    'ValuationDate': pastMonth,
                    'UpdateTimestamp': today
                  },
                  {
                    'VirtualAccountID': uuidv4().toUpperCase(),
                    'SourceID': '3DZ|3DZ_VTIVX',
                    'SourceSystem': 'K6-Performance-tests',
                    'Value': randomIntBetween(100, 99999999)/100,
                    'Currency': 'USD',
                    'ValuationDate': pastMonth,
                    'UpdateTimestamp': today
                  }
                ],
  
      fee_Payload:
                [
                  {
                    'SourceSystem': 'K6-Performance-tests',
                    'SourceID': '16229173',
                    'TargetSourceID': 'A35592',
                    'TargetSourceSystem': 'AMK',
                    'TargetType': 'VirtualAccount',
                    'Name': 'Advisory Fees',
                    'Amount': randomIntBetween(100, 99999999)/100,
                    'Basis': randomIntBetween(100, 99999999)/100,
                    'Currency': 'USD',
                    'BilledDate': pastMonth,
                    'StartBillingPeriod': startPeriod,
                    'EndBillingPeriod': endPeriod,
                    'UpdateTimestamp': today
                  }
                ],
  
      upsertProduct_Payload:
                [
                  {
                    'SourceID': 'SELMA3',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 3,
                    'InvestmentManagerSourceID': 'GFWM',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'GFWM',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 85,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 15,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MULTI'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SELMA3',
                      'overlay_program_code': 'N ',
                      'overlay_strategist_code': 'GFWM'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SELMA4',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 4,
                    'InvestmentManagerSourceID': 'GFWM',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'GFWM',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 70,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 15,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 15,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MULTI'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SELMA4',
                      'overlay_program_code': 'N ',
                      'overlay_strategist_code': 'GFWM'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SM4SAL',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 4,
                    'InvestmentManagerSourceID': 'STA',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'STA',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'ETF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SM4SAL',
                      'overlay_program_code': 'E ',
                      'overlay_strategist_code': 'AIS'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SM6SMF',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 6,
                    'InvestmentManagerSourceID': 'STAMF',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'STAMF',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SM6SMF',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'STAMF'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SMIET1',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 1,
                    'InvestmentManagerSourceID': 'DMO',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'DMO',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'Tax Managed',
                      'ETF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SMIET1',
                      'overlay_program_code': 'E ',
                      'overlay_strategist_code': 'AIS'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SMIEZ2',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'DMO',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'DMO',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'Tax Managed',
                      'ETF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SMIEZ2',
                      'overlay_program_code': 'E ',
                      'overlay_strategist_code': 'AIS'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SMIMF3',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 3,
                    'InvestmentManagerSourceID': 'DMO',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'DMO',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SMIMF3',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'DMO'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SMIMT1',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 1,
                    'InvestmentManagerSourceID': 'DMO',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'DMO',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'Tax Managed',
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SMIMT1',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'DMO'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SMIMT2',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'DMO',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'DMO',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'Tax Managed',
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SMIMT2',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'DMO'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SMSA5A',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 5,
                    'InvestmentManagerSourceID': 'OPENA',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'OPENA',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'ODMS'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SMSA5A',
                      'overlay_program_code': 'T ',
                      'overlay_strategist_code': 'OPENA'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SOTG10',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 0,
                    'InvestmentManagerSourceID': 'ARISR',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'ARISR',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SOTG10',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'ARISR'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SOTG25',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 0,
                    'InvestmentManagerSourceID': 'ARISR',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'ARISR',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SOTG25',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'ARISR'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP2SFD',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP2SFD',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP2TPR',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'Tax Managed',
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP2TPR',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP3SRF',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 3,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP3SRF',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP4SFD',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 4,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP4SFD',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP4SSC',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 4,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP4SSC',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP5TRF',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 5,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'Tax Managed',
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP5TRF',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP6SFD',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 6,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP6SFD',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP6SGN',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 6,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP6SGN',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SP6SSC',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 6,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SP6SSC',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SP'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SPESR2',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'ETF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SPESR2',
                      'overlay_program_code': 'E ',
                      'overlay_strategist_code': 'AIS'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SPETR2',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'SP',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SP',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'ETF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SPETR2',
                      'overlay_program_code': 'E ',
                      'overlay_strategist_code': 'AIS'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SRADA2',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'SRAM',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'SRAM',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SRADA2',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'SRAM'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SSELA2',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 2,
                    'InvestmentManagerSourceID': 'GFWMC',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'GFWMC',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 100,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'CMSGP'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SSELA2',
                      'overlay_program_code': 'S ',
                      'overlay_strategist_code': 'GFWMC'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SUMAD6',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 6,
                    'InvestmentManagerSourceID': 'GWUMA',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'GWUMA',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'GMS'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SUMAD6',
                      'overlay_program_code': 'G ',
                      'overlay_strategist_code': 'GWUMA'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'SUMDT5',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 5,
                    'InvestmentManagerSourceID': 'GWUMA',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'GWUMA',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'GMS'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'SUMDT5',
                      'overlay_program_code': 'G ',
                      'overlay_strategist_code': 'GWUMA'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'ta7',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 6,
                    'InvestmentManagerSourceID': 'OBS',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'OBS',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'MF'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'ta7',
                      'overlay_program_code': 'M ',
                      'overlay_strategist_code': 'OBS'
                    },
                    'UpdateTimestamp': today
                  },
                  {
                    'SourceID': 'TAGLP1',
                    'SourceSystem': 'K6-Performance-tests',
                    'Name': getRandomCorpName(),
                    'Profile': 1,
                    'InvestmentManagerSourceID': 'TAG',
                    'InvestmentManagerSourceSystem': 'AMK',
                    'ProductFamilySourceID': 'TAG',
                    'ProductFamilySourceSystem': 'AMK',
                    'AllocationSets': [
                      {
                        'Name': 'Investment Approach',
                        'Allocations': [
                          {
                            'Name': 'Core',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Enhanced',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Tactical Limit',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifying Equity',
                            'Weight': 0,
                            'ID': null
                          },
                          {
                            'Name': 'Diversifing Bonds',
                            'Weight': 100,
                            'ID': null
                          },
                          {
                            'Name': 'Additional Investments',
                            'Weight': 0,
                            'ID': null
                          }
                        ]
                      }
                    ],
                    'Tags': [
                      'IMA'
                    ],
                    'CustomAttributes': {
                      'overlay_model_code': 'TAGLP1',
                      'overlay_program_code': 'P ',
                      'overlay_strategist_code': 'TAG'
                    },
                    'UpdateTimestamp': today
                  }
                ],
  
      benefitLevel_Payload:
                  [
                    {
                      'UserID': 'AMK',
                      'QualifyingAssets': randomIntBetween(100, 99999999)/100,
                      'Level': 'A35592',
                      'BenefitLevelEffectiveDate': pastYear,
                      'AssetLevelEffectiveDate': pastYear,
                      'ServiceTeam': 'Advisory Fees',
                      'AccommodationGranted': true,
                      'GrossContributionsMTD': randomIntBetween(100, 99999999)/100,
                      'GrossContributionsQTD': randomIntBetween(100, 99999999)/100,
                      'GrossContributionsYTD': randomIntBetween(100, 99999999)/100,
                      'Currency': pastYear,
                      'UpdateTimestamp': today
                    }
                  ],
  
      flows_Payload:
              [
                {
                  'SourceID': 'AC8BA4',
                  'SourceSystem': 'K6-Performance-tests',
                  'Inflows': 0,
                  'Outflows': -1900,
                  'Fees': 0,
                  'Currency': 'USD',
                  'FlowDate': pastYear,
                  'FlowDetails': [
                    {
                      'Type': 'Outflow',
                      'SubType': 'W',
                      'Amount': -1900
                    }
                  ],
                  'UpdateTimestamp': today
                }
              ],
  
      summaryPerformance_Payload:
          [
            {
              'TargetType': 'VirtualAccount',
              'TargetSourceID': 'A36466',
              'TargetSourceSystem': 'AMK',
              'AsOfDate': pastMonth,
              'UpdateTimestamp': today,
              'SIPerformance': 4.8500,
              'YTDPerformance': 13.8000,
              'MTDPerformance': 2.8000,
              'OneYearPerformance': 10.5200,
              'TwoYearPerformance': -5.9200,
              'ThreeYearPerformance': 5.1000,
              'FiveYearPerformance': 2.9400,
              'TenYearPerformance': 3.6000,
              'NetInvestment': -24215.0300
            },
            {
              'TargetType': 'Organization',
              'TargetSourceID': 'C01772',
              'TargetSourceSystem': 'AMK',
              'AsOfDate': pastMonth,
              'UpdateTimestamp': today,
              'SIPerformance': 4.8500,
              'YTDPerformance': 13.8000,
              'MTDPerformance': 2.8000,
              'OneYearPerformance': 10.5200,
              'TwoYearPerformance': -5.9200,
              'ThreeYearPerformance': 5.1000,
              'FiveYearPerformance': 2.9400,
              'TenYearPerformance': 3.6000,
              'NetInvestment': -24215.0300
            },
            {
              'TargetType': 'VirtualAccount',
              'TargetSourceID': 'A36477',
              'TargetSourceSystem': 'AMK',
              'AsOfDate': pastMonth,
              'UpdateTimestamp': today,
              'SIPerformance': 1.8700,
              'YTDPerformance': 9.7300,
              'MTDPerformance': 2.0300,
              'OneYearPerformance': 7.8700,
              'TwoYearPerformance': -4.7800,
              'ThreeYearPerformance': 4.1600,
              'FiveYearPerformance': 3.5700,
              'TenYearPerformance': 1.0900,
              'NetInvestment': 123858.0000
            }
          ],
  
      investmentManager_Payload:
          [
            {
              'SourceID': '1838  ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AAMEQ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AAS',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ABNEQ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ACA   ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ACL',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ACLZ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ADMN  ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AEW   ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AI    ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ALTEG',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ALTGI',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AM403B',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'amark ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AMF',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AMFLEX',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AMFRET',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AMP',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AMPMA ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AP',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AQR',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AQRI',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARI   ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARIS',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARISF',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARISI',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARISL',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARISM',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARISR',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ARL   ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ASSET',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ASX',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ASXI',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ATC',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'ATL   ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'AWM',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'BAYEQ',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'BCM',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'BHMS',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'BIA',
              'SourceSystem': 'K6-Performance-tests',
              'Name': getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            },
            {
              'SourceID': 'BIP   ',
              'SourceSystem': 'K6-Performance-tests',
              'Name':getRandomCorpName(),
              'Tags': [],
              'UpdateTimestamp': today
            }
          ],
  
      productFamily_Payload:
            [
              {
                'SourceID': '1838  ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AAMEQ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AAS',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ABNEQ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ACA   ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ACL',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ACLZ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ADMN  ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AEW   ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AI    ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ALTEG',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ALTGI',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AM403B',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'amark ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AMF',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AMFLEX',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AMFRET',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AMP',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AMPMA ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AP',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AQR',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AQRI',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARI   ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARIS',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARISF',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARISI',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARISL',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARISM',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARISR',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ARL   ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ASSET',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ASX',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ASXI',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ATC',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'ATL   ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'AWM',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'BAYEQ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'BCM',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'BHMS',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'BIA',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              },
              {
                'SourceID': 'BIP   ',
                'SourceSystem': 'K6-Performance-tests',
                'Name': getRandomCorpName(),
                'Tags': [],
                'UpdateTimestamp': today
              }
            ],
  
      workItem_Payload:
            [
              {
                'SourceSystem': 'K6-Performance-tests',
                'SourceID': '5418770',
                'ParentSourceID': '5418763',
                'UserItemID': 'B048283452',
                'ItemType': 'New Account Application',
                'Description': 'New Account Application',
                'ExternalLink': null,
                'Status': 'Completed',
                'StatusLabel': 'Complete',
                'Associations': [
                  {
                    'Type': 'Organization',
                    'SourceID': 'AGAR1C',
                    'SourceSystem': 'K6-Performance-tests',
                    'ExternalLink': null
                  },
                  {
                    'Type': 'Organization',
                    'SourceID': 'CB4HN2',
                    'SourceSystem': 'K6-Performance-tests',
                    'ExternalLink': null
                  }
                ],
                'Notes': [
                  {
                    'Author': 'tw_admin',
                    'CreatedDateTime': pastMonth,
                    'Message': 'NoteId: 33321153 Containing potential PII data has been redacted'
                  },
                  {
                    'Author': 'tw_admin',
                    'CreatedDateTime': pastMonth,
                    'Message': 'NoteId: 33321154 Containing potential PII data has been redacted'
                  },
                  {
                    'Author': 'tw_admin',
                    'CreatedDateTime': pastMonth,
                    'Message': 'NoteId: 33321157 Containing potential PII data has been redacted'
                  },
                  {
                    'Author': 'Sarah.Pearlberg',
                    'CreatedDateTime': pastMonth,
                    'Message': 'NoteId: 33324801 Containing potential PII data has been redacted'
                  },
                  {
                    'Author': 'Pramod.Tripathi',
                    'CreatedDateTime': pastMonth,
                    'Message': 'NoteId: 33371290 Containing potential PII data has been redacted'
                  },
                  {
                    'Author': 'Pramod.Tripathi',
                    'CreatedDateTime': pastMonth,
                    'Message': 'NoteId: 33371291 Containing potential PII data has been redacted'
                  }
                ],
                'NextActions': [],
                'Attachments': [],
                'CloseTimestamp': startPeriod,
                'CreatedTimestamp': endPeriod,
                'UpdateTimestamp': today
              }
            ]
    }
  }
}