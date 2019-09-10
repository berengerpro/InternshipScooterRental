import { APP_CONFIG } from '../constants'

const reducerPrefixFormat = (_key) => (`${APP_CONFIG.reducerPrefix}/${_key}_reducer/`).toUpperCase()

export {
  reducerPrefixFormat
}
