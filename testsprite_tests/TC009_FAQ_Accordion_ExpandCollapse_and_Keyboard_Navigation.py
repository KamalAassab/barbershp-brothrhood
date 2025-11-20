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
        
        # Scroll to FAQ section
        faq_section = page.locator('section#faq').first
        await faq_section.scroll_into_view_if_needed()
        await asyncio.sleep(1)
        
        # Verify FAQ section exists
        faq_title = page.locator('text=FAQ').first
        await expect(faq_title).to_be_visible(timeout=10000)
        
        # Find FAQ questions
        faq_questions = page.locator('button[aria-expanded]').all()
        assert len(faq_questions) > 0, "FAQ questions should be visible"
        
        # Test clicking FAQ to expand
        first_faq = faq_questions[0]
        initial_expanded = await first_faq.get_attribute('aria-expanded')
        
        await first_faq.click()
        await asyncio.sleep(0.5)
        
        # Verify it expanded
        expanded_state = await first_faq.get_attribute('aria-expanded')
        assert expanded_state == 'true', "FAQ should expand on click"
        
        # Click again to collapse
        await first_faq.click()
        await asyncio.sleep(0.5)
        
        collapsed_state = await first_faq.get_attribute('aria-expanded')
        assert collapsed_state == 'false', "FAQ should collapse on second click"
        
        # Test keyboard navigation
        await first_faq.focus()
        await page.keyboard.press('Enter')
        await asyncio.sleep(0.5)
        
        enter_expanded = await first_faq.get_attribute('aria-expanded')
        assert enter_expanded == 'true', "FAQ should expand on Enter key"
        
        await page.keyboard.press('Space')
        await asyncio.sleep(0.5)
        
        space_expanded = await first_faq.get_attribute('aria-expanded')
        assert space_expanded == 'false', "FAQ should toggle on Space key"
        
        print("TC009 PASSED: FAQ accordion expands/collapses correctly with keyboard navigation")
    
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
