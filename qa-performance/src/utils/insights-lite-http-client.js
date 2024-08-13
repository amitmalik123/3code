import {HttpClient} from './http-client'

export class InsightsLiteHttpClient extends HttpClient {

  /**
   * @param options {{
   * baseURL: string,
   * headers:{ [key: string]: string },
   * timeout?: number,
   * responseType?: 'text' | 'binary' | 'none'
   * }}
   * */
  constructor(options) {
    super(options)
    this.graphqlUrl = '/advisorinsightsexp/graphql'
  }

  /**
   * Makes POST grapghql request
   *
   * @param {Object} options - The options object for the GraphQL request.
   * @param {Object} options.params - Params to include with the request.
   * @param {Object} options.payload - The payload for the GraphQL request.
   * @param {string} options.payload.query - The GraphQL query string.
   * @returns {Response} HTTP Response object.
   * */
  graphqlRequest(options){
    return super.post(this.graphqlUrl, options.payload, options.params)
  }

  /**
   * Batch multiple POST HTTP grapghql requests together, to issue them in parallel over multiple TCP connections.
   *
   * @param {Array<Object>} optionsArray - An array of options objects for the GraphQL requests.
   * @param {Object} optionsArray.params - Params to include with the request.
   * @param {Object} optionsArray.payload - The payload for each GraphQL request.
   * @param {string} optionsArray.payload.query - The GraphQL query string.
   *
   * @returns {Array<Response>} An array containing Response objects.
   * */
  batchGraphqlRequests(optionsArray){
    // As of now when you pass Array of request objects in K6 httpx.batch it doesn't handle it despite method documentation.
    // That's why we use only Array of Arrays (it is also possible for batch method in http/httpx classes)
    // When user pass Array of request objects we turn it into array of arrays
    const updatedRequests = []
    // Setting default values for every request params
    for (const options of optionsArray) {
      updatedRequests.push(
        [
          'POST',
          this.graphqlUrl,
          options.payload,
          options.params
        ]
      )
    }
    return super.batch(updatedRequests)
  }

}