import {Sttp} from '@supercharge/sttp';


const APP_URL = import.meta.env.VITE_APP_URL;

export default function ApiClient(): Sttp {
  return Sttp.create()
  .withBaseUrl(APP_URL)
  .withHeaders({
    'Content-Type': 'application/json'
  })
  .withTimeoutInSeconds(5)
  .accept('application/json');
}

