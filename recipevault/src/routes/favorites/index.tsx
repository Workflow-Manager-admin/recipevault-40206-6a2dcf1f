import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const selectedFilter = useSignal("all");
  const sortBy = useSignal("recent");

  const favoriteRecipes = [
    {
      id: 1,
      title: "Grandmother's Apple Pie",
      author: "Chef Emma",
      category: "Desserts",
      rating: 4.9,
      cookTime: "45 min",
      difficulty: "Medium",
      image: "🥧",
      addedDate: "2024-01-20",
      notes: "Perfect for Sunday dinners!"
    },
    {
      id: 2,
      title: "Spicy Thai Green Curry",
      author: "Chef Kamon",
      category: "Main Course",
      rating: 4.8,
      cookTime: "30 min",
      difficulty: "Hard",
      image: "🍛",
      addedDate: "2024-01-18",
      notes: "Love the coconut milk base"
    },
    {
      id: 3,
      title: "Mediterranean Quinoa Salad",
      author: "Chef Sofia",
      category: "Salads",
      rating: 4.7,
      cookTime: "20 min",
      difficulty: "Easy",
      image: "🥗",
      addedDate: "2024-01-15",
      notes: "Great for meal prep"
    },
    {
      id: 4,
      title: "Classic French Croissants",
      author: "Chef Pierre",
      category: "Breakfast",
      rating: 4.9,
      cookTime: "3 hours",
      difficulty: "Hard",
      image: "🥐",
      addedDate: "2024-01-12",
      notes: "Worth the effort!"
    },
    {
      id: 5,
      title: "Homemade Pizza Margherita",
      author: "Chef Marco",
      category: "Main Course",
      rating: 4.6,
      cookTime: "25 min",
      difficulty: "Medium",
      image: "🍕",
      addedDate: "2024-01-10",
      notes: "Kids love this recipe"
    },
    {
      id: 6,
      title: "Chocolate Lava Cake",
      author: "Chef Isabella",
      category: "Desserts",
      rating: 4.8,
      cookTime: "15 min",
      difficulty: "Medium",
      image: "🍰",
      addedDate: "2024-01-08",
      notes: "Perfect for date nights"
    }
  ];

  const categories = [...new Set(favoriteRecipes.map(recipe => recipe.category))];

  const handleFilterChange = $((filter: string) => {
    selectedFilter.value = filter;
  });

  const handleSortChange = $((sort: string) => {
    sortBy.value = sort;
  });

  const handleRemoveFavorite = $((recipeId: number) => {
    console.log("Removing favorite:", recipeId);
    // TODO: Implement remove favorite functionality
  });

  const filteredAndSortedRecipes = favoriteRecipes
    .filter(recipe => selectedFilter.value === "all" || recipe.category === selectedFilter.value)
    .sort((a, b) => {
      switch (sortBy.value) {
        case "name":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.rating - a.rating;
        case "recent":
        default:
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      }
    });

  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-2">My Favorite Recipes ❤️</h2>
          <p class="text-secondary mb-0">
            {favoriteRecipes.length} recipes saved to your favorites
          </p>
        </div>
        <div class="d-flex gap-2">
          <select 
            class="form-control" 
            style="width: auto;"
            value={selectedFilter.value}
            onChange$={(e) => handleFilterChange((e.target as HTMLSelectElement).value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select 
            class="form-control" 
            style="width: auto;"
            value={sortBy.value}
            onChange$={(e) => handleSortChange((e.target as HTMLSelectElement).value)}
          >
            <option value="recent">Recently Added</option>
            <option value="name">Name A-Z</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {filteredAndSortedRecipes.length === 0 ? (
        <div class="text-center py-5">
          <div style="font-size: 4rem; margin-bottom: 1rem;">💔</div>
          <h4 class="mb-3">No favorites found</h4>
          <p class="text-secondary mb-4">
            {selectedFilter.value === "all" 
              ? "You haven't added any recipes to your favorites yet."
              : `No favorites found in the ${selectedFilter.value} category.`
            }
          </p>
          <a href="/recipes" class="btn btn-primary">
            Discover Recipes
          </a>
        </div>
      ) : (
        <div class="row">
          {filteredAndSortedRecipes.map((recipe) => (
            <div key={recipe.id} class="col-lg-6 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex align-items-start mb-3">
                    <div style="font-size: 3rem; margin-right: 1rem;">
                      {recipe.image}
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-1">{recipe.title}</h5>
                        <button
                          class="btn btn-sm text-danger"
                          style="background: none; border: none; font-size: 1.25rem;"
                          onClick$={() => handleRemoveFavorite(recipe.id)}
                          title="Remove from favorites"
                        >
                          💔
                        </button>
                      </div>
                      <p class="text-secondary small mb-2">by {recipe.author}</p>
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="badge" style={`background-color: var(--primary-color); color: white; font-size: 0.75rem;`}>
                          {recipe.category}
                        </span>
                        <span style="color: var(--secondary-color);">
                          ★ {recipe.rating}
                        </span>
                        <span class="text-secondary small">
                          ⏱️ {recipe.cookTime}
                        </span>
                        <span class={`badge ${recipe.difficulty === 'Easy' ? 'bg-success' : recipe.difficulty === 'Medium' ? 'bg-warning' : 'bg-danger'}`}
                              style={`font-size: 0.7rem; ${recipe.difficulty === 'Easy' ? 'background-color: var(--primary-color)' : recipe.difficulty === 'Medium' ? 'background-color: var(--secondary-color); color: black;' : 'background-color: var(--accent-color)'}`}>
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {recipe.notes && (
                    <div class="mb-3">
                      <small class="text-secondary">
                        <strong>My Notes:</strong> "{recipe.notes}"
                      </small>
                    </div>
                  )}
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-secondary">
                      Added {new Date(recipe.addedDate).toLocaleDateString()}
                    </small>
                    <div class="d-flex gap-2">
                      <button class="btn btn-outline btn-sm">
                        📝 Add Note
                      </button>
                      <button class="btn btn-primary btn-sm">
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {favoriteRecipes.length > 0 && (
        <div class="row mt-4">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body text-center">
                <h5 class="text-primary">📊 Quick Stats</h5>
                <div class="row">
                  <div class="col-4">
                    <div class="h4 mb-0">{favoriteRecipes.length}</div>
                    <small class="text-secondary">Total</small>
                  </div>
                  <div class="col-4">
                    <div class="h4 mb-0">
                      {(favoriteRecipes.reduce((sum, r) => sum + r.rating, 0) / favoriteRecipes.length).toFixed(1)}
                    </div>
                    <small class="text-secondary">Avg Rating</small>
                  </div>
                  <div class="col-4">
                    <div class="h4 mb-0">{categories.length}</div>
                    <small class="text-secondary">Categories</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h6 class="mb-3">📈 Favorite Categories</h6>
                {categories.map((category) => {
                  const count = favoriteRecipes.filter(r => r.category === category).length;
                  const percentage = (count / favoriteRecipes.length) * 100;
                  return (
                    <div key={category} class="mb-2">
                      <div class="d-flex justify-content-between mb-1">
                        <span>{category}</span>
                        <span>{count} recipes</span>
                      </div>
                      <div class="progress" style="height: 8px;">
                        <div 
                          class="progress-bar" 
                          style={`width: ${percentage}%; background-color: var(--primary-color);`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "My Favorites - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Your favorite recipes collection",
    },
  ],
};
