import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class AppService {
  private BASE_URL = 'https://api.intensel.net/apiv1'
  private PROJECT_NAME = 'dsstest'
  private ASSET_NAME = 'dssasset'
  private API_KEY = '123'

  async createProject(): Promise<any> {
    const headers = {
      'X-Intensel-Api-Key': `${this.API_KEY}`
    }

    try {
      const response = await axios.post(`${this.BASE_URL}/create/`, {
        "project_name": `${this.PROJECT_NAME}`,
        "variables":["river_flood", "rainfall_flood", "storm_surge"]
      }, { headers })
      return response.data
    } catch (error) {
      // Handle errors, maybe log them or re-throw them
      console.error('Error calling Intensel API:', error)
      throw error
    }
  }
  
  async addAsset() {
    const axios = require('axios');
    const URL = "https://api.intensel.net/apiv2/add_single_asset/";
    const headers = {
        'X-Intensel-Api-Key': `${this.API_KEY}`,
    };
    const payload = {
                "project_name": "testdss",
                "asset_data" : {
                    "name": "testasset",
                    "analysis_type": "RCP",
                    "scenario": "2.6",
                    "year": "2030",
                    "variables": ["river_flood", "typhoon"],
                    "latitude": 22.424645494250665,
                    "longitude" : 114.2135547607693,
                    "area": 2509,
                    "valuation": 2117.25,
                    "stories": 3
                }
              }
      try {
        const response = await axios.post(URL, payload, {headers: headers})
        console.log('Got Data addAsset : ', response.data)
      } catch (error) {
          console.log('addAsset ERROR : ', error)
      }
  }
  
  async getData() {
    const URL = "https://api.intensel.net/apiv2/hazard_risk_report/"
    const headers = {
        'X-Intensel-Api-Key': `${this.API_KEY}`
    }
    const payload = {
      "project_name": "testdss",
      "asset_name": "testasset",
      "analysis_type": "RCP",
      "scenario": "2.6",
      "year": "2030",
      "variables": ["river_flood", "typhoon"]
    }

    try {
      const response = await axios.post(URL, payload, {headers: headers, responseType: 'arraybuffer'})
      return  await Buffer.from(response.data, 'binary').toString('base64')
    } catch (e) {
      console.log('ERROR ', e)
      throw new BadRequestException(e)
    }
  }
}
