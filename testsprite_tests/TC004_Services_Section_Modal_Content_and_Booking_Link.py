import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Scroll to Services section to locate service category cards
        await page.mouse.wheel(0, 800)
        

        # -> Click the first service category card (Haircuts) to open modal and verify content
        frame = context.pages[-1]
        # Click 'Haircuts View Services' button to open service modal
        elem = frame.locator('xpath=html/body/main/div/section[3]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Book Haircuts Service' button inside the modal
        frame = context.pages[-1]
        # Click 'Book Haircuts Service' button inside modal to navigate to booking section
        elem = frame.locator('xpath=html/body/div[3]/div/div[3]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Navigate back to the main page to restart the service category modal verification process.
        await page.goto('http://localhost:3000', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click 'Haircuts View Services' button to open modal and verify content
        frame = context.pages[-1]
        # Click 'Haircuts View Services' button to open service modal
        elem = frame.locator('xpath=html/body/main/div/section[3]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Close the 'Haircuts' modal and click the next service category card 'Beards' to open its modal
        frame = context.pages[-1]
        # Click 'Close modal' button to close the Haircuts modal
        elem = frame.locator('xpath=html/body/div[3]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Beards View Services' button to open Beards modal and verify content
        frame = context.pages[-1]
        # Click 'Beards View Services' button to open Beards service modal
        elem = frame.locator('xpath=html/body/main/div/section[3]/div/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Book Beards Service' button inside the modal
        frame = context.pages[-1]
        # Click 'Book Beards Service' button inside modal to navigate to booking section
        elem = frame.locator('xpath=html/body/div[3]/div/div[3]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Navigate back to the main page to restart the service category modal verification process.
        await page.goto('http://localhost:3000', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Scroll down to Services section to ensure 'Speciality' and 'Kids' service category cards are visible and clickable.
        await page.mouse.wheel(0, 800)
        

        # -> Click 'Speciality View Services' button to open the Speciality modal and verify content
        frame = context.pages[-1]
        # Click 'Speciality View Services' button to open Speciality service modal
        elem = frame.locator('xpath=html/body/main/div/section[3]/div/div/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Book Speciality Service' button inside the modal to navigate to booking section
        frame = context.pages[-1]
        # Click 'Book Speciality Service' button inside modal to navigate to booking section
        elem = frame.locator('xpath=html/body/div[3]/div/div[3]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=Exclusive Luxury Spa Treatments').first).to_be_visible(timeout=1000)
        except AssertionError:
            raise AssertionError("Test plan failed: Clicking any service category card should open a modal with accurate service details, prices, and a functional 'Book Service' link that navigates to the booking section. This assertion fails immediately to indicate the test plan execution failure.")
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    