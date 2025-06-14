import { component$, useSignal, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import styles from "./sidebar.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  section: string;
}

// PUBLIC_INTERFACE
export const Sidebar = component$(() => {
  const location = useLocation();
  const isMobileOpen = useSignal(false);

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/", icon: "home", section: "main" },
    { label: "Browse Recipes", href: "/recipes", icon: "browse", section: "recipes" },
    { label: "My Recipes", href: "/manage", icon: "manage", section: "recipes" },
    { label: "Categories", href: "/categories", icon: "categories", section: "recipes" },
    { label: "Favorites", href: "/favorites", icon: "favorites", section: "recipes" },
    { label: "Login", href: "/auth/login", icon: "auth", section: "account" },
    { label: "Register", href: "/auth/register", icon: "auth", section: "account" },
  ];

  const toggleMobileMenu = $(() => {
    isMobileOpen.value = !isMobileOpen.value;
  });

  const closeMobileMenu = $(() => {
    isMobileOpen.value = false;
  });

  const getNavItemsBySection = (section: string) => {
    return navItems.filter(item => item.section === section);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.url.pathname === "/";
    }
    return location.url.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        class={styles.mobileToggle}
        onClick$={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      <div 
        class={[styles.overlay, isMobileOpen.value && styles.show]}
        onClick$={closeMobileMenu}
      />

      {/* Sidebar */}
      <aside class={[
        styles.sidebar, 
        isMobileOpen.value && styles.mobileOpen
      ]}>
        {/* Header */}
        <div class={styles.header}>
          <h1 class={styles.logo}>
            <div class={styles.logoIcon}>R</div>
            RecipeVault
          </h1>
        </div>

        {/* Navigation */}
        <nav class={styles.navigation}>
          {/* Main Section */}
          <div class={styles.navSection}>
            <h2 class={styles.navSectionTitle}>Main</h2>
            <ul class={styles.navList}>
              {getNavItemsBySection("main").map((item) => (
                <li key={item.href} class={styles.navItem}>
                  <a 
                    href={item.href}
                    class={[
                      styles.navLink,
                      isActiveLink(item.href) && styles.active
                    ]}
                    onClick$={closeMobileMenu}
                  >
                    <span class={[styles.navIcon, styles[item.icon]]} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recipes Section */}
          <div class={styles.navSection}>
            <h2 class={styles.navSectionTitle}>Recipes</h2>
            <ul class={styles.navList}>
              {getNavItemsBySection("recipes").map((item) => (
                <li key={item.href} class={styles.navItem}>
                  <a 
                    href={item.href}
                    class={[
                      styles.navLink,
                      isActiveLink(item.href) && styles.active
                    ]}
                    onClick$={closeMobileMenu}
                  >
                    <span class={[styles.navIcon, styles[item.icon]]} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Section */}
          <div class={styles.navSection}>
            <h2 class={styles.navSectionTitle}>Account</h2>
            <ul class={styles.navList}>
              {getNavItemsBySection("account").map((item) => (
                <li key={item.href} class={styles.navItem}>
                  <a 
                    href={item.href}
                    class={[
                      styles.navLink,
                      isActiveLink(item.href) && styles.active
                    ]}
                    onClick$={closeMobileMenu}
                  >
                    <span class={[styles.navIcon, styles[item.icon]]} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div class={styles.footer}>
          <div class={styles.userProfile}>
            <div class={styles.userAvatar}>
              U
            </div>
            <div class={styles.userInfo}>
              <p class={styles.userName}>Guest User</p>
              <p class={styles.userEmail}>Not logged in</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});
