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
        
        # Wait for hero section
        hero_section = page.locator('section').first
        await expect(hero_section).to_be_visible(timeout=10000)
        
        # Verify hero title exists
        hero_title = page.locator('h1').first
        await expect(hero_title).to_be_visible(timeout=10000)
        title_text = await hero_title.text_content()
        assert title_text and len(title_text) > 0, "Hero title should have content"
        
        # Verify subtitle exists
        hero_subtitle = page.locator('p').first
        await expect(hero_subtitle).to_be_visible(timeout=10000)
        
        # Verify CTA button "Book Now"
        book_now_button = page.locator('text=Book Now').first
        await expect(book_now_button).to_be_visible(timeout=10000)
        
        # Verify statistics are visible
        stats = ['10+', '5K+', '4.9+']
        for stat in stats:
            stat_element = page.locator(f'text={stat}').first
            await expect(stat_element).to_be_visible(timeout=5000)
        
        # Test CTA button click
        if await book_now_button.is_visible():
            await book_now_button.click()
            await asyncio.sleep(1)  # Wait for scroll
        
        # Test on mobile viewport
        await page.set_viewport_size({"width": 375, "height": 667})
        await asyncio.sleep(1)
        
        # Verify hero still displays on mobile
        await expect(hero_title).to_be_visible(timeout=5000)
        
        print("TC002 PASSED: Hero section displays correctly with all elements")
    
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
