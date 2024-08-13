import { TIMEOUT } from '../../constants'

export class BasePage {

  /**
   * @param {import ('k6/experimental/browser').Page} page
   * @param {string} url
   */
  constructor(page, url) {
    this.page = page
    this.url = url
  }

  async goto() {
    await this.page.goto(this.url)
  }

  async waitPageIsReady() {
  }

  waitForUrlToBe(url) {
    let expectedUrl = url
    // Check if the last character is "/"
    if (expectedUrl.slice(-1) !== '/') {
      // If not, append "/"
      expectedUrl += '/'
    }
    // Get the current time in milliseconds
    const startTime = new Date().getTime()
    let currentUrl = ''
    try {
      currentUrl = this.page.url()
    } catch (error) {
           
    }
    while (currentUrl !== expectedUrl){
      const currentTime = new Date().getTime()
      const elapsedTime = currentTime - startTime
      if (elapsedTime >= TIMEOUT) {
        break
      }
      const delay = 100
      const endTime = new Date().getTime() + delay
      while (new Date().getTime() < endTime) {
        // Do nothing and wait for the specified delay
      }
      try {
        currentUrl = this.page.url()
      } catch (error) {
               
      }
    }
  }
}