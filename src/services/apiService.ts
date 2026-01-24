import { IPublicClientApplication } from '@azure/msal-browser';
import { apiConfig } from '../config/authConfig';

export class ApiService {
  constructor(private msalInstance: IPublicClientApplication) {}

  /**
   * Acquire access token silently or with redirect
   */
  private async getAccessToken(): Promise<string> {
    const account = this.msalInstance.getActiveAccount();
    
    if (!account) {
      throw new Error('No active account. Please sign in.');
    }

    const request = {
      scopes: apiConfig.scopes,
      account: account,
    };

    try {
      // Try to acquire token silently
      const response = await this.msalInstance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      console.warn('Silent token acquisition failed, redirecting to login');
      // Changed from acquireTokenPopup to acquireTokenRedirect
      await this.msalInstance.acquireTokenRedirect(request);
      // This will redirect away, so we'll never reach this return
      throw error;
    }
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Generic POST request
   */
  async post<T, D = Record<string, unknown>>(endpoint: string, data: D): Promise<T> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Generic PATCH request
   */
  async patch<T, D = Record<string, unknown>>(endpoint: string, data: D): Promise<T> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Generic DELETE request
   */
  async delete(endpoint: string): Promise<void> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
  }

  /**
   * Get all products
   */
  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>('/api/products');
  }

  /**
   * Get a product by ID
   */
  async getProduct(id: string): Promise<Product> {
    return this.get<Product>(`/api/products/${id}`);
  }

  /**
   * Create a new product
   */
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.post<Product, Omit<Product, 'id'>>('/api/products', product);
  }
}

// Product interface
export interface Product {
  id: string;
  userId: number;
  name: string;
  price: number;
}