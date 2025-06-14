import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const registerForm = useSignal({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleInputChange = $((field: string, value: string | boolean) => {
    registerForm.value = { ...registerForm.value, [field]: value };
  });

  const handleSubmit = $((event: Event) => {
    event.preventDefault();
    
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (!registerForm.value.agreeToTerms) {
      alert("Please agree to the terms and conditions!");
      return;
    }
    
    console.log("Registration attempt:", registerForm.value);
    // TODO: Implement user registration
  });

  return (
    <div class="d-flex justify-content-center">
      <div style="max-width: 500px; width: 100%;">
        <div class="card">
          <div class="card-header text-center">
            <h2 class="mb-0">Create Account</h2>
            <p class="text-secondary mt-2 mb-0">Join RecipeVault and start your culinary journey</p>
          </div>
          <div class="card-body">
            <form onSubmit$={handleSubmit}>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                    value={registerForm.value.firstName}
                    onInput$={(e) => handleInputChange("firstName", (e.target as HTMLInputElement).value)}
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                    value={registerForm.value.lastName}
                    onInput$={(e) => handleInputChange("lastName", (e.target as HTMLInputElement).value)}
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                  value={registerForm.value.email}
                  onInput$={(e) => handleInputChange("email", (e.target as HTMLInputElement).value)}
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Create a password"
                  value={registerForm.value.password}
                  onInput$={(e) => handleInputChange("password", (e.target as HTMLInputElement).value)}
                  required
                />
                <small class="text-secondary">
                  Password must be at least 8 characters long
                </small>
              </div>

              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm your password"
                  value={registerForm.value.confirmPassword}
                  onInput$={(e) => handleInputChange("confirmPassword", (e.target as HTMLInputElement).value)}
                  required
                />
              </div>

              <div class="mb-4">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="agreeToTerms"
                    checked={registerForm.value.agreeToTerms}
                    onChange$={(e) => handleInputChange("agreeToTerms", (e.target as HTMLInputElement).checked)}
                    required
                  />
                  <label class="form-check-label" for="agreeToTerms">
                    I agree to the <a href="/terms" class="text-primary">Terms of Service</a> and <a href="/privacy" class="text-primary">Privacy Policy</a>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 mb-3">
                Create Account
              </button>

              <div class="text-center">
                <p class="mb-0">
                  Already have an account? <a href="/auth/login" class="text-primary">Sign in</a>
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
  title: "Register - RecipeVault",
  meta: [
    {
      name: "description",
      content: "Create a new RecipeVault account",
    },
  ],
};
