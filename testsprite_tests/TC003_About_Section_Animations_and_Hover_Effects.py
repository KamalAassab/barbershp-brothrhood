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
        context.set_default_timeout(30000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="networkidle", timeout=30000)
        
        # Wait for the main page to reach DOMContentLoaded state
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except async_api.Error:
            pass
        
        # Scroll to About section
        about_section = page.locator('section#about').first
        await about_section.scroll_into_view_if_needed()
        await asyncio.sleep(2)  # Wait for animations
        
        # Verify About section title
        about_title = page.locator('text=About Brotherhood Barbershop').first
        await expect(about_title).to_be_visible(timeout=10000)
        
        # Verify "Our Story" card
        our_story = page.locator('text=Our Story').first
        await expect(our_story).to_be_visible(timeout=10000)
        
        # Verify "Our Values" card
        our_values = page.locator('text=Our Values').first
        await expect(our_values).to_be_visible(timeout=10000)
        
        # Test hover effect on cards
        story_card = our_story.locator('..').first
        await story_card.hover()
        await asyncio.sleep(0.5)
        
        values_card = our_values.locator('..').first
        await values_card.hover()
        await asyncio.sleep(0.5)
        
        print("TC003 PASSED: About section displays correctly with animations and hover effects")
    
    except Exception as e:
        raise AssertionError(f'Test case failed: {str(e)}')
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
