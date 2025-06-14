import { component$, Slot, useSignal, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Sidebar } from "../navigation/sidebar";
import styles from "./main-container.module.css";

interface MainContainerProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

// PUBLIC_INTERFACE
export const MainContainer = component$<MainContainerProps>(({
  title = "RecipeVault",
  showSearch = true,
  showNotifications = true
}) => {
  const location = useLocation();
  const searchQuery = useSignal("");

  const handleSearch = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    searchQuery.value = target.value;
    
    // TODO: Implement search functionality
    console.log("Search query:", searchQuery.value);
  });

  const generateBreadcrumbs = () => {
    const pathSegments = location.url.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, href: currentPath });
    });
    
    return breadcrumbs;
  };

  const getCurrentPageTitle = () => {
    if (title !== "RecipeVault") return title;
    
    const pathname = location.url.pathname;
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/recipes")) return "Browse Recipes";
    if (pathname.startsWith("/manage")) return "Manage Recipes";
    if (pathname.startsWith("/categories")) return "Categories";
    if (pathname.startsWith("/favorites")) return "Favorites";
    if (pathname.startsWith("/auth")) return "Authentication";
    
    return "RecipeVault";
  };

  const breadcrumbs = generateBreadcrumbs();
  const pageTitle = getCurrentPageTitle();

  return (
    <div class={styles.mainContainer}>
      <Sidebar />
      
      <div class={styles.contentWrapper}>
        {/* Header */}
        <header class={styles.header}>
          <div class={styles.headerContent}>
            <div>
              <nav class={styles.breadcrumb}>
                {breadcrumbs.map((crumb, index) => (
                  <>
                    {index > 0 && <span class={styles.breadcrumbSeparator}>{'>'}</span>}
                    <a 
                      key={crumb.href}
                      href={crumb.href}
                      class={styles.breadcrumbItem}
                    >
                      {crumb.label}
                    </a>
                  </>
                ))}
              </nav>
              <h1 class={styles.pageTitle}>{pageTitle}</h1>
            </div>
            
            <div class={styles.headerActions}>
              {showSearch && (
                <div class={styles.searchBox}>
                  <span class={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search recipes, ingredients..."
                    class={styles.searchInput}
                    value={searchQuery.value}
                    onInput$={handleSearch}
                  />
                </div>
              )}
              
              {showNotifications && (
                <button class={styles.notificationButton} title="Notifications">
                  🔔
                  <span class={styles.notificationBadge}></span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main class={styles.mainContent}>
          <div class={styles.contentInner}>
            <Slot />
          </div>
        </main>

        {/* Footer */}
        <footer class={styles.footer}>
          <div class={styles.footerContent}>
            <p class={styles.footerText}>
              © 2024 RecipeVault. Made with ❤️ for food lovers.
            </p>
            <div class={styles.footerLinks}>
              <a href="/about" class={styles.footerLink}>About</a>
              <a href="/privacy" class={styles.footerLink}>Privacy</a>
              <a href="/terms" class={styles.footerLink}>Terms</a>
              <a href="/contact" class={styles.footerLink}>Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});
