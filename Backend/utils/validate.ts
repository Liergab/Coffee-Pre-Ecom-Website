import { cleanEnv} from 'envalid';
import 'dotenv/config'
import {str,port} from 'envalid/dist/validators'
export default cleanEnv(process.env,{
    PORT:port(),
    MONGODB_URL_STRING  :str(),
    SECRET_KEY:str()
    
})