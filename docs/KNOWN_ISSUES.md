# Known Issues

While triaging and fixing the highest-impact bugs, I noted a few additional gaps that still need follow-up:

1. **Jest config warnings** – `jest.config.js` uses the non-existent `moduleNameMapping` option instead of `moduleNameMapper`, which triggers warnings on every test run. Fixing this would remove noise for contributors.
2. **Duplicate lockfiles** – Running `npx jest` surfaces a warning about a second `package-lock.json` at `/Users/mrmacbook/package-lock.json`. The repo should only keep the project-level lockfile to avoid dependency drift.
3. **Inventory paging/virtualization** – The product grid renders the entire list at once and lacks pagination or virtualization. The current dataset is small, but this will not scale for larger inventories.
4. **Mock API statefulness** – The in-memory `mockProducts` array mutates across create/update/delete calls without isolation, so e2e sessions can affect each other until a reload. Consider cloning data per request or replacing with a proper API layer.

