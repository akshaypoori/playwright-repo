import {expect, test} from '@playwright/test'


test.beforeEach(async ({page})=>{

await page.goto('http://localhost:4200/')

await page.getByText('Forms').click()
await page.getByText('Form Layouts').click()

})


test.skip('locator syntax rules',async ({page})=>{

await page.locator('input').click()


await page.locator('.shape-rectangle').click()


page.locator('[placeholder="Email"]')


page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

page.locator('input[placeholder="Email"][nbinput]')

page.locator('//*[@id="inputEmail"]')


page.locator(':text("using")')

page.locator('text-is("Using the Grid")')


})

test.skip('User facing locators',async ({page})=>{
await page.getByRole('textbox',{name:"Email"}).first().click()
await page.getByRole('button',{name:"Sign in"}).first().click()

await page.getByLabel('Email').first().click()

await page.getByPlaceholder('Password').first().click()
await page.getByTestId('SignIn').click()

await page.getByText('Using the Grid').click()

await page.getByTitle('IoT Dashboard').click()


})

test.skip('locating child elements',async ({page})=>{

await page.locator('nb-card nb-radio :text-is("Option 1")').click()

await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()


await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()


await page.locator('nb-card').nth(3).getByRole('button').click()

})



test.skip('Locating parent elements',async ({page})=>{

await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).first().click()

await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).first().click()

await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).first().click()

await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).first().click()

await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).getByRole('textbox',{name:"Email"}).first().click()

await page.locator(':text-is("Using the Grid")').locator('..').filter({hasText:'Sign in'}).getByRole('textbox',{name:"Email"}).first().click()


})



test.skip('Reusing the locators', async ({page})=>{
   const basicForm=page.locator('nb-card').filter({hasText:"Basic form"})
   const emailField=basicForm.getByRole('textbox',{name:"Email"})
    await basicForm.getByRole('textbox',{name:"Email"}).first().fill('test@test.com')
    await basicForm.getByRole('textbox',{name:"Password"}).first().fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole("button").click()

    await expect(emailField).toHaveValue("test@test.com")



})

test.skip('extracting values',async ({page})=>{
  const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')
  

  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
 expect(allRadioButtonsLabels).toContain("Option 1")

  const emailField= basicForm.getByRole('textbox',{name:"Email"})
  await emailField.fill('test@test.com')
  const emailValue= await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')



  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')


})


test.skip('assertions',async ({page})=>{

 const value =5
 const basicForm = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')
 const text = await basicForm.textContent()
 expect(text).toEqual("Submit")


 await expect(basicForm).toHaveText('Submit')


 // soft assertion

await expect(basicForm).toHaveText('Submit')
await basicForm.click()





})