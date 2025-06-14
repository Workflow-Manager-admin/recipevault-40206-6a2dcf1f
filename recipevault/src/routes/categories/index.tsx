import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const selectedCategory = useSignal("all");

  const categories = [
    { id: "breakfast", name: "Breakfast", count: 89, icon: "🍳", color: "#FF6B6B" },
    { id: "lunch", name: "Lunch", count: 156, icon: "🥪", color: "#4ECDC4" },
    { id: "dinner", name: "Dinner", count: 234, icon: "🍽️", color: "#45B7D1" },
    { id: "desserts", name: "Desserts", count: 145, icon: "🍰", color: "#96CEB4" },
    { id: "appetizers", name: "Appetizers", count: 78, icon: "🥗", color: "#FECA57" },
    { id: "beverages", name: "Beverages", count: 67, icon: "🥤", color: "#FF9FF3" },
    { id: "snacks", name: "Snacks", count: 123, icon: "🍿", color: "#54A0FF" },
    { id: "soups", name: "Soups", count: 89, icon: "🍜", color: "#5F27CD" },
    { id: "salads", name: "Salads", count: 98, icon: "🥬", color: "#00D2D3" },
    { id: "seafood", name: "Seafood", count: 76, icon: "🐟", color: "#FF6348" },
    { id: "vegetarian", name: "Vegetarian", count: 134, icon: "🥕", color: "#2ED573" },
    { id: "vegan", name: "Vegan", count: 89, icon: "🌱", color: "#3742FA" }
  ];

  const featuredRecipesByCategory = {
    breakfast: [
      { title: "Fluffy Pancakes", rating: 4.8, time: "20 min" },
      { title: "Avocado Toast", rating: 4.6, time: "10 min" },
      { title: "Smoothie Bowl", rating: 4.7, time: "15 min" }
    ],
    lunch: [
      { title: "Caesar Salad", rating: 4.5, time: "15 min" },
      { title: "Grilled Sandwich", rating: 4.4, time: "25 min" },
      { title: "Quinoa Bowl", rating: 4.6, time: "30 min" }
    ],
    dinner: [
      { title: "Beef Stir Fry", rating: 4.8, time: "35 min" },
      { title: "Pasta Primavera", rating: 4.7, time: "30 min" },
      { title: "Grilled Salmon", rating: 4.9, time: "25 min" }
    ]
  };

  const handleCategorySelect = $((categoryId: string) => {
    selectedCategory.value = categoryId;
  });

  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-2">Recipe Categories</h2>
          <p class="text-secondary mb-0">
            Explore recipes organized by category
          </p>
        </div>
        <div class="d-flex gap-2">
          <select class="form-control" style="width: auto;">
            <option>Sort by Name</option>
            <option>Sort by Recipe Count</option>
            <option>Sort by Popularity</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div class="row mb-4">
        {categories.map((category) => (
          <div key={category.id} class="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div 
              class="card h-100"
              style="cursor: pointer; transition: transform 0.2s ease;"
              onClick$={() => handleCategorySelect(category.id)}
            >
              <div class="card-body text-center">
                <div 
                  style={`font-size: 3rem; margin-bottom: 1rem; filter: drop-shadow(0 2px 4px ${category.color}40);`}
                >
                  {category.icon}
                </div>
                <h5 class="card-title mb-2">{category.name}</h5>
                <p class="text-secondary mb-2">
                  {category.count} recipes
                </p>
                <div 
                  class="progress mb-2"
                  style="height: 4px;"
                >
                  <div 
                    class="progress-bar"
                    style={`width: ${(category.count / 234) * 100}%; background-color: ${category.color};`}
                  />
                </div>
                <button 
                  class="btn btn-outline btn-sm"
                  style={`border-color: ${category.color}; color: ${category.color};`}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Recipes Section */}
      {selectedCategory.value !== "all" && (
        <div class="card">
          <div class="card-header">
            <h4 class="mb-0">
              Featured {categories.find(c => c.id === selectedCategory.value)?.name} Recipes
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              {(featuredRecipesByCategory[selectedCategory.value as keyof typeof featuredRecipesByCategory] || []).map((recipe, index) => (
                <div key={index} class="col-md-4 mb-3">
                  <div class="card">
                    <div class="card-body">
                      <h6 class="card-title">{recipe.title}</h6>
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
      )}

      {/* Popular Categories */}
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">🔥 Most Popular</h5>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                {categories
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((category, index) => (
                    <div key={category.id} class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <div class="d-flex align-items-center">
                        <span class="me-3" style="font-size: 1.5rem;">
                          {category.icon}
                        </span>
                        <div>
                          <strong>{category.name}</strong>
                          <br />
                          <small class="text-secondary">{category.count} recipes</small>
                        </div>
                      </div>
                      <span class="badge" style={`background-color: ${category.color}; color: white;`}>
                        #{index + 1}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">📊 Category Stats</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                  <span>Total Categories</span>
                  <strong>{categories.length}</strong>
                </div>
                <div class="d-flex justify-content-between mb-1">
                  <span>Total Recipes</span>
                  <strong>{categories.reduce((sum, cat) => sum + cat.count, 0)}</strong>
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span>Average per Category</span>
                  <strong>{Math.round(categories.reduce((sum, cat) => sum + cat.count, 0) / categories.length)}</strong>
                </div>
              </div>
              
              <div class="text-center">
                <button class="btn btn-primary btn-sm">
                  View All Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Categories - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Browse recipes by category",
    },
  ],
};
