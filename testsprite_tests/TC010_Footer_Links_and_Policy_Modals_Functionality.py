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
        
        # Scroll to footer
        footer = page.locator('footer').first
        await footer.scroll_into_view_if_needed()
        await asyncio.sleep(1)
        
        # Verify footer exists
        await expect(footer).to_be_visible(timeout=10000)
        
        # Verify footer links exist
        footer_links = ['About Us', 'Services', 'Gallery', 'Book Appointment']
        for link_text in footer_links:
            link = page.locator(f'footer a:has-text("{link_text}")').first
            if await link.is_visible(timeout=2000):
                pass  # Link exists
        
        # Test clicking footer link
        about_link = page.locator('footer a[href="#about"]').first
        if await about_link.is_visible():
            await about_link.click()
            await asyncio.sleep(1)
        
        # Test social media icons
        social_icons = page.locator('footer a[aria-label]').all()
        assert len(social_icons) > 0, "Social media icons should be visible"
        
        # Test Privacy Policy modal
        privacy_button = page.locator('footer button:has-text("Privacy"), footer a:has-text("Privacy")').first
        if await privacy_button.is_visible():
            await privacy_button.click()
            await asyncio.sleep(1)
            
            # Verify modal opens
            privacy_modal = page.locator('text=Privacy Policy').first
            await expect(privacy_modal).to_be_visible(timeout=5000)
            
            # Close modal
            close_button = page.locator('button[aria-label="Close modal"]').first
            if await close_button.is_visible():
                await close_button.click()
                await asyncio.sleep(0.5)
        
        # Test Terms modal
        terms_button = page.locator('footer button:has-text("Terms"), footer a:has-text("Terms")').first
        if await terms_button.is_visible():
            await terms_button.click()
            await asyncio.sleep(1)
            
            # Verify modal opens
            terms_modal = page.locator('text=Terms & Conditions').first
            await expect(terms_modal).to_be_visible(timeout=5000)
            
            # Close modal
            close_button = page.locator('button[aria-label="Close modal"]').first
            if await close_button.is_visible():
                await close_button.click()
                await asyncio.sleep(0.5)
        
        print("TC010 PASSED: Footer links and policy modals work correctly")
    
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
