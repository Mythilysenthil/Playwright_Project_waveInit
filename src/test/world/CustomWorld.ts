
import { logger } from './../utilities/logger';
import {Browser,Page,BrowserContext} from 'playwright'
import {setWorldConstructor, World} from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage';
import { SignINPage } from '../pages/SignINPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AdminPage } from '../pages/AdminPage';


export class CustomWorld extends World{
    browser!:Browser;
    browserContext!:BrowserContext;
    page!:Page;
    logger=logger;
    bp!:BasePage;
    sp!:SignINPage;
    rp!:RegisterPage;
    ap!:AdminPage;

}

setWorldConstructor(CustomWorld);