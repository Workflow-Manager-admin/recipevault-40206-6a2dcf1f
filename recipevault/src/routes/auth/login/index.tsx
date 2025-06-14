import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const loginForm = useSignal({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = $((field: string, value: string | boolean) => {
    loginForm.value = { ...loginForm.value, [field]: value };
  });

  const handleSubmit = $((event: Event) => {
    event.preventDefault();
    console.log("Login attempt:", loginForm.value);
    // TODO: Implement authentication
  });

  return (
    <div class="d-flex justify-content-center">
      <div style="max-width: 400px; width: 100%;">
        <div class="card">
          <div class="card-header text-center">
            <h2 class="mb-0">Welcome Back</h2>
            <p class="text-secondary mt-2 mb-0">Sign in to your RecipeVault account</p>
          </div>
          <div class="card-body">
            <form onSubmit$={handleSubmit}>
              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                  value={loginForm.value.email}
                  onInput$={(e) => handleInputChange("email", (e.target as HTMLInputElement).value)}
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                  value={loginForm.value.password}
                  onInput$={(e) => handleInputChange("password", (e.target as HTMLInputElement).value)}
                  required
                />
              </div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                    checked={loginForm.value.rememberMe}
                    onChange$={(e) => handleInputChange("rememberMe", (e.target as HTMLInputElement).checked)}
                  />
                  <label class="form-check-label" for="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="/auth/forgot-password" class="text-primary">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" class="btn btn-primary w-100 mb-3">
                Sign In
              </button>

              <div class="text-center">
                <p class="mb-0">
                  Don't have an account? <a href="/auth/register" class="text-primary">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div class="text-center mt-4">
          <div class="d-flex align-items-center mb-3">
            <hr class="flex-grow-1"/>
            <span class="px-3 text-secondary">Or continue with</span>
            <hr class="flex-grow-1"/>
          </div>
          
          <div class="d-flex gap-2">
            <button class="btn btn-outline flex-grow-1">
              🔗 Google
            </button>
            <button class="btn btn-outline flex-grow-1">
              📘 Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Login - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Sign in to your RecipeVault account",
    },
  ],
};
