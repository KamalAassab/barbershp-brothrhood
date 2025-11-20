export const scrollToSection = (sectionId: string, offset: number = 100) => {
  const element = document.querySelector(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, offset: number = 100) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    scrollToSection(href, offset);
  }
};


