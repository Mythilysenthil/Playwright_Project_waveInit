import { Before,After,BeforeAll,AfterAll,setDefaultTimeout} from '@cucumber/cucumber'
import{chromium,Browser} from '@playwright/test'
import{CustomWorld}from '../world/CustomWorld'
import {logger}from '../utilities/logger'
import { BasePage } from '../pages/BasePage'
import { loginTrainerpage } from '../pages/login_trainerPage' 


let browser : Browser
setDefaultTimeout(90 * 1000);
BeforeAll(async()=>{
    logger.info("Launching Browser")
    browser = await chromium.launch({headless:false})

})

Before(async function(this:CustomWorld,scenario){
    logger.info(`Starting scenario: ${scenario.pickle.name}`)
    this.browser=browser
    this.browserContext=await browser.newContext()
    this.page = await this.browserContext.newPage()
    this.bp=new BasePage(this.page);
    this.ltp = new loginTrainerpage(this.page);
})

After(async function(this:CustomWorld,scenario){
    if(scenario.result?.status==="FAILED"){
        const path =`reports/screenshots/${scenario.pickle.name}_${Date.now()}.png`
        await this.page.screenshot({path})
        logger.error(`Scenario Failed: ${scenario.pickle.name}`)
        
    }else{
        logger.info(`Scenario Passed: ${scenario.pickle.name}`)
    }

    await this.page.close()
    await this.browserContext.close()
})


AfterAll(async()=>{
    logger.info("Closing browser")
    await browser.close()
})
