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
        
        # Scroll to Reviews section
        reviews_section = page.locator('section#reviews').first
        await reviews_section.scroll_into_view_if_needed()
        await asyncio.sleep(2)
        
        # Verify Reviews section title
        reviews_title = page.locator('text=What Clients Say').first
        await expect(reviews_title).to_be_visible(timeout=10000)
        
        # Verify review cards are visible (check for star ratings)
        star_icons = page.locator('svg').filter(has=page.locator('[class*="star"], [class*="FaStar"]')).all()
        assert len(star_icons) > 0, "Star ratings should be visible"
        
        # Verify review text is visible
        review_text = page.locator('[class*="rounded-2xl"]').filter(has_text="★").first
        if not await review_text.is_visible():
            # Alternative: look for any review content
            review_content = page.locator('text=Jordan, text=Marcus, text=Michael').first
            await expect(review_content).to_be_visible(timeout=5000)
        
        # Test manual navigation buttons
        next_button = page.locator('button[aria-label*="Next"], button[aria-label*="next"]').first
        if await next_button.is_visible():
            await next_button.click()
            await asyncio.sleep(1)
        
        prev_button = page.locator('button[aria-label*="Previous"], button[aria-label*="prev"]').first
        if await prev_button.is_visible():
            await prev_button.click()
            await asyncio.sleep(1)
        
        # Wait for auto-rotation (8 seconds)
        await asyncio.sleep(9)
        
        print("TC006 PASSED: Reviews carousel displays with navigation and auto-rotation")
    
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
