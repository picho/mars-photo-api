import axios from 'axios';
import congif from 'config';

export default class NasaRequest {

    readonly nasaKey: string = congif.get('nasaPrivateKey');;
    readonly nasaBaseUrl: string = congif.get('nasaBaseUrl');;
    
    private rover: string;
    private queryParams: any;

    constructor (rover: string, queryParams: any) {
        this.rover = rover
        this.queryParams = queryParams;
    }

    // Método
    public async callExchangerValue (): Promise<any> {

      let result = null;
      let finalUrl = `${this.nasaBaseUrl}${this.rover}/photos`;

      finalUrl = this.addUrlParams(finalUrl);

      try {
        result = await axios.get(finalUrl);
      }
      catch(error) {
      }

      return result;
    }

    private addUrlParams(finalUrl: string): string {

        for(let param in this.queryParams) 
          finalUrl += `?${param}=${this.queryParams[param]}&`;
        
        return finalUrl += `api_key=${this.nasaKey}`;
    }
}


  

