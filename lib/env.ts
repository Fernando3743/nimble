/**
 * Environment utility functions
 * Provides helpers to check the current app environment
 */

export type AppEnvironment = 'local' | 'staging' | 'production'

/**
 * Get the current app environment
 */
export const getAppEnv = (): AppEnvironment => {
  const env = process.env.NEXT_PUBLIC_APP_ENV as AppEnvironment

  // Default to local if not set
  if (!env || !['local', 'staging', 'production'].includes(env)) {
    return 'local'
  }

  return env
}

/**
 * Check if running in local environment
 */
export const isLocal = (): boolean => {
  return getAppEnv() === 'local'
}

/**
 * Check if running in staging environment
 */
export const isStaging = (): boolean => {
  return getAppEnv() === 'staging'
}

/**
 * Check if running in production environment
 */
export const isProduction = (): boolean => {
  return getAppEnv() === 'production'
}

/**
 * Check if running in a non-production environment
 */
export const isDevelopment = (): boolean => {
  return isLocal() || isStaging()
}

/**
 * Get environment-specific configuration
 */
export const getEnvConfig = () => {
  const env = getAppEnv()

  return {
    env,
    isLocal: isLocal(),
    isStaging: isStaging(),
    isProduction: isProduction(),
    isDevelopment: isDevelopment(),
    // Add other env-specific configs here
    features: {
      // Example: Enable debug features in non-prod
      debugMode: isDevelopment(),
      // Example: Show staging banner
      showStagingBanner: isStaging(),
    },
  }
}
