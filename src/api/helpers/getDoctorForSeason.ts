import { Page } from 'puppeteer';

const getCastForSeason = async (page: Page, season: number) => {
    await page.goto(`https://en.wikipedia.org/wiki/Doctor_Who_(series_${season})`);
    const infoBoxElements = await page.$$('.infobox tr');
    for (let i = 0; i < infoBoxElements.length; i++) {
        const infoBoxElement = infoBoxElements[i];
        const [labelElement] = await infoBoxElement.$$('.infobox-label');
        if (labelElement) {
            const labelText = await page.evaluate(el => el.textContent, labelElement)
            if (labelText === 'Starring') {
                const [doctorElement, assistantElement] = await infoBoxElement.$$('.infobox-data li');
                return {
                    doctor: doctorElement ? await page.evaluate(el => el.textContent, doctorElement) : null,
                    assistant: assistantElement ? await page.evaluate(el => el.textContent, assistantElement) : null,
                };
            }
        }
    }

    return {
        doctor: null,
        assistant: null,
    };
}

export default getCastForSeason;
