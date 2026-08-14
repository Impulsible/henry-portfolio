/// <reference types="vite/client" />

// Tell TypeScript that CSS files are valid imports
declare module '*.css' {
  const content: string
  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.sass' {
  const content: string
  export default content
}

declare module '*.less' {
  const content: string
  export default content
}

// Handle image imports
declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.gif' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}