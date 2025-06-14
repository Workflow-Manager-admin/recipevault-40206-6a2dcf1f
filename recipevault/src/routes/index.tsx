import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const stats = [
    { label: "Total Recipes", value: "1,247", icon: "📖", color: "var(--primary-color)" },
    { label: "My Recipes", value: "23", icon: "👨‍🍳", color: "var(--secondary-color)" },
    { label: "Favorites", value: "89", icon: "❤️", color: "var(--accent-color)" },
    { label: "Categories", value: "12", icon: "📂", color: "var(--primary-color)" }
  ];

  const recentRecipes = [
    {
      id: 1,
      title: "Chocolate Chip Cookies",
      author: "Chef Maria",
      rating: 4.8,
      image: "🍪",
      time: "25 min"
    },
    {
      id: 2,
      title: "Creamy Tomato Pasta",
      author: "Chef Antonio",
      rating: 4.6,
      image: "🍝",
      time: "30 min"
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      author: "Chef Sarah",
      rating: 4.4,
      image: "🥗",
      time: "15 min"
    }
  ];

  const quickActions = [
    { label: "Add Recipe", href: "/manage", icon: "➕", color: "var(--primary-color)" },
    { label: "Browse All", href: "/recipes", icon: "🔍", color: "var(--secondary-color)" },
    { label: "Categories", href: "/categories", icon: "📂", color: "var(--accent-color)" },
    { label: "My Profile", href: "/auth/login", icon: "👤", color: "var(--primary-color)" }
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div class="mb-4">
        <h1 class="mb-2">Welcome to RecipeVault! 👋</h1>
        <p class="text-secondary">
          Discover, create, and share amazing recipes from around the world.
        </p>
      </div>

      {/* Stats Cards */}
      <div class="row mb-4">
        {stats.map((stat) => (
          <div key={stat.label} class="col-md-3 col-sm-6 mb-3">
            <div class="card">
              <div class="card-body text-center">
                <div style={`font-size: 2rem; margin-bottom: 0.5rem;`}>
                  {stat.icon}
                </div>
                <h3 class="mb-1" style={`color: ${stat.color};`}>
                  {stat.value}
                </h3>
                <p class="text-secondary mb-0 small">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="row">
        {/* Recent Recipes */}
        <div class="col-lg-8 mb-4">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h4 class="mb-0">🔥 Trending Recipes</h4>
              <a href="/recipes" class="btn btn-outline btn-sm">View All</a>
            </div>
            <div class="card-body">
              <div class="row">
                {recentRecipes.map((recipe) => (
                  <div key={recipe.id} class="col-md-4 mb-3">
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="text-center mb-3">
                          <div style="font-size: 2.5rem;">
                            {recipe.image}
                          </div>
                        </div>
                        <h6 class="card-title mb-2">{recipe.title}</h6>
                        <p class="text-secondary small mb-2">by {recipe.author}</p>
                        <div class="d-flex justify-content-between align-items-center">
                          <span style="color: var(--secondary-color);">
                            ★ {recipe.rating}
                          </span>
                          <span class="text-secondary small">
                            ⏱️ {recipe.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div class="col-lg-4">
          {/* Quick Actions */}
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">⚡ Quick Actions</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                {quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    class="btn btn-outline d-flex align-items-center justify-content-start"
                    style="text-decoration: none;"
                  >
                    <span style={`margin-right: 0.75rem; font-size: 1.25rem;`}>
                      {action.icon}
                    </span>
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Recipe of the Day */}
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">🌟 Recipe of the Day</h5>
            </div>
            <div class="card-body">
              <div class="text-center mb-3">
                <div style="font-size: 3rem;">🥘</div>
              </div>
              <h6 class="mb-2">Mediterranean Quinoa Bowl</h6>
              <p class="text-secondary small mb-3">
                A healthy and delicious bowl packed with fresh vegetables, quinoa, and a tangy lemon dressing.
              </p>
              <div class="d-flex justify-content-between mb-3">
                <span class="text-secondary small">⏱️ 20 min</span>
                <span style="color: var(--secondary-color);">★ 4.9</span>
              </div>
              <button class="btn btn-primary btn-sm w-100">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h5 class="mb-2">👨‍🍳 New to RecipeVault?</h5>
                  <p class="text-secondary mb-0">
                    Start your culinary journey by exploring our collection of recipes or create your first recipe to share with the community.
                  </p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                  <div class="d-flex gap-2 justify-content-md-end">
                    <a href="/recipes" class="btn btn-outline">
                      Explore Recipes
                    </a>
                    <a href="/manage" class="btn btn-primary">
                      Add Recipe
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Dashboard - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Your personal recipe management dashboard",
    },
  ],
};
