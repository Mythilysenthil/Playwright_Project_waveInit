import { logger } from './../utilities/logger';
import {Browser,Page,BrowserContext} from 'playwright'
import {setWorldConstructor, World} from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage';
import { loginTrainerpage } from '../pages/login_trainerPage';
import { SignINPage } from '../pages/SignINPage';
import { RegisterPage } from '../pages/RegisterPage';
import { part_prof_mgmt_page } from '../pages/part_prof_mgmt_page';
import { AdminPage } from '../pages/AdminPage';
import { AIAssistantPage } from '../pages/AIAssistantPage';

import { TrainingProgramPage } from '../pages/TrainingProgramPage';

export class CustomWorld extends World{
    browser!:Browser;
    browserContext!:BrowserContext;
    page!:Page;
    logger=logger;
    bp!:BasePage;
    ltp!:loginTrainerpage
    sp!:SignINPage;
    rp!:RegisterPage;
    ppm!:part_prof_mgmt_page;
    skillCountBeforeAction!: number;
    educationCountBeforeAction!: number;
    activeProfileDialog?: 'skill' | 'education';
    ap!:AdminPage;
    ai!:AIAssistantPage;
    tp!:TrainingProgramPage;
}

setWorldConstructor(CustomWorld);
