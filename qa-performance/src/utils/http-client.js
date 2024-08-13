// @ts-ignore
import {Httpx} from 'https://jslib.k6.io/httpx/0.1.0/index.js'
import {HTTP_REQUEST_DELAY, HTTP_REQUEST_TIMEOUT} from '../constants'
import {sleep} from 'k6'
import {objectsMerge} from './helpers'

/**
 * @typedef {Object} HttpRequest
 * @property {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'} method - The HTTP method to use.
 * @property {string} url - The URL to which the request is sent.
 * @property {null | string | object } [body=null] - The body of the request. Can be null, a string, an object, an ArrayBuffer, or a SharedArrayBuffer.
 * @property {object} [params={}] - Additional parameters to merge with the default parameters.
 * @property {object} [params.tags] - Additional tags for the request.
 * @property {string} [params.tags.title] - The title of the request.
 * @property {string} [params.tags.related_url] - The related URL for the request.
 */

export class HttpClient{
  http

  /**
   * @param options {{
   * baseURL: string,
   * headers:{ [key: string]: string },
   * timeout?: number,
   * responseType?: 'text' | 'binary' | 'none'
   * }}
   * */
  constructor(options) {
    if (!options.timeout) options.timeout = HTTP_REQUEST_TIMEOUT
    this.http = new Httpx(options)
  }

  /**
   * Makes an HTTP request.
   *
   * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'} method - The HTTP method to use.
   * @param {string} url - The URL to which the request is sent.
   * @param {null | string | object | ArrayBuffer } [body=null] - The body of the request. Can be null, a string, an object, an ArrayBuffer, or a SharedArrayBuffer.
   * @param {object} [params={}] - Additional parameters to merge with the default parameters.
   * @param {object} [params.tags] - Additional tags for the request.
   * @param {string} [params.tags.title] - The title of the request.
   * @param {string} [params.tags.related_url] - The related URL for the request.
   */
  request(method, url, body, params = {} ){
    const defaultParams = {
      tags: {
        title: `${method} ${url}`,
        related_url: url
      }
    }

    const mergedParams = objectsMerge({}, defaultParams, params)

    const response = this.http.request(method, url, typeof body === 'object' && body !== null ? JSON.stringify(body) : body, mergedParams)
    sleep( HTTP_REQUEST_DELAY )
    return response
  }

  /**
   * Makes POST request
   *
   * @param url {string}
   * @param [body] {null | string | object | ArrayBuffer}
   * @param [params]  {null | object}
   * @returns {Response} HTTP Response object.
   * */
  post(url, body, params){
    return this.request('POST', url, body, params)
  }

  /**
   * Makes GET request
   *
   * @param url {string}
   * @param [body] {null | string | object | ArrayBuffer}
   * @param [params]  {null | object}
   * @returns {Response} HTTP Response object.
   * */
  get(url, body, params){
    return this.request('GET', url, body, params)
  }

  /**
   * Makes PUT request
   *
   * @param url {string}
   * @param [body] {null | string | object | ArrayBuffer}
   * @param [params]  {null | object}
   * @returns {Response} HTTP Response object.
   * */
  put(url, body, params){
    return this.request('PUT', url, body, params)
  }

  /**
   * Makes PATCH request
   *
   * @param url {string}
   * @param [body] {null | string | object | ArrayBuffer}
   * @param [params]  {null | object}
   * @returns {Response} HTTP Response object.
   * */
  patch(url, body, params){
    return this.request('PATCH', url, body, params)
  }

  /**
   * Makes DELETE request
   *
   * @param url {string}
   * @param [body] {null | string | object | ArrayBuffer}
   * @param [params]  {null | object}
   * @returns {Response} HTTP Response object.
   * */
  delete(url, body, params){
    return this.request('DELETE', url, body, params)
  }

  /**
   * Batch multiple HTTP requests together, to issue them in parallel over multiple TCP connections.
   *
   * @example
   * // Array of arrays
   * const responses = http.batch([
   *     ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
   *     ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
   *     ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
   *   ]);
   *   check(responses[0], {
   *     'main page status was 200': (res) => res.status === 200,
   *   });
   *
   * @example
   * // Array of request objects
   *  const req1 = {
   *     method: 'GET',
   *     url: 'https://httpbin.test.k6.io/get',
   *   };
   *   const req2 = {
   *     method: 'GET',
   *     url: 'https://test.k6.io',
   *   };
   *   const req3 = {
   *     method: 'POST',
   *     url: 'https://httpbin.test.k6.io/post',
   *     body: {
   *       hello: 'world!',
   *     },
   *     params: {
   *       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
   *     },
   *   };
   *   const responses = http.batch([req1, req2, req3]);
   *
   * @param {Array<Array<string|null, string|null, object|null, object|null>> | Array<object>} requests - An array of requests, which can be one of the following:
   *   1. An array of arrays, where each inner array represents a request and contains:
   *     - A string representing the HTTP method (e.g., 'GET', 'POST', etc.).
   *     - A string representing the URL.
   *     - An optional request body.
   *     - Optional request parameters.
   *   2. An array of request objects where each object contains:
   *     - `method`: The HTTP method for the request (e.g., 'GET', 'POST', etc.).
   *     - `url`: The URL for the request.
   *     - `body` (optional): The request body, if applicable.
   *     - `params` (optional): The request parameters, if applicable.
   *
   * @param {Object} [params] - Additional parameters for the batch request.
   *
   * @returns {Array<Response>} An array of Response objects corresponding to each request.
   */
  batch(requests, params ){
    // As of now when you pass Array of request objects in K6 httpx.batch it doesn't handle it despite method documentation.
    // That's why we use only Array of Arrays (it is also possible for batch method in http/httpx classes)
    // When user pass Array of request objects we turn it into array of arrays
    const updatedRequests = []
    // Setting default values for every request params
    for (const request of requests) {
      let method = null
      let url = null
      let body = null
      let params = null
      if(Array.isArray(request)){
        method = request[0]
        url = request[1]
        body = request[2]
        params = request[3]
      } else {
        method = request.method
        url = request.url
        body = request.body
        params = request.params
      }
      const defaultParams = {
        tags: {
          title: `${method} ${url}`,
          related_url: url
        }
      }
      updatedRequests.push(
        [
          method,
          url,
          typeof body === 'object' && body !== null ? JSON.stringify(body) : body,
          objectsMerge({}, defaultParams, params || {})
        ]
      )
    }

    const responses = this.http.batch(updatedRequests, params)
    sleep( HTTP_REQUEST_DELAY )
    return responses
  }

}