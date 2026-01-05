/**
 * Initialize all data (load mock data if empty)
 */
export function initializeData(): void {
  // Check if mock data already loaded
  const mockDataLoaded = localStorage.getItem('sensei-link-mock-data-loaded')
  
  if (mockDataLoaded === 'true') {
    return // Already initialized
  }

  // Import and initialize all modules
  import('./topics').then(({ initializeTopics }) => initializeTopics())
  import('./users').then(({ initializeUsers }) => initializeUsers())
  import('./articles').then(({ initializeArticles }) => initializeArticles())
  import('./interactions').then(({ initializeInteractions }) => initializeInteractions())
  import('./sessions').then(({ initializeSessions }) => initializeSessions())

  // Mark as initialized
  localStorage.setItem('sensei-link-mock-data-loaded', 'true')
}

// Export all API functions
export * from './articles'
export * from './interactions'
export * from './sessions'
export * from './topics'
export * from './users'

