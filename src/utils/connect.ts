import mongoose from "mongoose"
import config from 'config'
import logger from './logger'

async function connect(){
    const dbUrl = config.get<string>("dbUrl")
    return mongoose.connect(dbUrl)
    .then(() =>{
        logger.info("DB connected")
    }).catch((error: any) =>{
        logger.info(error)
        process.exit(1);
    })
    
}
export default connect