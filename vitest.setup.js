import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Заглушка для всех CSS-файлов
vi.mock('*.css', () => ({}))
window.HTMLElement.prototype.scrollIntoView = vi.fn()
