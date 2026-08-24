
import { logger } from './../utilities/logger';
import {Browser,Page,BrowserContext} from 'playwright'
import {setWorldConstructor, World} from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage';


export class CustomWorld extends World{
    browser!:Browser;
    browserContext!:BrowserContext;
    page!:Page;
    logger=logger;
    bp!:BasePage;

}

setWorldConstructor(CustomWorld);