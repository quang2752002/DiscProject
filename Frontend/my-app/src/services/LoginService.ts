// services/LoginService.ts
export interface LoginResponse {
  token?: string;
  role?: string;
  error?: string;
}

export const LoginService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
      try {
          const response = await fetch('https://localhost:7090/api/User/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
              // Return the error message from the server
              const errorDetail = await response.json();
              throw new Error(errorDetail.message || 'Network response was not ok');
          }

          return await response.json();
      } catch (error) {
          console.error('Error during login:', error);
          throw error;
      }
  },
};
