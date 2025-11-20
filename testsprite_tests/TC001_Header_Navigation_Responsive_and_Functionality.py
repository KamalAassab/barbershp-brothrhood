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
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except async_api.Error:
            pass
        
        # Verify header is visible and fixed
        header = page.locator('header').first
        await expect(header).to_be_visible(timeout=10000)
        
        # Verify header has fixed positioning
        header_class = await header.get_attribute('class')
        assert 'fixed' in header_class, "Header should have fixed positioning"
        
        # Verify navigation links exist
        nav_links = ['Home', 'About', 'Services', 'Gallery', 'Testimonials', 'Contact']
        for link_text in nav_links:
            link = page.locator(f'text={link_text}').first
            await expect(link).to_be_visible(timeout=5000)
        
        # Test clicking a navigation link
        about_link = page.locator('a[href="#about"]').first
        if await about_link.is_visible():
            await about_link.click()
            await asyncio.sleep(1)  # Wait for scroll
        
        # Test mobile menu - resize to mobile
        await page.set_viewport_size({"width": 375, "height": 667})
        await asyncio.sleep(1)
        
        # Verify mobile menu button is visible
        menu_button = page.locator('button[aria-label="Open menu"]').first
        await expect(menu_button).to_be_visible(timeout=5000)
        
        # Click to open mobile menu
        await menu_button.click()
        await asyncio.sleep(0.5)
        
        # Verify menu is expanded
        expanded = await menu_button.get_attribute('aria-expanded')
        assert expanded == 'true', "Menu should be expanded after click"
        
        # Verify menu items are visible
        mobile_menu_item = page.locator('text=Home').first
        await expect(mobile_menu_item).to_be_visible(timeout=5000)
        
        # Click to close mobile menu
        close_button = page.locator('button[aria-label="Open menu"]').first
        await close_button.click()
        await asyncio.sleep(0.5)
        
        # Test logo click
        logo_link = page.locator('a[href="#home"]').first
        if await logo_link.is_visible():
            await logo_link.click()
            await asyncio.sleep(1)
        
        print("TC001 PASSED: Header navigation is responsive and functional")
    
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
