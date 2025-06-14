import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const sampleRecipes = [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Delicious homemade chocolate chip cookies that are crispy on the outside and chewy on the inside.",
      cookTime: "25 minutes",
      difficulty: "Easy",
      rating: 4.8,
      image: "🍪",
      category: "Desserts"
    },
    {
      id: 2,
      title: "Creamy Tomato Basil Pasta",
      description: "A rich and creamy pasta dish with fresh tomatoes and aromatic basil.",
      cookTime: "30 minutes",
      difficulty: "Medium",
      rating: 4.6,
      image: "🍝",
      category: "Main Course"
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      description: "A refreshing mix of seasonal vegetables with a light vinaigrette dressing.",
      cookTime: "15 minutes",
      difficulty: "Easy",
      rating: 4.4,
      image: "🥗",
      category: "Salads"
    },
    {
      id: 4,
      title: "Grilled Salmon with Herbs",
      description: "Perfectly grilled salmon fillet seasoned with fresh herbs and lemon.",
      cookTime: "20 minutes",
      difficulty: "Medium",
      rating: 4.7,
      image: "🐟",
      category: "Seafood"
    },
    {
      id: 5,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy stir-fried vegetables with a savory sauce.",
      cookTime: "15 minutes",
      difficulty: "Easy",
      rating: 4.3,
      image: "🥬",
      category: "Vegetarian"
    },
    {
      id: 6,
      title: "Banana Smoothie Bowl",
      description: "Nutritious smoothie bowl topped with fresh fruits and granola.",
      cookTime: "10 minutes",
      difficulty: "Easy",
      rating: 4.5,
      image: "🍌",
      category: "Breakfast"
    }
  ];

  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-2">Discover Amazing Recipes</h2>
          <p class="text-secondary mb-0">
            Explore our collection of delicious recipes from around the world
          </p>
        </div>
        <div class="d-flex gap-2">
          <select class="form-control" style="width: auto;">
            <option>All Categories</option>
            <option>Breakfast</option>
            <option>Main Course</option>
            <option>Desserts</option>
            <option>Salads</option>
            <option>Seafood</option>
            <option>Vegetarian</option>
          </select>
          <select class="form-control" style="width: auto;">
            <option>Sort by Rating</option>
            <option>Sort by Time</option>
            <option>Sort by Difficulty</option>
            <option>Sort by Name</option>
          </select>
        </div>
      </div>

      <div class="row">
        {sampleRecipes.map((recipe) => (
          <div key={recipe.id} class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <div style="font-size: 3rem; margin-right: 1rem;">
                    {recipe.image}
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="card-title mb-1">{recipe.title}</h5>
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <span class="badge" style={`background-color: var(--primary-color); color: white; font-size: 0.75rem;`}>
                        {recipe.category}
                      </span>
                      <span style="color: var(--secondary-color);">
                        {"★".repeat(Math.floor(recipe.rating))} {recipe.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p class="card-text text-secondary mb-3">
                  {recipe.description}
                </p>
                
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <small class="text-secondary">
                      ⏱️ {recipe.cookTime} • {recipe.difficulty}
                    </small>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-outline btn-sm">
                      ❤️
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

      <div class="d-flex justify-content-center mt-4">
        <nav>
          <ul class="pagination" style="display: flex; list-style: none; gap: 0.5rem; margin: 0; padding: 0;">
            <li><button class="btn btn-outline btn-sm" disabled>Previous</button></li>
            <li><button class="btn btn-primary btn-sm">1</button></li>
            <li><button class="btn btn-outline btn-sm">2</button></li>
            <li><button class="btn btn-outline btn-sm">3</button></li>
            <li><button class="btn btn-outline btn-sm">Next</button></li>
          </ul>
        </nav>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Browse Recipes - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Discover and browse amazing recipes from our collection",
    },
  ],
};
