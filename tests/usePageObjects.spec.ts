import {expect, test} from '@playwright/test'
import { NavigationPage } from '../pageobjects/navigationPage'
import { FormLayoutsPage } from '../pageobjects/formLayoutsPage'
import {faker}  from '@faker-js/faker'
test.beforeEach(async ({page})=>{

await page.goto('/')

})


test('navigate to form page',async ({page})=>{

const navigateTo = new  NavigationPage(page)

await navigateTo.formLayoutPage()
await navigateTo.datePickerPage()
await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})



})

test('parameterised methods',async ({page})=>{

   const navigateTo = new NavigationPage(page)
   const onFormLayoutsPage = new FormLayoutsPage(page)

   await navigateTo.formLayoutPage()
   const randomPwd = faker.string.alphanumeric()
   const mail= `${randomPwd.replace(" ","")}${faker.number.int(1000)}@test.com`
   const buffer = await page.screenshot()
   console.log(buffer.toString('base64'))
   console.log(randomPwd)
   await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(mail,'welcome2','Option 2')



})