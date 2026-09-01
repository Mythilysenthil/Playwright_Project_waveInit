import { logger } from './../utilities/logger';
import {Browser,Page,BrowserContext} from 'playwright'
import {setWorldConstructor, World} from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage';
import { loginTrainerpage } from '../pages/login_trainerPage';
import { SignINPage } from '../pages/SignINPage';
import { RegisterPage } from '../pages/RegisterPage';
import { part_prof_mgmt_page } from '../pages/part_prof_mgmt_page';
import { AdminPage } from '../pages/AdminPage';
import { TrainerModulepage } from '../pages/trainerModulePage';
import { transports } from 'winston';
import { MyCoursePage } from '../pages/MyCoursePage';
import { DashboardPage } from '../pages/DashboardPage';
import { TrainigProgramPage } from '../pages/TrainingProgramPage';
import { AIAssistantPage } from '../pages/AIAssistantPage';
import { CoursePage } from '../pages/CoursePage';
import { TrainerCodeAssessmentpage } from '../pages/trainerCodeAssessmentPage';
import { TrainerPage } from '../pages/TrainerPage';
import { ParticipantPage } from '../pages/ParticipantPage';
import { TrainerCoursePage } from '../pages/TrainerCoursePage';

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
    ap!:AdminPage;
    tmp!:TrainerModulepage;
    mp!:MyCoursePage;
    dp!:DashboardPage;
    tp!:TrainigProgramPage;
    ai!:AIAssistantPage;
    cp!:CoursePage;
    tca!:TrainerCodeAssessmentpage;
    t!:TrainerPage;
    pp!:ParticipantPage;
    tcp!:TrainerCoursePage;
}

setWorldConstructor(CustomWorld);
