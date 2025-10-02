export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavbarProps {
  items: NavItem[];
  brandName?: string;
  logoHref?: string;
  className?: string;
}