# AI Collaboration Challenge - Bulk Operations Feature

## Feature Request
Add a bulk operations feature that allows users to select multiple products and perform batch actions (price updates, category changes, deletion) with confirmation dialogs and undo functionality.

## 1. AI Tool Selection

**Which AI tool would you choose and why?**

- Tool: Cursor (GPT-5) with inline edits and test context
- Why:
  - TypeScript-first reasoning across React/Next.js and Jest.
  - Multi-file edits with structured diffs and fast refactors.
  - Context-aware assistance using local files, enabling targeted changes to `src/app/page.tsx`, `src/components/*`, and `src/lib/api.ts`.
  - TDD support with Jest/RTL awareness to create or update tests in `__tests__/`.

## 2. Comprehensive Prompt

**Write your complete prompt including context about the codebase architecture and any constraints:**

```markdown
You are implementing a Bulk Operations feature in a Next.js 15 (App Router) + React 18 + TypeScript project.

Context about the codebase:
- App shell: `src/app/layout.tsx` with Tailwind styling. Listing page is `src/app/page.tsx` (client component) rendering products via `ProductCard` and filtering via `ProductFilters`.
- Product creation page: `src/app/products/page.tsx` (client) uses `react-hook-form` + `zod`.
- Data access: `src/lib/api.ts` uses in-memory `mockProducts` (`src/data/mockProducts.ts`). Functions include `getProducts`, `getProduct`, `createProduct`, `updateProduct`, `deleteProduct`. Known intentional bugs exist; only fix those that block this feature.
- Types: `src/types/product.ts` and `src/types/api.ts`.
- UI: `src/components/ProductCard.tsx`, `src/components/ProductFilters.tsx`, buttons/spinner in `src/components/ui/`.
- Tests: Jest + RTL under `__tests__/` with examples for components, utils, and lib.

Goal: Add bulk operations so users can select multiple products and perform batch actions: (a) update price, (b) change category, (c) delete products. Include confirmation dialogs and undo functionality for each action.

Non-functional constraints:
- Keep changes scoped and type-safe (no `any`).
- Prefer new isolated components over breaking existing ones. Do not disrupt current usage of `ProductCard`.
- Accessible UI: keyboard navigable, proper `aria-*`, focus management in dialogs, announced status updates.
- Keep API in-memory; no new dependencies beyond existing stack.
- Maintain and/or add tests; do not remove existing tests unless replaced with equivalent coverage.

Design requirements:
1) Selection UX
- Add per-item selection (checkbox) and select-all. Prefer a wrapper list that manages selection state.
- Show a contextual Bulk Actions bar when selection count > 0.
- Preserve filters; selection should apply to currently visible items, not hidden by filters.

2) Bulk actions
- Actions: Update Price (absolute value or percentage delta), Change Category (choose from existing enum), Delete.
- Each action triggers a confirmation dialog summarizing the selection and the intended change.
- Apply operations optimistically to the UI; if a simulated API call fails, revert and show an inline error.

3) Undo strategy
- After a successful action, show a non-blocking toast/inline banner with an Undo button (10s timeout).
- Implement an in-memory `undoQueue` (e.g., array of { type, payload, previousProducts, timerId }). Undo restores previous state; timeout finalizes.

4) API layer
- Extend `src/lib/api.ts` with:
  - `bulkUpdatePrices(ids: string[], mode: 'set' | 'increase' | 'decrease', value: number): Promise<ApiResponse<Product[]>>`
  - `bulkChangeCategory(ids: string[], category: ProductCategory): Promise<ApiResponse<Product[]>>`
  - `bulkDeleteProducts(ids: string[]): Promise<ApiResponse<string[]>>`
- Operate over `mockProducts`. Ensure updates mutate the in-memory list consistently, update `updatedAt`, and validate inputs. Keep delays for realism.

5) Components to add
- `src/components/BulkActionsBar.tsx`: Receives `selectedCount`, callbacks for actions, and a clear-selection control. Accessible and responsive.
- `src/components/ConfirmDialog.tsx`: Simple accessible modal with focus trap and `aria-modal`.
- `src/components/Toast.tsx`: For undo banners/toasts (or reuse a simple inline `Alert` component).
- `src/components/SelectableProductCard.tsx`: Wraps `ProductCard` with a positioned checkbox, `aria-label`, and `onSelect`.

6) Page state integration
- In `src/app/page.tsx`, maintain:
  - `selectedIds: Set<string>` (or array), with select-all based on current `filteredProducts`.
  - Handlers for each bulk action (open dialog → confirm → call API → optimistic update `products` and `filteredProducts` → enqueue undo → show toast).
- Ensure selection is cleared after successful finalize or undo.

7) Tests to add
- `__tests__/components/BulkActionsBar.test.tsx`: renders with count, triggers callbacks, a11y attrs exist.
- `__tests__/lib/api.bulk.test.ts`: validates API bulk functions (happy path and input validation).
- `__tests__/app/home.bulk.test.tsx`: integration: select items → open action → confirm → optimistic UI → undo restores state.

Files to edit/add (high-level):
- Edit: `src/app/page.tsx` (selection state, wiring, handlers, render `BulkActionsBar`, use `SelectableProductCard`).
- Edit: `src/lib/api.ts` (add bulk functions; keep existing ones intact).
- Add: `src/components/BulkActionsBar.tsx`
- Add: `src/components/ConfirmDialog.tsx`
- Add: `src/components/Toast.tsx`
- Add: `src/components/SelectableProductCard.tsx`
- Add: tests under `__tests__/components/`, `__tests__/lib/`, `__tests__/app/`.

Implementation steps:
1. Create `SelectableProductCard` and use it in `src/app/page.tsx` with selection state; add select-all.
2. Implement `BulkActionsBar` with actions and disabled states; wire open-dialog callbacks.
3. Build `ConfirmDialog` with focus management. Add basic `Toast` for undo notices.
4. Add API bulk functions with validation and delays. Unit test them.
5. Wire optimistic updates + undo queue on the page; ensure `filteredProducts` remains consistent with `products` and filters.
6. Add RTL tests for UI flows and update any broken snapshots/assertions.
7. Verify accessibility basics: `aria-label`s on checkboxes and buttons, roles for dialogs, keyboard focus on open/close.

Deliverables:
- Working bulk selection + actions + confirm + undo on the main listing page.
- Green Jest tests including the new bulk tests.
- No TypeScript or lint errors.
```

## 3. Collaboration Approach

**How would you iterate and collaborate with the AI tool to implement this feature?**

- Start with a short design/UX sketch (selection model, bar layout, dialogs, undo) and confirm file touch points.
- Implement iteratively in small PR-sized edits:
  1. Introduce selection state and `SelectableProductCard` (no actions yet).
  2. Add `BulkActionsBar` and `ConfirmDialog` shells.
  3. Implement API bulk functions with unit tests.
  4. Wire optimistic updates + undo and add UI tests.
  5. Polish accessibility and edge cases (empty selection, partially hidden by filters).
- After each step, run tests (`npm test`), address failures, and request a brief review.
- Keep changes minimal, avoid refactoring unrelated known-issue code unless it blocks the feature.
