import { Locator, Page } from "@playwright/test";


export class NavigationPage{
 

readonly page:Page    

readonly fromLayoutsMenuItem: Locator
readonly datePickerMenuItem: Locator
readonly smartTableMenuItem: Locator
readonly toastrMenuItem : Locator
readonly tooltipMenuItem: Locator






constructor(page:Page){
   
    this.page= page
    this.fromLayoutsMenuItem= page.getByText('Form Layouts')
    this.datePickerMenuItem= page.getByText('Datepicker')
    this.smartTableMenuItem= page.getByText('Smart Table')
    this.toastrMenuItem=page.getByText('Toastr')
    this.tooltipMenuItem=page.getByText('Tooltip')


}


async formLayoutPage(){


  
    await this.selectGroupMenuItem('Forms')
    await this.page.waitForTimeout(1000)
await this.fromLayoutsMenuItem.click()

}

async datePickerPage(){
    await this.selectGroupMenuItem('Forms')
    await this.datePickerMenuItem.click()

}

async smartTablePage(){
    await this.page.getByText('Tables & Data').click()
    await this.smartTableMenuItem.click()


}
async toastrPage(){
    await this.page.getByText('Modal & Overlays').click()
    await this.toastrMenuItem.click()


}
async tooltipPage(){
    await this.page.getByText('Modal & Overlays').click()
    await this.tooltipMenuItem.click()



}
private async selectGroupMenuItem(groupItem: string){

    const groupMenuItem = this.page.getByTitle(groupItem)
    const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    if(expandedState=="false"){

        await groupMenuItem.click()


    }
}





}