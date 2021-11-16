import { hasUncaughtExceptionCaptureCallback } from "process";

const {Builder, Capabilities, By} = require('selenium-webdriver');

require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get("http://localhost:5500/movieList/index.html");
    await driver.sleep(3000);
})

afterAll(async () => {
    await driver.quit();
})


async function check(name){
    await test("check this out",async () => {
        const input = await driver.findElement(By.xpath(`//input`))
        await input.sendKeys(`${name}\n`);
        
        const newInput = await driver.findElement(By.xpath(`//ul/li/span[text()="${name}"]`))
        await newInput.click();
        const deleteBttn = await driver.findElement(By.id(`${name}`))
        
        await driver.sleep(2000);
        let text = await newInput.getText();
        console.log(text);
        expect(text).toBe(name)
        await deleteBttn.click();
    })
}
check("boogers");