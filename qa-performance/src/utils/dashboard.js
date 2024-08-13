import http from 'k6/http'
import {uuidv4} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {BASE_URL, WIDGETS} from '../constants'

/**
 * Prepare user's dashboard for dashboard script execution
 * Gets dashboards list then making one of dashboard as default and add widget list with specific height and width to the default dashboard
 * @param token {string} - user's bearer token
 * @param [options] - options for dashboard widget preferences
 * @param {{title: string, id: string}[]}[options.widgets] - An array of widgets objects representing the widgets that will be added on dashboard. Default is all widgets
 * @param {{height?: 1 | 2 | 3 | 4}}[options.height] - The height of the tiles (1, 2, 3, or 4). Default is 2.
 * @param {{width?: 1 | 2 | 3}}[options.width] - The width of the tiles (1, 2, or 3). Default is 2.
 * */
export async function prepareDashboards(token, options) {
  const {widgets = Object.values(WIDGETS), height = 2, width = 2} = options || {}
  const params = {
    headers: {
      Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
    },
    responseType: 'text'
  }
  const dashboardName = 'perf-dashboard-k6'
  const dashboardsList = await http.asyncRequest('GET', `${BASE_URL}/monitoring/api/v1/dashboard/byuser`,
    {}, params).then(res => res.json())
    .then(res => res.data)

  const oldPerfDashboard = dashboardsList.find(d => d.name === dashboardName)

  if (!!oldPerfDashboard || dashboardsList.length >= 5) {
    const dashboardForDel = oldPerfDashboard || dashboardsList[0]
    await http.asyncRequest('DELETE', `${BASE_URL}/monitoring/api/v1/dashboard/${dashboardForDel.id}`, {}, params)
  }

  const cratedDashboard = await http.asyncRequest('POST', `${BASE_URL}/monitoring/api/v1/dashboard`, JSON.stringify({
    name: dashboardName, widgets: []
  }), params).then(res => res.json()).then(res => res.data)
  for (let i = 0; i < widgets.length; i++) {
    await http.asyncRequest('POST', `${BASE_URL}/monitoring/api/v1/widget`, JSON.stringify({
      cmsId: widgets[i].id,
      coordinateX: 0,
      coordinateY: i * 2,
      height,
      width,
      dashboardId: cratedDashboard.id,
      id: uuidv4()
    }), params).then(res => res.json())
  }

  await http.asyncRequest('PATCH', `${BASE_URL}/monitoring/api/v1/dashboard/default`, JSON.stringify(cratedDashboard.id), {
    headers: {
      Authorization: `Bearer ${token}`, 'Content-Type': 'application/json-patch+json; x-api-version=1.0'
    },
    responseType: 'text'
  })
}