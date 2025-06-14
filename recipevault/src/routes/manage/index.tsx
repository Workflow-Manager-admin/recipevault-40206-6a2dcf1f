import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const showAddForm = useSignal(false);
  const newRecipe = useSignal({
    title: "",
    description: "",
    category: "",
    cookTime: "",
    difficulty: "Easy",
    ingredients: "",
    instructions: ""
  });

  const myRecipes = [
    {
      id: 1,
      title: "My Famous Chocolate Cake",
      category: "Desserts",
      status: "Published",
      views: 1250,
      likes: 89,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Grandma's Apple Pie",
      category: "Desserts", 
      status: "Draft",
      views: 0,
      likes: 0,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Spicy Thai Curry",
      category: "Main Course",
      status: "Published",
      views: 890,
      likes: 67,
      createdAt: "2024-01-08"
    }
  ];

  const toggleAddForm = $(() => {
    showAddForm.value = !showAddForm.value;
  });

  const handleInputChange = $((field: string, value: string) => {
    newRecipe.value = { ...newRecipe.value, [field]: value };
  });

  const handleSubmit = $((event: Event) => {
    event.preventDefault();
    console.log("New recipe:", newRecipe.value);
    // TODO: Implement recipe creation
    showAddForm.value = false;
    newRecipe.value = {
      title: "",
      description: "",
      category: "",
      cookTime: "",
      difficulty: "Easy",
      ingredients: "",
      instructions: ""
    };
  });

  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-2">My Recipes</h2>
          <p class="text-secondary mb-0">
            Manage your personal recipe collection
          </p>
        </div>
        <button 
          class="btn btn-primary"
          onClick$={toggleAddForm}
        >
          {showAddForm.value ? "Cancel" : "+ Add New Recipe"}
        </button>
      </div>

      {showAddForm.value && (
        <div class="card mb-4">
          <div class="card-header">
            <h4 class="mb-0">Add New Recipe</h4>
          </div>
          <div class="card-body">
            <form onSubmit$={handleSubmit}>
              <div class="row mb-3">
                <div class="col-md-8">
                  <label class="form-label">Recipe Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter recipe title"
                    value={newRecipe.value.title}
                    onInput$={(e) => handleInputChange("title", (e.target as HTMLInputElement).value)}
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label class="form-label">Category</label>
                  <select
                    class="form-control"
                    value={newRecipe.value.category}
                    onChange$={(e) => handleInputChange("category", (e.target as HTMLSelectElement).value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Salads">Salads</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Vegetarian">Vegetarian</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  class="form-control"
                  rows={3}
                  placeholder="Brief description of your recipe"
                  value={newRecipe.value.description}
                  onInput$={(e) => handleInputChange("description", (e.target as HTMLTextAreaElement).value)}
                  required
                />
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Cook Time</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g., 30 minutes"
                    value={newRecipe.value.cookTime}
                    onInput$={(e) => handleInputChange("cookTime", (e.target as HTMLInputElement).value)}
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Difficulty</label>
                  <select
                    class="form-control"
                    value={newRecipe.value.difficulty}
                    onChange$={(e) => handleInputChange("difficulty", (e.target as HTMLSelectElement).value)}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Ingredients</label>
                <textarea
                  class="form-control"
                  rows={5}
                  placeholder="List ingredients (one per line)"
                  value={newRecipe.value.ingredients}
                  onInput$={(e) => handleInputChange("ingredients", (e.target as HTMLTextAreaElement).value)}
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Instructions</label>
                <textarea
                  class="form-control"
                  rows={6}
                  placeholder="Step-by-step cooking instructions"
                  value={newRecipe.value.instructions}
                  onInput$={(e) => handleInputChange("instructions", (e.target as HTMLTextAreaElement).value)}
                  required
                />
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                  Save Recipe
                </button>
                <button type="button" class="btn btn-secondary" onClick$={toggleAddForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Recipe</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myRecipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>
                      <strong>{recipe.title}</strong>
                    </td>
                    <td>
                      <span class="badge" style={`background-color: var(--primary-color); color: white;`}>
                        {recipe.category}
                      </span>
                    </td>
                    <td>
                      <span class={`badge ${recipe.status === 'Published' ? 'bg-success' : 'bg-secondary'}`} style={recipe.status === 'Published' ? 'background-color: var(--primary-color); color: white;' : 'background-color: var(--text-secondary); color: white;'}>
                        {recipe.status}
                      </span>
                    </td>
                    <td>{recipe.views}</td>
                    <td>{recipe.likes}</td>
                    <td>{recipe.createdAt}</td>
                    <td>
                      <div class="d-flex gap-1">
                        <button class="btn btn-outline btn-sm">Edit</button>
                        <button class="btn btn-accent btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Manage Recipes - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Manage your personal recipe collection",
    },
  ],
};
